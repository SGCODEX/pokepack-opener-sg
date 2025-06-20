
// This will be a server component by default
export default function HomePage() {
  return (
    <div className="space-y-8 flex flex-col flex-grow items-center justify-center">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground mb-2">
          Home Page
        </h1>
        <p className="text-lg text-muted-foreground dark:text-foreground/80">
          Welcome! This page is currently under construction.
        </p>
      </header>
      {/* You can add more content here later */}
    </div>
  );
}
