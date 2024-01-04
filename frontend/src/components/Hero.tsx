import { FaAngleDown } from "react-icons/fa6";
import profileImage from "../assets/images/profile02.png";
const Hero = () => {
  return (
    <section className="h-[calc(100vh-100px)] bg-gradient-to-b from-[#0c0c1d] to-[#111132]">
      <div className="max-w-5xl mx-auto relative h-full flex items-center overflow-hidden max-sm:px-4">
        <div className="flex flex-col gap-6  sm:gap-8 md:gap-10">
          <h1 className="text-purple-800 uppercase tracking-wider font-semibold text-lg sm:text-2xl ">
            Nesredin Getahun
          </h1>
          <h2 className="text-2xl sm:text-5xl font-semibold leading-[1.4]">
            Web & Application{" "}
            <span className="block text-red-400">Developer</span>
          </h2>

          <section className="flex gap-4 relative z-[99]">
            <button className="py-1 px-2 text-sm sm:text-md sm:py-2 sm:px-4 border-[1.4px] rounded-md transition-all duration-200 hover:opacity-90 active:opacity-80">
              See the Latest Works
            </button>
            <button className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-md  border-[1.4px] rounded-md bg-white text-black transition-all duration-200 hover:opacity-90 active:opacity-80">
              Contact Me
            </button>
          </section>

          <div className="text-xl animate-bounce absolute bottom-4">
            <FaAngleDown />
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 h-full max-sm:-right-[100px] z-[9]">
          <img src={profileImage} alt="profile" className="h-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
