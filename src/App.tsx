import { useState } from 'react';
import { UploadSection } from './components/UploadSection';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { ExportButtons } from './components/ExportButtons';
import { supabase } from './lib/supabase';
import type { ResumeData } from './lib/database.types';
import { exportAsHTML, printResume } from './utils/exportUtils';
import { ArrowLeft, Loader2 } from 'lucide-react';

type AppStep = 'upload' | 'edit';

function App() {
  const [step, setStep] = useState<AppStep>('upload');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleUploadComplete = async (extractedData: any) => {
    const newResumeData: ResumeData = {
      personalInfo: extractedData.personalInfo || {
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      experience: extractedData.experience || [],
      education: extractedData.education || [],
      skills: extractedData.skills || [],
      certifications: extractedData.certifications || [],
      projects: extractedData.projects || [],
      selectedTemplate: extractedData.selectedTemplate || 'modern',
    };

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          personal_info: newResumeData.personalInfo,
          experience: newResumeData.experience,
          education: newResumeData.education,
          skills: newResumeData.skills,
          certifications: newResumeData.certifications,
          projects: newResumeData.projects,
          selected_template: newResumeData.selectedTemplate,
          raw_text: extractedData.rawText || '',
        })
        .select()
        .single();

      if (error) throw error;

      setResumeId(data.id);
      setResumeData(newResumeData);
      setStep('edit');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    }
  };

  const handleSaveResume = async () => {
    if (!resumeData || !resumeId) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('resumes')
        .update({
          personal_info: resumeData.personalInfo,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          certifications: resumeData.certifications,
          projects: resumeData.projects,
          selected_template: resumeData.selectedTemplate,
          updated_at: new Date().toISOString(),
        })
        .eq('id', resumeId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating resume:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    if (resumeData) {
      setResumeData({ ...resumeData, selectedTemplate: templateId });
    }
  };

  const handleStartOver = () => {
    setStep('upload');
    setResumeData(null);
    setResumeId(null);
  };

  if (step === 'upload') {
    return <UploadSection onUploadComplete={handleUploadComplete} />;
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={handleStartOver}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Upload New Resume
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TemplateSelector
              selectedTemplate={resumeData.selectedTemplate}
              onSelectTemplate={handleTemplateChange}
            />
            <ExportButtons
              onExportPDF={() => printResume()}
              onExportHTML={exportAsHTML}
              onPrint={printResume}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ResumeEditor
              data={resumeData}
              onChange={setResumeData}
              onSave={handleSaveResume}
            />
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
                {isSaving && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Saving...</span>
                  </div>
                )}
              </div>
              <ResumePreview data={resumeData} scale={0.6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
