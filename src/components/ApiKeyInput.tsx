import { Key, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export function ApiKeyInput({ onApiKeySet }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
      onApiKeySet(savedKey);
    }
  }, [onApiKeySet]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsSaved(true);
      onApiKeySet(apiKey.trim());
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsSaved(false);
    onApiKeySet('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
      <div className="flex items-start gap-3 mb-4">
        <Key className="w-6 h-6 text-blue-600 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Gemini API Key</h3>
          <p className="text-sm text-gray-600">
            Enter your Google Gemini API key to enable AI-powered resume processing.{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Get your API key here
            </a>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Save API Key
          </button>
          {isSaved && (
            <button
              onClick={handleClear}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">API key saved successfully</span>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          Your API key is stored locally in your browser and never sent to our servers. It's only used to communicate directly with Google's Gemini API.
        </p>
      </div>
    </div>
  );
}
