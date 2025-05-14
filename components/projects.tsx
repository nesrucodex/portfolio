"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Github,
  Maximize2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ASSETS from "@/utils/assets";

const projects = [
  {
    id: 1,
    title: "Endubis Wallet",
    description:
      "At Endubis, the Cardano Wallet project aims to simplify ADA asset management through a secure Telegram bot, making crypto accessible in Ethiopia. I helped build and deploy the backend, integrating Cardano's API and designing commands for an intuitive user experience in Telegram.",
    image: ASSETS.IMAGES.ENDUBIS_V2,
    color: "#FF6B6B",
    techStack: [
      "TypeScript",
      "Mantine",
      "Tailwind",
      "Next.js",
      "Express.js",
      "Prisma",
      "Zod",
    ],
    link: "https://t.me/EndubisTestWalletBot",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A secure and user-friendly Cardano wallet experience integrated into Telegram, tailored for the Ethiopian market. This project enables users to manage their ADA assets, check balances, and perform transactions through a Telegram bot interface. I contributed to the backend development, implementing Cardano API integrations, Telegram command handlers, and ensuring a smooth, intuitive user experience within the chat environment.",
    features: [
      "Secure ADA asset management via Telegram bot",
      "Cardano blockchain API integration",
      "User-friendly Telegram commands for wallet operations",
      "Balance checking and transaction initiation",
      "Backend built with Node.js and Express",
      "Localized for the Ethiopian crypto community",
    ],
  },
  {
    id: 2,
    title: "SoundRig",
    description:
      "SoundRig is a music streaming platform where users can discover, share, and stream songs and albums. It offers a personalized listening experience with curated playlists and allows users to connect with artists and other music enthusiasts. The platform also supports features like offline listening and social sharing.",
    image: ASSETS.IMAGES.SOUNDRIG,
    color: "#4ECDC4",
    techStack: ["TypeScript", "Mantine", "Tailwind", "Next.js"],
    link: "soundrig-artist-app.vercel.app",
    github: "https://github.com/nesrucodex",
    longDescription:
      "A dynamic music streaming platform built with Next.js and TypeScript, designed for seamless discovery, sharing, and streaming of songs and albums. SoundRig offers users a personalized experience through curated playlists, offline listening options, and social sharing capabilities. It fosters a community-driven environment where users can follow artists, interact with other music lovers, and share their favorite tracks. The platform prioritizes an intuitive, responsive UI and robust performance for uninterrupted music enjoyment.",
    features: [
      "Personalized playlists and recommendations",
      "Stream songs, albums, and curated mixes",
      "Offline listening support",
      "Artist profiles and fan interactions",
      "Social sharing for tracks and playlists",
      "Responsive and modern user interface",
    ],
  },
  {
    id: 3,
    title: "Shengo",
    description:
      "Shengo Web App is a platform that automates contracts for various transactions, such as selling, buying, renting, and more.",
    image: ASSETS.IMAGES.SHENGO,
    color: "#FFD166",
    techStack: [
      "Typescript",
      "Tailwind",
      "Next.js",
      "Prisma",
      "Postgres",
      "Zod",
      "@tanstack/react-query",
    ],
    link: "shengo.vercel.app",
    github: "https://github.com/nesrucodex/shengo",
    longDescription:
      "An innovative web application designed to automate contract creation and management for diverse transactions, including selling, buying, renting, and service agreements. Built with Vue.js and Express, Shengo streamlines the traditionally manual process of drafting contracts by providing customizable templates and secure digital signing capabilities. Users can easily generate, review, and manage legally binding agreements online, reducing paperwork and improving transaction efficiency.",
    features: [
      "Automated contract generation for various transaction types",
      "Customizable contract templates",
      "Secure digital signing functionality",
      "Contract history and status tracking",
      "User authentication and role-based access",
    ],
  },
];

// Custom hook for card swapping
const useSwapper = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    // Calculate the new page index
    let newPage = page + newDirection;

    // Handle wrapping around at the boundaries
    if (newPage < 0) newPage = projects.length - 1;
    if (newPage >= projects.length) newPage = 0;

    setPage([newPage, newDirection]);
  };

  return {
    page,
    direction,
    paginate,
  };
};

// Animation variants
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    };
  },
};

