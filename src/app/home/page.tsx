
"use client"; // Spline component needs to be client-side

import Spline from '@splinetool/react-spline';

export default function HomePage() {
  return (
    // This outer div is now primarily for structuring the content overlay
    // within the main content area provided by the layout.
    <div className="relative flex flex-col flex-grow items-center justify-center text-center">
      
      {/* Spline Scene Container - Fixed position to act as a true background */}
      {/* It will be behind other content with higher z-index or explicit backgrounds. */}
      <div className="fixed inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/XxKU8Oe97YpmuHwh/scene.splinecode"
          style={{ width: '100%', height: '100%' }} // Spline component fills this fixed div
        />
      </div>

      {/* Content Overlay - Positioned above Spline.
          Needs its own padding and max-width to keep text readable and centered.
          flex-grow here, along with items-center/justify-center on its parent, helps vertically center this block.
      */}
      <div className="relative z-10 flex flex-col flex-grow items-center justify-center text-center p-4 space-y-10 
                      w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="space-y-6 w-full max-w-4xl">
          {/* Added text-shadow for better readability over 3D background */}
          <h1 className="text-4xl sm:text-5xl font-headline font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Welcome to PokePack Opener SG!
          </h1>
        </header>
        <section className="max-w-2xl lg:max-w-3xl">
          {/* Adjusted text color and added shadow for readability */}
          <p className="text-lg sm:text-xl text-gray-100 dark:text-gray-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] leading-relaxed">
            Dive into the exciting world of Pokémon cards. Open virtual booster packs from various sets, discover rare and powerful Pokémon, build your Pokédex, and assemble your ultimate battle teams. Your adventure starts here!
          </p>
        </section>
      </div>
      {/* 
        Future enhancements could include:
        - A "Featured Pack" section linking to a specific pack.
        - Statistics like "Total Packs Opened by Community".
        - A "Call to Action" button like "Start Opening Packs!"
      */}
    </div>
  );
}
