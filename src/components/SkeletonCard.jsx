const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700/50 transition-all duration-300 hover:shadow-md">
      <div className="aspect-video bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600/80 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-4/5 animate-pulse" />
        <div className="h-5 bg-slate-100 dark:bg-slate-700/80 rounded-md w-3/4 animate-pulse" />
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="h-7 w-20 bg-slate-100 dark:bg-slate-700/60 rounded-full animate-pulse" />
          <div className="h-7 w-16 bg-slate-100 dark:bg-slate-700/60 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
