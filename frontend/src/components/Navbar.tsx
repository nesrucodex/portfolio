import { FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <header className="max-w-5xl mx-auto max-lg:px-2 h-[100px]">
      <Sidebar />

      <section className="flex items-center justify-between h-full">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="font-semibold text-xl max-lg:hidden"
        >
          Nesru <span className="text-orange-400">G</span>
        </motion.h1>
        {/* // ! Placeholder when main logo disappear */}
        <h1 className="max-lg:block  hidden"></h1>
        <ul className="flex items-center gap-4 text-lg">
          <li>
            <FaTelegram />
          </li>
          <li>
            <FaGithub />
          </li>
          <li>
            <FaLinkedin />
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Navbar;
