
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { PokemonCard } from '@/lib/types';
import { generateCardTrivia, type GenerateCardTriviaOutput } from '@/ai/flows/generate-card-trivia';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';
import { Loader2 } from 'lucide-react';
import { PokemonTypeIcon } from './pokemon-type-icon';
import { Badge } from './ui/badge';

interface CardDetailModalProps {
  card: PokemonCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailModal({ card, isOpen, onClose }: CardDetailModalProps) {
  const [trivia, setTrivia] = useState<string | null>(null);
  const [loadingTrivia, setLoadingTrivia] = useState(false);
  const [errorTrivia, setErrorTrivia] = useState<string | null>(null);

  useEffect(() => {
    if (card && isOpen) {
      setLoadingTrivia(true);
      setErrorTrivia(null);
      setTrivia(null); // Reset trivia when a new card is opened
      generateCardTrivia({
        cardName: card.name,
        cardType: card.type,
        cardRarity: card.rarity,
      })
        .then((response: GenerateCardTriviaOutput) => {
          setTrivia(response.trivia);
        })
        .catch((error) => {
          console.error('Failed to generate trivia:', error);
          setErrorTrivia('Could not load trivia at this time.');
        })
        .finally(() => {
          setLoadingTrivia(false);
        });
    }
  }, [card, isOpen]);

  if (!card) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0"> {/* Simplified max width */}
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 flex flex-col items-center">
            <DialogHeader className="w-full mb-4">
              <DialogTitle className="text-2xl font-headline text-primary-foreground text-center">
                {card.name}
              </DialogTitle>
              <div className="flex items-center justify-center space-x-2 pt-1">
                  <Badge variant={card.rarity === 'Holo Rare' ? 'destructive' : 'secondary'} className="text-xs">{card.rarity}</Badge>
                  {card.type !== 'Trainer' && card.type !== 'Energy' && <PokemonTypeIcon type={card.type} className="h-5 w-5" />}
                  {card.pokedexNumber && <span className="text-xs text-muted-foreground">#{card.pokedexNumber}</span>}
              </div>
            </DialogHeader>
            
            <Image
              src={card.image}
              alt={card.name}
              width={300} // Adjusted for a reasonable modal size
              height={420} // Maintain aspect ratio
              className="object-contain rounded-lg shadow-xl border-2 border-primary mb-4"
              data-ai-hint={card.dataAiHint || card.name}
            />
            
            <Separator className="my-4" />

            <h3 className="text-lg font-semibold mb-2 font-headline">Trivia</h3>
            {loadingTrivia && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating trivia...</span>
              </div>
            )}
            {errorTrivia && <p className="text-destructive text-sm">{errorTrivia}</p>}
            {trivia && <p className="text-sm bg-secondary/30 p-3 rounded-md leading-relaxed text-foreground">{trivia}</p>}
            
            <Separator className="my-4" />

            <Button onClick={onClose} variant="outline" className="w-full">Close</Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
