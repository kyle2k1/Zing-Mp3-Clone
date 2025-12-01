const RadioLoading = () => {
  return (
    <div id="radio" className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">Radio Nổi Bật</h2>
      </div>
      <div className="h-36 w-full animate-pulse rounded-md bg-slate-600 sm:h-36 md:h-36 xl:h-36 2xl:h-36" />
    </div>
  );
};

export default RadioLoading;
