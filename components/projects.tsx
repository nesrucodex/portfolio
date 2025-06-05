"use client";

import { useState, useEffect } from "react";
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
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Github,
  Eye,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/constants";

// Japanese kanji for projects
const projectKanji = ["作", "品", "業", "務"];



export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentKanji, setCurrentKanji] = useState(0);

  // Cycle through kanji characters
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKanji((prev) => (prev + 1) % projectKanji.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const openProjectDetails = (project: (typeof PROJECTS)[0]) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden"
    >
      {/* Animated Clouds Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            initial={{
              x: -200,
              y: Math.random() * 800,
            }}
            animate={{
              x: 1400,
              y: Math.random() * 800,
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <svg
              width="100"
              height="50"
              viewBox="0 0 100 50"
              fill="currentColor"
              className="text-orange-400"
            >
              <path d="M15 30c-6 0-12-5-12-12s6-12 12-12c2 0 3 0.5 5 1.5C22 4 27 0 33 0c9 0 17 8 17 17 0 2-0.5 3-1 5 6 2 11 7 11 13 0 8-6 14-14 14H15z" />
            </svg>
          </motion.div>
        ))}

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.3),transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Animated Kanji Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentKanji}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] opacity-5 text-orange-400 font-bold pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            transition={{ duration: 2 }}
          >
            {projectKanji[currentKanji]}
          </motion.div>
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            A selection of my recent work. Each project represents a unique
            challenge and innovative solution.
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            onClick={prevProject}
            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-400 transition-colors bg-slate-800/50 rounded-lg border border-slate-600/50 hover:border-orange-400/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </motion.button>

          {/* Pagination dots */}
          <div className="flex gap-3">
            {PROJECTS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
                whileHover={{ scale: 1.2 }}
                animate={
                  index === currentProject
                    ? {
                        boxShadow: [
                          "0_0_10px_rgba(251,146,60,0.8)",
                          "0_0_20px_rgba(251,146,60,1)",
                          "0_0_10px_rgba(251,146,60,0.8)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextProject}
            className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-orange-400 transition-colors bg-slate-800/50 rounded-lg border border-slate-600/50 hover:border-orange-400/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Project Display */}
        <motion.div
          key={currentProject}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Project Image */}
                <div className="relative h-64 md:h-96 bg-slate-900">
                  <Image
                    src={PROJECTS[currentProject].image || "/placeholder.svg"}
                    alt={PROJECTS[currentProject].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-orange-400/60"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-orange-400/60"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-orange-400/60"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-orange-400/60"></div>
                </div>

                {/* Project Info */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-orange-400 uppercase tracking-wide flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Project {(currentProject + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    {PROJECTS[currentProject].title}
                  </h3>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {PROJECTS[currentProject].description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {PROJECTS[currentProject].techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-200 border border-blue-400/40 hover:bg-blue-500/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() =>
                        openProjectDetails(PROJECTS[currentProject])
                      }
                      variant="outline"
                      className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>

                    <Link
                      href={PROJECTS[currentProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </Link>

                    <Link
                      href={PROJECTS[currentProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedProject && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border border-slate-700 text-white">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-orange-400" />
                <DialogTitle className="text-2xl text-white">
                  {selectedProject.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-slate-300">
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden border border-slate-700">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Overview
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-200 border border-blue-400/40"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-700">
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
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
                      className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
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
