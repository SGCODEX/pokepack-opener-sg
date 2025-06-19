
import Image from 'next/image';
import Link from 'next/link';
import type { PokemonPack } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackItemProps {
  pack: PokemonPack;
}

export function PackItem({ pack }: PackItemProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
      <CardHeader className="p-0 relative aspect-[5/7]">
        <Image
          src={pack.image}
          alt={pack.name}
          fill={true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={pack.dataAiHint || pack.name}
        />
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-xl font-headline mb-2" title={pack.name}>{pack.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-1">{pack.series}</p>
        <p className="text-sm text-muted-foreground mb-4">{pack.cardsPerPack} cards per pack</p>
        <div className="mt-auto">
          <Button 
            asChild 
            className={cn(
              "w-full",
              "bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)]", // Blue background, darker blue on hover
              "text-white" // White text always
            )}
          >
            <Link href={`/packs/${pack.id}/open`}>
              <PackageOpen className="mr-2 h-5 w-5" />
              Open Pack
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
