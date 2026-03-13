import { Download, FileText, Printer } from 'lucide-react';

interface ExportButtonsProps {
  onExportPDF: () => void;
  onExportHTML: () => void;
  onPrint: () => void;
}

export function ExportButtons({ onExportPDF, onExportHTML, onPrint }: ExportButtonsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Export Resume</h2>
      <div className="space-y-3">
        <button
          onClick={onPrint}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <Printer className="w-5 h-5" />
          Print / Save as PDF
        </button>
        <button
          onClick={onExportHTML}
          className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <FileText className="w-5 h-5" />
          Download HTML
        </button>
        <p className="text-sm text-gray-500 text-center mt-4">
          Use Print to save as PDF or export as HTML for further customization
        </p>
      </div>
    </div>
  );
}
