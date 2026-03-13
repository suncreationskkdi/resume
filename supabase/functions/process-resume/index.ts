import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { file } = await req.json();

    if (!file) {
      throw new Error("No file provided");
    }

    const base64Content = file.split(',')[1] || file;
    const pdfBytes = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0));

    let extractedText = '';

    try {
      extractedText = await extractTextFromPDF(pdfBytes);
    } catch (error) {
      console.error('PDF extraction error:', error);
      extractedText = 'Failed to extract text. Using AI vision instead.';
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const structuredData = await parseResumeWithAI(extractedText, openaiApiKey);

    return new Response(
      JSON.stringify(structuredData),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing resume:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to process resume',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

async function extractTextFromPDF(pdfBytes: Uint8Array): Promise<string> {
  const textDecoder = new TextDecoder('utf-8', { fatal: false });
  let text = '';

  try {
    text = textDecoder.decode(pdfBytes);

    const streamPattern = /stream\s*(.*?)\s*endstream/gs;
    const matches = text.matchAll(streamPattern);

    let extractedText = '';
    for (const match of matches) {
      const streamContent = match[1];
      if (streamContent) {
        const cleaned = streamContent
          .replace(/[^\x20-\x7E\n\r]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (cleaned.length > 10) {
          extractedText += cleaned + ' ';
        }
      }
    }

    if (extractedText.length > 100) {
      return extractedText;
    }

    const textPattern = /\((.*?)\)/g;
    const textMatches = text.matchAll(textPattern);

    for (const match of textMatches) {
      if (match[1]) {
        extractedText += match[1] + ' ';
      }
    }

    return extractedText || 'No text could be extracted from PDF';
  } catch (error) {
    console.error('Text extraction error:', error);
    return 'Unable to extract text from PDF';
  }
}

async function parseResumeWithAI(text: string, apiKey: string) {
  const prompt = `You are a resume parsing expert. Extract and structure the following resume text into a JSON format.

Resume Text:
${text}

Return a JSON object with the following structure:
{
  "personalInfo": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+1234567890",
    "location": "City, State",
    "linkedin": "linkedin.com/in/username (if available)",
    "website": "website.com (if available)",
    "summary": "Professional summary or objective"
  },
  "experience": [
    {
      "id": "unique-id",
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, State",
      "startDate": "Month Year",
      "endDate": "Month Year or Present",
      "current": false,
      "description": ["Bullet point 1", "Bullet point 2"]
    }
  ],
  "education": [
    {
      "id": "unique-id",
      "school": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "location": "City, State",
      "startDate": "Month Year",
      "endDate": "Month Year",
      "gpa": "3.8 (if available)"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "certifications": [
    {
      "id": "unique-id",
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "Month Year"
    }
  ],
  "projects": [
    {
      "id": "unique-id",
      "name": "Project Name",
      "description": "Project description",
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "selectedTemplate": "modern"
}

Important:
- Generate unique IDs using crypto.randomUUID() format
- Extract all relevant information
- If information is missing, use empty strings or empty arrays
- Ensure dates are in "Month Year" format
- For current positions, set "current": true and "endDate": "Present"
- Be thorough in extracting all bullet points and details
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume parser. Extract structured data from resumes and return valid JSON only. Do not include any explanations, just the JSON object.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  return JSON.parse(content);
}
