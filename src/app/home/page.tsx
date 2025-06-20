
"use client"; // Spline component needs to be client-side

import Spline from '@splinetool/react-spline';

export default function HomePage() {
  return (
    // This outer div is now primarily for structuring the content overlay
    // within the main content area provided by the layout.
    <div className="relative flex flex-col flex-grow items-center justify-center">
      
      {/* Spline Scene Container - Fixed position to act as a true background */}
      <div className="fixed inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/UzrvpUcT7-i5b2xS/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Content Overlay - Positioned above Spline.
          Aligned to the start (left) for a more modern feel.
      */}
      <div className="relative z-10 flex flex-col flex-grow items-start justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-8">
        <header className="space-y-4 w-full max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold text-white text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            Welcome to PokePack Opener SG!
          </h1>
        </header>
        <section className="max-w-xl lg:max-w-2xl text-left">
          <p className="text-xl sm:text-2xl font-headline font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-relaxed">
            Unlock the thrill of Pokémon TCG. Open virtual packs, collect rare cards, and build your dream team. Start your adventure!
          </p>
        </section>
      </div>
      {/* 
        Future enhancements could include:
        - A "Call to Action" button like "Start Opening Packs!" linked to '/'
        - Maybe a small section highlighting a "Featured Pack".
      */}
    </div>
  );
}
