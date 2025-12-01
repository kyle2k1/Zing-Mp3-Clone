const Loading = () => {
  return (
    <div className="h-36 w-full overflow-hidden md:h-40 md:w-full lg:h-44 lg:w-full xl:h-46 xl:w-full 2xl:h-46 2xl:w-full">
      <div className="grid grid-cols-2 gap-1 shadow sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_x, index) => (
          <div className="" key={index}>
            <div className="h-36 w-36 animate-pulse rounded-md bg-slate-600 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-46 xl:w-46 2xl:h-46 2xl:w-46" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
