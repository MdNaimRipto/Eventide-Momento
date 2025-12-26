const EventCardSkeleton = () => {
  return (
    <div className="bg-primary w-full overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-[250px] bg-secondary1/10" />

      <div className="px-4 py-6 flex flex-col h-1/2 gap-4">
        <div className="h-6 w-3/4 bg-secondary1/20 rounded" />

        <div className="flex gap-3">
          <div className="h-4 w-20 bg-secondary1/20 rounded" />
          <div className="h-4 w-16 bg-secondary1/20 rounded" />
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="h-3 w-12 bg-secondary1/20 rounded mb-2" />
            <div className="h-8 w-16 bg-secondary1/30 rounded" />
          </div>

          <div className="h-10 w-32 bg-secondary1/30 rounded" />
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
