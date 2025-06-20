
import { allPacks } from '@/lib/pack-data';
import { PackItem } from '@/components/pack-item';

export default function PackSelectionPage() {
  return (
    <div className="space-y-8 flex flex-col flex-grow">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground mb-2">Choose Your Adventure!</h1>
        <p className="text-lg text-muted-foreground dark:text-foreground/80">Select a Pokémon card pack to open and see what treasures await.</p>
      </header>
      
      {allPacks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allPacks.map((pack) => (
            <PackItem key={pack.id} pack={pack} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No packs available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
