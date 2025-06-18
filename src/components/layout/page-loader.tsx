
"use client";

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow h-full py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
      <p className="text-2xl font-headline font-semibold text-primary-foreground dark:text-foreground animate-pulse">
        Gotta catch 'em all...
      </p>
    </div>
  );
}
