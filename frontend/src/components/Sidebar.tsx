import { useState } from "react";
import SwapButton from "./SwapButton";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const LinkContainerVariants = {
  open: {
    y: 0,
    x: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
  close: {
    y: -300,
    opacity: 0.2,
    transition: {
      when: "after",
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};
const LinkVariants = {
  open: {
    opacity: 1,
  },
  close: { opacity: 0 },
};

const LinksData = [
  { text: "Home", path: "#hero" },
  { text: "Services", path: "#services" },
  { text: "Portfolio", path: "#portfolio" },
  { text: "Contact Me", path: "#contact" },
];

const Sidebar = () => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className={`fixed top-0 left-0 h-[70vh] sm:h-[60vh] w-[200px] overflow-hidden flex justify-center items-center rounded-md z-[999]`}
    >
      {/* <div
        className={`absolute top-[32px] left-[12px] w-10 h-10 bg-slate-600 rounded-full`}
      ></div> */}
      <SwapButton setShowOptions={setShowOptions} />

      <motion.section
        variants={LinkContainerVariants}
        animate={showOptions ? "open" : "close"}
        className="absolute left-7 flex flex-col gap-4"
      >
        {LinksData.map((link) => (
          <motion.div key={link.text} variants={LinkVariants}>
            <a href={link.path} className="nav-link-hover text-white/95">
              {link.text}
            </a>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default Sidebar;
