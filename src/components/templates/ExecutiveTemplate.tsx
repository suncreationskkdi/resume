import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-white p-12 max-w-[850px] mx-auto" id="resume-content">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
          {personalInfo.name}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 mb-6">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {personalInfo.summary && (
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed italic border-t border-b border-gray-300 py-6">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      {experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-center text-gray-900 mb-6">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={exp.id}>
                {index > 0 && <div className="border-t border-gray-200 my-6"></div>}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-lg text-gray-700 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {exp.location} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <ul className="space-y-2 text-gray-700 max-w-3xl mx-auto">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1.5">▪</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-center text-gray-900 mb-6">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-lg text-gray-700 font-semibold">{edu.school}</p>
                <p className="text-sm text-gray-600">
                  {edu.location} • {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10 mb-10">
        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold text-center text-gray-900 mb-4">
              Core Competencies
            </h2>
            <div className="space-y-2 text-center">
              {skills.map((skill, idx) => (
                <p key={idx} className="text-gray-700">{skill}</p>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold text-center text-gray-900 mb-4">
              Certifications
            </h2>
            <div className="space-y-3 text-center">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-gray-900 font-semibold">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-bold text-center text-gray-900 mb-6">
            Key Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="text-center max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <p className="text-sm text-gray-600">
                  Technologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
