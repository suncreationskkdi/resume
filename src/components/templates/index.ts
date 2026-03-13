export { ModernTemplate } from './ModernTemplate';
export { ClassicTemplate } from './ClassicTemplate';
export { TwoColumnTemplate } from './TwoColumnTemplate';
export { MinimalistTemplate } from './MinimalistTemplate';
export { CreativeTemplate } from './CreativeTemplate';
export { ProfessionalTemplate } from './ProfessionalTemplate';
export { ExecutiveTemplate } from './ExecutiveTemplate';
export { CompactTemplate } from './CompactTemplate';

export const TEMPLATES = [
  { id: 'modern', name: 'Modern', description: 'Clean design with blue accents' },
  { id: 'classic', name: 'Classic', description: 'Traditional black and white layout' },
  { id: 'two-column', name: 'Two Column', description: 'Sidebar layout with dark accent' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple and elegant typography' },
  { id: 'creative', name: 'Creative', description: 'Bold orange gradient design' },
  { id: 'professional', name: 'Professional', description: 'Corporate slate color scheme' },
  { id: 'executive', name: 'Executive', description: 'Formal centered layout' },
  { id: 'compact', name: 'Compact', description: 'Space-efficient design' },
] as const;
