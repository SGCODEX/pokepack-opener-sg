
import Image from 'next/image';
import type { PokemonCard } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PokemonTypeIcon } from './pokemon-type-icon';
import { cn } from '@/lib/utils';

interface CardComponentProps {
  card: PokemonCard;
  onClick?: () => void;
  isCollected?: boolean;
  className?: string;
  isRevealing?: boolean;
  animationDelay?: string;
  viewContext?: 'pokedex' | 'default';
  pokedexNumber?: number;
}

export function CardComponent({ 
  card, 
  onClick, 
  isCollected, 
  className, 
  isRevealing, 
  animationDelay,
  viewContext = 'default',
  pokedexNumber
}: CardComponentProps) {
  const rarityColorClass = () => {
    switch (card.rarity) {
      case 'Common': return 'border-gray-300 hover:border-gray-400';
      case 'Uncommon': return 'border-green-400 hover:border-green-500';
      case 'Rare': return 'border-blue-400 hover:border-blue-500';
      case 'Holo Rare': return 'border-purple-500 hover:border-purple-600 animate-rarity-glow-holo shadow-lg';
      default: return 'border-gray-300';
    }
  };
  
  const rarityTextClass = () => {
    switch (card.rarity) {
      case 'Common': return 'text-gray-500';
      case 'Uncommon': return 'text-green-600';
      case 'Rare': return 'text-blue-600';
      case 'Holo Rare': return 'text-purple-700 font-semibold';
      default: return 'text-gray-500';
    }
  };

  if (viewContext === 'pokedex') {
    return (
      <div
        className={cn(
          "flex flex-col items-center group",
          onClick ? "cursor-pointer" : "",
          className
        )}
        onClick={onClick}
        aria-label={`Pokemon card: ${card.name}`}
      >
        <div className={cn(
          "relative w-[150px] h-[210px] sm:w-[180px] sm:h-[252px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1",
          isCollected === false ? "grayscale" : "",
           rarityColorClass() // Apply border based on rarity for Pokedex view as well
        )}>
          <Image
            src={card.image}
            alt={card.name}
            fill
            className="object-cover"
            data-ai-hint={card.dataAiHint || card.name}
            priority={pokedexNumber !== undefined && pokedexNumber <= 12} // Prioritize first few images
          />
           {card.rarity === 'Holo Rare' && isCollected !== false && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
                   style={{
                     background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                     transform: 'skewY(-10deg) scale(1.5)',
                     animation: 'holoShine 5s infinite linear'
                   }}>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 w-[150px] sm:w-[180px] bg-foreground text-background text-center py-1 px-2 rounded-md shadow">
          <p className="text-xs sm:text-sm font-semibold truncate" title={card.name}>
            #{card.pokedexNumber || '?'} - {card.name}
          </p>
        </div>
      </div>
    );
  }

  // Default view (for pack opening, modal, etc.)
  return (
    <Card
      className={cn(
        "w-[240px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group",
        onClick ? "cursor-pointer" : "",
        isCollected === false && viewContext !== 'pokedex' ? "opacity-50 grayscale" : "opacity-100", // Grayscale for uncollected only if not in Pokedex view where it's handled differently
        rarityColorClass(),
        isRevealing ? "animate-card-reveal opacity-0" : "",
        className
      )}
      style={isRevealing ? { animationDelay } : {}}
      onClick={onClick}
      aria-label={`Pokemon card: ${card.name}`}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={card.image}
          alt={card.name}
          width={240}
          height={336}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={card.dataAiHint || card.name}
          priority 
        />
        {isCollected && (
           <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground">Collected</Badge>
        )}
      </CardHeader>
      <CardContent className="p-3 bg-card">
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-lg font-headline truncate" title={card.name}>{card.name}</CardTitle>
          <PokemonTypeIcon type={card.type} />
        </div>
        <div className="flex justify-between items-center text-xs">
          <p className={cn("font-semibold", rarityTextClass())}>{card.rarity}</p>
          <p className="text-muted-foreground">HP: {card.hp}</p>
        </div>
      </CardContent>
      {card.rarity === 'Holo Rare' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
               style={{
                 background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                 transform: 'skewY(-10deg) scale(1.5)',
                 animation: 'holoShine 5s infinite linear'
               }}>
          </div>
        </div>
      )}
    </Card>
  );
}