// Swipe threshold for touch detection
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [autoSwapEnabled, setAutoSwapEnabled] = useState(true);

  // Use the custom swapper hook
  const { page, direction, paginate } = useSwapper();

  // Auto-swap timer
  useEffect(() => {
    if (!autoSwapEnabled) return;

    const interval = setInterval(() => {
      paginate(1); // Move forward by default
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSwapEnabled, paginate]);

  const openProjectDetails = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setDialogOpen(true);
    setAutoSwapEnabled(false);
  };

  // Re-enable auto-swap after inactivity
  const enableAutoSwap = () => {
    setTimeout(() => {
      setAutoSwapEnabled(true);
    }, 10000);
  };

  const handleNavigation = (direction: number) => {
    paginate(direction);
    setAutoSwapEnabled(false);
    enableAutoSwap();
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        {projects.map((project, idx) => (
          <motion.div
            key={`bg-${project.id}`}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              backgroundColor: project.color,
              width: "30vw",
              height: "30vw",
              top: `${(idx * 20) % 80}%`,
              left: `${(idx * 25) % 90}%`,
              zIndex: -1,
            }}
            animate={{
              x: [0, 50, 0, -50, 0],
              y: [0, -30, 50, 30, 0],
            }}
            transition={{
              duration: 20 + idx * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique
            challenge and solution.
          </p>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="relative z-10 mb-8 flex justify-between items-center">
          <button
            onClick={() => handleNavigation(-1)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Previous project"
          >
            <div className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="hidden md:block">Previous</span>
          </button>

          {/* Pagination Indicators */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDirection = index > page ? 1 : -1;
                  handleNavigation(newDirection);
                }}
                className="group"
                aria-label={`Go to project ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === page
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavigation(1)}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Next project"
          >
            <span className="hidden md:block">Next</span>
            <div className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              <ArrowRight className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Projects Swapper */}
        <div className="relative h-[600px] md:h-[500px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  handleNavigation(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  handleNavigation(-1);
                }
              }}
              className="absolute w-full"
            >
              <ProjectCard
                project={projects[page]}
                index={page}
                isInView={isInView}
                openProjectDetails={openProjectDetails}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe Indicator */}
        <motion.div
          className="flex items-center justify-center mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mr-3 animate-pulse" />
          Swipe to explore projects
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full ml-3 animate-pulse" />
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            enableAutoSwap();
          }
        }}
      >
        {selectedProject && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedProject.color }}
                />
                <DialogTitle className="text-2xl">
                  {selectedProject.title}
                </DialogTitle>
              </div>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <div
                className="relative h-64 w-full mb-6 rounded-lg overflow-hidden border"
                style={{ borderColor: `${selectedProject.color}40` }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-background/30 z-10"
                  style={{ backgroundColor: `${selectedProject.color}10` }}
                />
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    Overview
                  </h3>
                  <p className="mt-2">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    Key Features
                  </h3>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div
                          className="w-2 h-2 rounded-full mt-2"
                          style={{ backgroundColor: selectedProject.color }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="px-3 py-1"
                        style={{
                          borderColor: `${selectedProject.color}40`,
                          backgroundColor: `${selectedProject.color}10`,
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="flex items-center gap-2"
                      style={{
                        backgroundColor: selectedProject.color,
                        color: "#fff",
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

// Extracted ProjectCard component for cleaner code
function ProjectCard({
  project,
  index,
  isInView,
  openProjectDetails,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
  openProjectDetails: (project: (typeof projects)[0]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 25, scale: 0.9 }}
      animate={{
        opacity: isInView ? 1 : 0,
        rotateY: isInView ? 0 : 25,
        scale: isInView ? 1 : 0.9,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      className="h-full px-8 py-2"
    >
      <div
        className="relative overflow-hidden rounded-2xl border shadow-lg h-full w-full mx-auto max-w-4xl group"
        style={{
          background: `linear-gradient(135deg, ${project.color}20, transparent)`,
          borderColor: `${project.color}40`,
        }}
      >
        {/* Project Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/95 z-10" />
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full p-6 md:p-8 rounded-lg backdrop-blur-sm bg-background/20">
          {/* Project Number */}
          <div
            className="text-8xl font-bold opacity-10 absolute top-0 right-4"
            style={{ color: project.color }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </div>

          {/* Project Info */}
          <div className="mt-auto">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{
                backgroundColor: `${project.color}30`,
                color: project.color,
              }}
            >
              Featured Project
            </div>
            <section className="flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-bold mb-3 text-foreground drop-shadow-md">
                {project.title}
              </h3>

              <p className="text-foreground mb-6 max-w-lg drop-shadow-sm line-clamp-2">
                {project.description}
              </p>
            </section>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-background/50 backdrop-blur-sm border-muted"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => openProjectDetails(project)}
                variant="outline"
                className="group bg-background/50 backdrop-blur-sm hover:bg-background"
              >
                <Maximize2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                View Details
              </Button>

              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  style={{
                    backgroundColor: project.color,
                    color: "#fff",
                  }}
                  className="group hover:opacity-90"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Explore Project
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 opacity-30"
          style={{ borderColor: project.color }}
        />
        <div
          className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 opacity-30"
          style={{ borderColor: project.color }}
        />
      </div>
    </motion.div>
  );
}
