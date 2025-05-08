
const TransactionsSkeleton = () => {
  return (
    <section
      className={`lg:grid grid-cols-2 p-4 my-3 gap-3 bg-[#f9f9f9] animate-pulse duration-75 rounded-xl`}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <div
        key={i}
          className={`p-4 rounded-xl bg-white my-3 lg:my-0 hover:bg-white/50 group`}
        >
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
            <div className="flex items-center gap-1">
              <div className="w-16 rounded-lg h-8 bg-gray-300"></div>
              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
              <div className="w-16 rounded-lg h-8 bg-gray-300"></div>
            </div>
            <div className="flex gap-1 items-center">
              <div
                className={`py-1 px-2 flex items-center justify-center rounded-xl bg-gray-300`}
              >
                <div className="w-16 h-8 bg-gray-300 rounded-lg"></div>
              </div>
              <div
                className={`py-1 px-2 flex items-center justify-center rounded-xl cursor-pointer`}
              >
                <div className="w-12 h-6 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-18 h-18 rounded-xl bg-gray-300"></div>
              <div>
                <div className="w-34 rounded-md h-8 bg-gray-300 my-2"></div>
                <div className="w-20 rounded-md h-8 bg-gray-300"></div>
              </div>
            </div>

            <div className={``}>
              <div className="w-10 my-2 h-8 bg-gray-300 rounded-md"></div>
              <div className="w-17 h-10 bg-gray-300 rounded-md"></div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TransactionsSkeleton;
