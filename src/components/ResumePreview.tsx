import { useState } from 'react';
import type { ResumeData } from '../lib/database.types';
import {
  ModernTemplate,
  ClassicTemplate,
  TwoColumnTemplate,
  MinimalistTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
  ExecutiveTemplate,
  CompactTemplate,
} from './templates';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

export function ResumePreview({ data, scale = 1 }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'two-column':
        return <TwoColumnTemplate data={data} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'compact':
        return <CompactTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl p-6 overflow-auto">
      <div
        className="origin-top-left shadow-2xl"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          margin: '0 auto',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
