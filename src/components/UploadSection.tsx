import { Upload, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ApiKeyInput } from './ApiKeyInput';

interface UploadSectionProps {
  onUploadComplete: (extractedData: any) => void;
}

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(f => f.type === 'application/pdf');

    if (pdfFile) {
      setFile(pdfFile);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (files[0].type === 'application/pdf') {
        setFile(files[0]);
        setError('');
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const processResume = async () => {
    if (!file) return;

    if (!geminiApiKey) {
      setError('Please enter your Gemini API key first');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        try {
          const base64 = reader.result as string;

          const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-resume`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'x-gemini-api-key': geminiApiKey,
            },
            body: JSON.stringify({ file: base64 }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to process resume');
          }

          if (data.error) {
            throw new Error(data.error);
          }

          onUploadComplete(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process resume');
        } finally {
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setIsProcessing(false);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Resume Builder</h1>
          <p className="text-lg text-gray-600">Upload your resume and transform it with professional templates</p>
        </div>

        <div className="mb-6">
          <ApiKeyInput onApiKeySet={setGeminiApiKey} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              disabled={isProcessing}
            />

            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="w-16 h-16 text-blue-500 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">{file.name}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {!isProcessing && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      Choose different file
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your resume PDF here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                  <p className="text-xs text-gray-400">Supports multi-page PDF files</p>
                </div>
              )}
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {file && !isProcessing && (
            <button
              onClick={processResume}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Process Resume
            </button>
          )}

          {isProcessing && (
            <div className="mt-6 p-6 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <p className="text-blue-900 font-medium">Processing your resume...</p>
              </div>
              <p className="text-sm text-blue-700 text-center mt-2">
                Extracting text and analyzing content with AI
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your resume data is processed securely and stored temporarily
          </p>
        </div>
      </div>
    </div>
  );
}
