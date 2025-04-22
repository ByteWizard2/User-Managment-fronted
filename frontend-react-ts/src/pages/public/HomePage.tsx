const HomePage = () => {
  return (
    <div className="pageTemplate1">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-10 bg-purple-600 border-4 border-white rounded-[300px] ring-4 ring-purple-600 p-1">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-start gap-3 lg:ml-16">
          <h1 className="text-6xl lg:text-6xl font-bold text-transparent bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text">
            Dev Empower
          </h1>
          <h2 className="text-2xl lg:text-[38px] font-bold text-white">
            A Home for developers🚀 
          </h2>
          <div className="space-y-2 text-xl lg:text-[28px] font-semibold text-white">
            <h3>This is a tutorial project for</h3>
            <h3 className="text-5xl lg:text-6xl font-normal text-transparent bg-gradient-to-tr from-[#DAC6FB] to-[#AAC1F6] bg-clip-text">
              JWT
            </h3>
            <h3 className="text-2xl lg:text-3xl">Authentication and Authorization</h3>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="images/me.jpeg"
            alt="Dev"
            className="w-60 h-60 lg:w-[360px] lg:h-[360px] object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
