import React, { useEffect } from 'react';
import EquatorDetail from './projects/EquatorDetail';
import FoundationOfDoubtDetail from './projects/FoundationOfDoubtDetail';
import AaliyaDetail from './projects/AaliyaDetail';

interface ProjectDetailProps {
  projectId: number;
  onBack: () => void;
  onNavigate: (id: number) => void;
  setCursorVariant: (variant: 'default' | 'project' | 'text' | 'white' | 'text-white' | 'hover') => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack, onNavigate, setCursorVariant }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // --------------------------------------------------------------------------
  // PROJECT 1: EQUATOR
  // --------------------------------------------------------------------------
  if (projectId === 1) {
    return (
      <EquatorDetail 
        onBack={onBack} 
        onNavigate={onNavigate} 
        setCursorVariant={setCursorVariant} 
      />
    );
  }

  // --------------------------------------------------------------------------
  // PROJECT 2: FOUNDATION OF DOUBT
  // --------------------------------------------------------------------------
  if (projectId === 2) {
    return (
      <FoundationOfDoubtDetail
        onBack={onBack}
        onNavigate={onNavigate}
        setCursorVariant={setCursorVariant}
      />
    );
  }

  // --------------------------------------------------------------------------
  // PROJECT 3: AALIYA
  // --------------------------------------------------------------------------
  if (projectId === 3) {
    return (
      <AaliyaDetail
        onBack={onBack}
        onNavigate={onNavigate}
        setCursorVariant={setCursorVariant}
      />
    );
  }

  // Fallback for ID 4 etc (Empty for now)
  return <div className="min-h-screen flex items-center justify-center bg-dark text-white">Project Content Coming Soon</div>;
};

export default ProjectDetail;
