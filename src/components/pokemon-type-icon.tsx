
import type { PokemonType } from '@/lib/types';
import { Flame, Droplets, Leaf, Zap, Brain, Hand, Circle, Moon, Shield, Sparkles } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PokemonTypeIconProps extends LucideProps {
  type: PokemonType;
}

// Custom Dragon Icon SVG
const DragonIcon = (props: LucideProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M14.5 12c0-1.5-1.5-3-3.5-3s-3.5 1.5-3.5 3c0 2.5 1.5 4.5 3.5 4.5 1 0 2-.5 2.5-1M18.5 7.5c0 3.5-2 6.5-4.5 6.5M9 19c0 1.5.5 3 1.5 3s1.5-1.5 1.5-3M3.5 8.5c1.5 0 2.5.5 2.5 1.5s-1 1.5-2.5 1.5c-1 0-1.5-.5-1.5-1.5S2.5 8.5 3.5 8.5z"/>
    <path d="M5 12c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5c0 .5 0 1-.5 1.5"/>
    <path d="M19 12c0-2-1.5-3.5-3-3.5s-3 1.5-3 3.5c0 .5 0 1 .5 1.5"/>
    <path d="M12 21c-2 0-3.5-1-3.5-2.5S10 16 12 16s3.5 1 3.5 2.5S14 21 12 21z"/>
    <path d="M4.5 16.5c-1.5 0-2.5.5-2.5 1.5s1 1.5 2.5 1.5c.5 0 1-.5 1.5-1"/>
    <path d="M19.5 16.5c1.5 0 2.5.5 2.5 1.5s-1 1.5-2.5 1.5c-.5 0-1-.5-1.5-1"/>
  </svg>
);

// Custom Fairy Icon SVG (simple sparkles)
const FairyIcon = (props: LucideProps) => (
   <Sparkles {...props} />
);


export function PokemonTypeIcon({ type, className, ...props }: PokemonTypeIconProps) {
  const iconProps = { className: cn("h-5 w-5", className), ...props };
  switch (type) {
    case 'Fire':
      return <Flame {...iconProps} style={{ color: '#FF6D6D' }} />;
    case 'Water':
      return <Droplets {...iconProps} style={{ color: '#6390F0' }} />;
    case 'Grass':
      return <Leaf {...iconProps} style={{ color: '#7AC74C' }} />;
    case 'Lightning':
      return <Zap {...iconProps} style={{ color: '#F7D02C' }} />;
    case 'Psychic':
      return <Brain {...iconProps} style={{ color: '#F95587' }} />;
    case 'Fighting':
      return <Hand {...iconProps} style={{ color: '#C22E28' }} />;
    case 'Colorless':
      return <Circle {...iconProps} style={{ color: '#A8A77A' }} />;
    case 'Darkness':
      return <Moon {...iconProps} style={{ color: '#705746' }} />;
    case 'Metal':
      return <Shield {...iconProps} style={{ color: '#B7B7CE' }} />;
    case 'Dragon':
      return <DragonIcon {...iconProps} style={{ color: '#6F35FC' }} />;
    case 'Fairy':
      return <FairyIcon {...iconProps} style={{ color: '#D685AD' }} />;
    default:
      return <Circle {...iconProps} style={{ color: '#A8A77A' }} />;
  }
}
