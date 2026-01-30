import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  className?: string;
}

// The main reusable Hero Section component
export const MinimalistHero = ({
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-background pb-8 font-sans md:pb-12',
        className
      )}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 0%, transparent 50%)`
        }}></div>
      </div>
      {/* Minimal Header - removed logo */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between h-1">
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-foreground/90 md:mx-0 font-light tracking-wide dark:text-foreground/80">{mainText}</p>
          <motion.a
            href={readMoreLink}
            className="mt-6 inline-block text-sm font-medium text-foreground underline decoration-2 underline-offset-4 hover:decoration-primary transition-all duration-300 dark:text-foreground/90"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.a>
        </motion.div>

        {/* Center Image with Enhanced Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          {/* Animated glow effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#57a2af]/40 to-[#3d7d8a]/30 blur-xl md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] dark:from-[#57a2af]/50 dark:to-[#2d5d6a]/40"
          ></motion.div>
          {/* Main circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#57a2af]/95 via-[#4a8a96]/90 to-[#3d7d8a]/85 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] shadow-2xl dark:from-[#57a2af]/90 dark:via-[#4a8a96]/85 dark:to-[#2d5d6a]/80"
          ></motion.div>
          {/* Image with subtle animation */}
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-96 object-cover md:w-[28rem] lg:w-[32rem] scale-140 rounded-full shadow-2xl ring-4 ring-white/20 dark:ring-black/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
            }}
          />
        </div>

        {/* Right Text with Enhanced Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <motion.h1
            className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl tracking-tight dark:text-foreground/95"
            initial={{ letterSpacing: "0.1em" }}
            animate={{ letterSpacing: "0em", y: [0, -5, 0] }}
            transition={{
              letterSpacing: { duration: 1, delay: 1.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span className="text-foreground dark:text-foreground/90 inline-block">
              {overlayText.part1}
            </span>
            <br />
            <span className="text-foreground/80 dark:text-foreground/70 inline-block">
              {overlayText.part2}
            </span>
          </motion.h1>
        </motion.div>
      </div>


    </div>
  );
};
