
import Image from 'next/image';

// This will be a server component by default
export default function HomePage() {
  return (
    <div className="space-y-10 flex flex-col flex-grow items-center justify-center text-center p-4">
      <header className="space-y-6 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary-foreground dark:text-foreground drop-shadow-md">
          Welcome to PokePack Opener SG!
        </h1>
        <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border-4 border-primary dark:border-primary/80 group">
          <Image
            src="https://placehold.co/800x450.png"
            alt="A vibrant collection of Pokémon ready for adventure"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint="pokemon group welcome"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
      </header>
      <section className="max-w-2xl lg:max-w-3xl">
        <p className="text-lg sm:text-xl text-muted-foreground dark:text-foreground/85 leading-relaxed">
          Dive into the exciting world of Pokémon cards. Open virtual booster packs from various sets, discover rare and powerful Pokémon, build your Pokédex, and assemble your ultimate battle teams. Your adventure starts here!
        </p>
      </section>
      {/* 
        Future enhancements could include:
        - A "Featured Pack" section linking to a specific pack.
        - Statistics like "Total Packs Opened by Community".
        - A "Call to Action" button like "Start Opening Packs!"
      */}
    </div>
  );
}
