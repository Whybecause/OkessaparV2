"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { motion } from "framer-motion";

import SocialLinks from "@/components/social-links";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HomePage = () => {
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.05, // Ajoute un délai pour chaque lettre
      },
    }),
  };
  const title = "Un voyage musical qui réveille les sens";

  const parentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const photoHover = {
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)", // Ombre
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const PHOTOS = [
    { src: "/photos/flav_2.png", label: "Flav" },
    { src: "/photos/lucas-min.png", label: "Lucas" },
    { src: "/photos/thomas-min.png", label: "Thomas" },
    { src: "/photos/max_2.png", label: "Max" },
  ];

  return (
    <motion.div
      className="relative z-10 px-4 pb-4 md:px-0 flex items-center flex-col justify-center min-h-[calc(100dvh-48px)] bg-black text-white"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* LOGO */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.2, duration: 0.8 },
          },
        }}
      >
        <Image
          src="/logo-full.webp"
          alt="Logo"
          className="object-contain"
          width={500}
          height={250}
          priority
        />
      </motion.div>

      {/* SOCIAL LINKS */}
      <motion.div className="flex gap-x-4 items-center" variants={fadeIn}>
        <SocialLinks />
      </motion.div>

      {/* TITLE */}
      <motion.h2
        className="text-2xl font-semibold my-16 text-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.5, // Attendre 1.5 secondes avant de commencer l'animation du titre
            },
          },
        }}
      >
        {title.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letterAnimation}
                custom={charIndex}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            &nbsp;{/* Ajoute un espace non-brisant entre les mots */}
          </span>
        ))}
      </motion.h2>

      {/* DESCRIPTION TEXT */}
      <motion.div
        className="max-w-2xl text-center leading-loose mb-16 text-gray-300"
        variants={fadeIn}
      >
        <p>
          Dans l’univers d’Okessapar, le quotidien se fait poésie. Une voix
          singulière, oscillant entre chants incisifs et slams mélodieux, trace
          la ligne fine entre douceur et intensité. Sur des textes en français
          doux comme percutants, chaque note réchauffe, secoue, réveille.
        </p>
        <br />
        <p>
          Café crème des mots, espresso des rythmes : bienvenue dans une
          expérience musicale qui rallume les sens. Entre pop-slam alternatif,
          groove audacieux et envolées électro, Okessapar, c’est une énergie
          brute enveloppée de douceur. Une invitation à vibrer, à ressentir...
          et à repartir électrisé.
        </p>
      </motion.div>

      {/* CTA BUTTON */}
      <motion.div variants={fadeIn}>
        <Link href="/music" aria-label="Aller à Musique">
          <Button>Découvrir Okessapar</Button>
        </Link>
      </motion.div>

      {/* BAND PHOTOS */}
      <motion.div
        className="gap-4 mt-12 grid grid-cols-2 md:grid-cols-4"
        variants={fadeIn}
      >
        {PHOTOS.map((photo, index) => (
          <motion.div key={index} whileHover="hover" variants={photoHover}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative w-44 h-44 rounded-full flex overflow-hidden border border-gray-700">
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      className="object-cover"
                      layout="fill"
                      priority
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">{photo.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
