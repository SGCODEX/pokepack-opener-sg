"use client";

// This is a placeholder for a future feature.
// For now, it just displays a "Coming Soon" message.

export default function SurprisePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">
        Coming Soon!
      </h1>
      <p className="text-lg text-muted-foreground dark:text-foreground/80 mt-4">
        A surprise is waiting for you here...
      </p>
    </div>
  );
}
