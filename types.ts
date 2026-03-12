export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
}

export interface CursorContextType {
  cursorVariant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover';
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}