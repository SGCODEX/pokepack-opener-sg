
import Image from 'next/image';
import type { PokemonCard } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PokemonTypeIcon } from './pokemon-type-icon';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CardComponentProps {
  card: PokemonCard;
  onClick?: () => void;
  isCollected?: boolean;
  className?: string;
  isRevealing?: boolean;
  animationDelay?: string;
  viewContext?: 'pokedex' | 'default';
  pokedexNumber?: number | string;
  showDetails?: boolean;
  collectedCount?: number;
}

export function CardComponent({
  card,
  onClick,
  isCollected,
  className,
  isRevealing,
  animationDelay,
  viewContext = 'default',
  pokedexNumber,
  showDetails = true,
  collectedCount = 0,
}: CardComponentProps) {
  const rarityColorClass = () => {
    switch (card.rarity) {
      case 'Common': return 'border-gray-300 hover:border-gray-400';
      case 'Uncommon': return 'border-green-400 hover:border-green-500';
      case 'Rare': return 'border-blue-400 hover:border-blue-500';
      case 'Holo Rare': return 'border-purple-500 hover:border-purple-600 animate-rarity-glow-holo shadow-lg';
      case 'Double Rare': return 'border-sky-400 hover:border-sky-500';
      case 'Ultra Rare': return 'border-indigo-500 hover:border-indigo-600 shadow-md';
      case 'Illustration Rare': return 'border-teal-400 hover:border-teal-500 animate-rarity-glow-holo shadow-lg';
      case 'Special Illustration Rare': return 'border-pink-500 hover:border-pink-600 animate-rarity-glow-holo shadow-xl';
      case 'Hyper Rare': return 'border-amber-400 hover:border-amber-500 animate-rarity-glow-holo shadow-xl';
      default: return 'border-gray-300';
    }
  };

  const rarityTextClass = () => {
    switch (card.rarity) {
      case 'Common': return 'text-gray-500';
      case 'Uncommon': return 'text-green-600';
      case 'Rare': return 'text-blue-600';
      case 'Holo Rare': return 'text-purple-700 font-semibold';
      case 'Double Rare': return 'text-sky-600 font-semibold';
      case 'Ultra Rare': return 'text-indigo-700 font-bold';
      case 'Illustration Rare': return 'text-teal-600 font-bold';
      case 'Special Illustration Rare': return 'text-pink-700 font-extrabold';
      case 'Hyper Rare': return 'text-amber-600 font-extrabold';
      default: return 'text-gray-500';
    }
  };

  const actualIsCollected = viewContext === 'pokedex' ? collectedCount > 0 : isCollected;
  const holoLikeRarities: PokemonCard['rarity'][] = ['Holo Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];


  if (viewContext === 'pokedex') {
    const displayPokedexNumber = card.pokedexNumber || '?';

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
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
                !actualIsCollected ? "grayscale" : "",
                 rarityColorClass()
              )}>
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                  data-ai-hint={card.dataAiHint || card.name}
                  priority={typeof pokedexNumber === 'number' && pokedexNumber <= 12}
                />
                 {holoLikeRarities.includes(card.rarity) && actualIsCollected && (
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
                  #{displayPokedexNumber} - {card.name}
                </p>
              </div>
            </div>
          </TooltipTrigger>
          {actualIsCollected && (
            <TooltipContent>
              <p>Quantity: x{collectedCount}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Default view (for pack opening stack, grid, modal image display primarily)
  return (
    <Card
      className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group",
        onClick ? "cursor-pointer" : "",
        actualIsCollected === false && viewContext !== 'pokedex' ? "opacity-50 grayscale" : "opacity-100",
        rarityColorClass(),
        isRevealing ? "animate-card-reveal opacity-0" : "",
        className
      )}
      style={isRevealing ? { animationDelay } : {}}
      onClick={onClick}
      aria-label={`Pokemon card: ${card.name}`}
    >
      <CardHeader className="p-0 relative aspect-[240/336]">
        <Image
          src={card.image}
          alt={card.name}
          fill={true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={card.dataAiHint || card.name}
          priority
        />
        {actualIsCollected && showDetails && collectedCount > 0 && (
           <Badge variant="default" className="absolute top-2 right-2 bg-accent text-accent-foreground">Collected x{collectedCount}</Badge>
        )}
      </CardHeader>
      {showDetails && (
        <CardContent className="p-3 bg-card">
          <div className="flex justify-between items-center mb-1">
            <CardTitle className="text-lg font-headline truncate" title={card.name}>{card.name}</CardTitle>
            {card.type !== 'Trainer' && card.type !== 'Energy' && <PokemonTypeIcon type={card.type} />}
          </div>
          <div className="flex justify-between items-center text-xs">
            <p className={cn("font-semibold", rarityTextClass())}>{card.rarity}</p>
          </div>
        </CardContent>
      )}
      {holoLikeRarities.includes(card.rarity) && (
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
