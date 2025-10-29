const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {/* Simple Loading Indicator */}
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;