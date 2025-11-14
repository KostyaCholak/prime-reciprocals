import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-border fixed top-0 left-0 right-0 bg-background/50 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Prime Reciprocals
          </h1>
          {/* <p className="text-sm text-muted-foreground mt-1">
            Patterns in prime number reciprocals
          </p> */}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

