"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { PokemonCard } from '@/lib/types';
import { generateCardTrivia, type GenerateCardTriviaOutput } from '@/ai/flows/generate-card-trivia';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PokemonTypeIcon } from './pokemon-type-icon';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Loader2 } from 'lucide-react';

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
      setTrivia(null);
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
      <DialogContent className="max-w-3xl p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="flex flex-col items-center">
              <Image
                src={card.image}
                alt={card.name}
                width={300}
                height={420}
                className="object-cover rounded-lg shadow-xl border-4 border-primary mb-4"
                data-ai-hint={card.dataAiHint || card.name}
              />
            </div>
            
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-headline text-primary-foreground bg-primary p-2 rounded-t-md -mx-6 px-6">
                  {card.name}
                </DialogTitle>
                <div className="flex items-center space-x-2 pt-2">
                  <Badge variant={card.rarity === 'Holo Rare' ? 'destructive' : 'secondary'} className="text-sm">{card.rarity}</Badge>
                  <PokemonTypeIcon type={card.type} className="h-6 w-6" />
                  <span className="text-sm text-muted-foreground">HP: {card.hp}</span>
                </div>
              </DialogHeader>

              <DialogDescription className="text-base text-foreground mb-4">{card.description}</DialogDescription>
              
              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-2 font-headline">Attacks</h3>
              {card.attacks.map((attack, index) => (
                <div key={index} className="mb-2 p-2 bg-secondary/50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{attack.name}</span>
                    <span className="font-bold text-accent">{attack.damage}</span>
                  </div>
                  {attack.description && <p className="text-xs text-muted-foreground">{attack.description}</p>}
                </div>
              ))}

              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <h4 className="font-semibold">Weaknesses:</h4>
                  {card.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-center">
                      <PokemonTypeIcon type={w.type} className="h-4 w-4 mr-1" /> {w.type} ({w.value})
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold">Resistances:</h4>
                  {card.resistances && card.resistances.length > 0 ? card.resistances.map((r, i) => (
                    <div key={i} className="flex items-center">
                      <PokemonTypeIcon type={r.type} className="h-4 w-4 mr-1" /> {r.type} ({r.value})
                    </div>
                  )) : <span className="text-muted-foreground">None</span>}
                </div>
              </div>
              <p className="text-sm"><span className="font-semibold">Retreat Cost:</span> {card.retreatCost}</p>
              
              <Separator className="my-4" />

              <h3 className="text-lg font-semibold mb-2 font-headline">Trivia</h3>
              {loadingTrivia && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating trivia...</span>
                </div>
              )}
              {errorTrivia && <p className="text-destructive">{errorTrivia}</p>}
              {trivia && <p className="text-sm bg-accent/10 p-3 rounded-md leading-relaxed">{trivia}</p>}
            </div>
          </div>
          <div className="p-6 pt-0 flex justify-end">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
