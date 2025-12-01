const NewReleaseLoading = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white">Mới phát hành</h2>
      </div>
      <div className="flex justify-between">
        <div className="w-full px-2 sm:px-0">
          <div className="flex flex-col gap-3">
            <div className="h-8 w-full animate-pulse rounded-md bg-slate-600" />
            <div className="h-90 w-full animate-pulse rounded-md bg-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleaseLoading;
