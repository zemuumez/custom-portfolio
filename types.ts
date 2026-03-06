import { LucideIcon } from 'lucide-react';

export enum ViewState {
  LOADING = 'LOADING',
  LANDING = 'LANDING',
  DESIGNER = 'DESIGNER',
  CYBER = 'CYBER'
}

export type ProjectCategory = 
  | 'All' 
  | 'Videos' 
  | 'Logos' 
  | 'Business Cards' 
  | 'Social Media Posts' 
  | 'UI / UX' 
  | 'YouTube Thumbnails'
  | 'Architecture'
  | 'Offensive Security'
  | 'Development'
  | 'Infrastructure';

export interface Project {
  id: string;
  driveId?: string; // The specific Google Drive File ID (Optional)
  imageUrl?: string; // Direct image URL
  title: string;
  category: ProjectCategory;
  mediaType?: 'image' | 'video'; 
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string; 
}

export interface Skill {
  name: string;
  icon?: LucideIcon;
  level: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  tools: string[];
}