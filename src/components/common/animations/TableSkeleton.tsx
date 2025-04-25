const TableSkeleton = () => {
  return (
    <section className="bg-white/50 w-full h-auto animate-pulse duration-75 p-1">
      <div className="w-full bg-gray-200 h-12 p-2 rounded-md"></div>
      {Array.from({ length: 5 }, (_, i) => (
        <div className="grid grid-cols-7 gap-1 my-3 px-3">
          {Array.from({ length: 7 }, (_, i) => (
            <div className="h-10  bg-gray-200 w-full rounded-md"></div>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2 my-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div className="border border-gray-300 rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer bg-gray-200 h-8 w-8 hover:bg-black hover:text-white"></div>
        ))}
      </div>
    </section>
  );
};

export default TableSkeleton;
