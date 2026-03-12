import { Project } from '../types';

export interface ExtendedProject extends Project {
  description: string;
  tags: string[];
}

export const allProjects: ExtendedProject[] = [
  {
    id: 1,
    title: "EQUATOR",
    category: "Brand Strategy",
    year: "2025",
    image: "/images/dsfsfsd.png",
    description: "A climate-driven design system for Patagonia.",
    tags: ["Strategy", "Branding", "Sustainability"]
  },
  {
    id: 2,
    title: "Foundation of Doubt",
    category: "Mobile Experience",
    year: "2025",
    image: "https://picsum.photos/800/600?random=2",
    description: "Interactive museum companion app.",
    tags: ["UX", "Mobile", "Cultural"]
  },
  {
    id: 3,
    title: "AALIYA",
    category: "Visual Identity",
    year: "2024",
    image: "https://picsum.photos/800/600?random=3",
    description: "From fragrance product to identity experience.",
    tags: ["Branding", "Sensory", "Identity"]
  },
  {
    id: 4,
    title: "Web Experience",
    category: "UI / UX",
    year: "2022",
    image: "https://picsum.photos/800/600?random=4",
    description: "Digital platform for creative agencies.",
    tags: ["Web", "UI", "UX"]
  },
  {
    id: 5,
    title: "Lumina",
    category: "AR Experience",
    year: "2023",
    image: "https://picsum.photos/800/600?random=5",
    description: "Augmented reality art installation.",
    tags: ["AR", "Interactive", "Art"]
  },
  {
    id: 6,
    title: "Nexus",
    category: "Strategy",
    year: "2024",
    image: "https://picsum.photos/800/600?random=6",
    description: "Corporate ecosystem mapping.",
    tags: ["Strategy", "Systems", "Corporate"]
  },
  {
    id: 7,
    title: "Oasis",
    category: "Branding",
    year: "2023",
    image: "https://picsum.photos/800/600?random=7",
    description: "Visual identity for a wellness retreat.",
    tags: ["Branding", "Wellness", "Minimal"]
  },
  {
    id: 8,
    title: "Pulse",
    category: "Web",
    year: "2025",
    image: "https://picsum.photos/800/600?random=8",
    description: "Real-time data visualization dashboard.",
    tags: ["Web", "Data", "Dashboard"]
  }
];
