"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ASSETS from "@/utils/assets";
import { Progress } from "./ui/progress";

type Skill = {
  label: string;
  level: number; // 0–100 for skill level
};

const SKILLS: Skill[] = [
  { label: "JavaScript", level: 100 },
  { label: "TypeScript", level: 90 },
  { label: "React", level: 95 },
  { label: "Next.js", level: 90 },
  { label: "Node.js", level: 95 },
  { label: "Express", level: 90 },
  { label: "MongoDB", level: 85 },
  { label: "PostgreSQL", level: 80 },
  { label: "GraphQL", level: 75 },
  { label: "Tailwind CSS", level: 85 },
  { label: "Docker", level: 70 },
  { label: "AWS", level: 65 },
  { label: "Git", level: 95 },
  { label: "CI/CD", level: 80 },
  { label: "Responsive Design", level: 90 },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden border shadow-lg">
              <Image
                src={ASSETS.IMAGES.MY_IMAGE}
                alt="Nesru Codex"
                fill
                className="object-cover"
                placeholder="blur"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a passionate Full Stack Developer with a strong focus on
                creating efficient, scalable, and user-friendly web
                applications. With years of experience in both frontend and
                backend development, I bring ideas to life through clean code
                and thoughtful architecture.
              </p>
              <p>
                My journey in software development began with a curiosity about
                how things work on the web, which evolved into a career building
                solutions that solve real-world problems. I'm constantly
                learning and adapting to new technologies to stay at the
                forefront of web development.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Skills & Technologies
              </h3>
              <div className="flex flex-col gap-2">
                {SKILLS.map((skill) => (
                  <section
                    key={skill.label}
                    className="flex justify-between items-center gap-3"
                  >
                    <motion.span
                      className="px-3 py-1 bg-muted rounded-full text-sm whitespace-nowrap"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "var(--primary)",
                        color: "white",
                      }}
                    >
                      {skill.label}
                    </motion.span>
                    <Progress value={skill.level} />
                  </section>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
