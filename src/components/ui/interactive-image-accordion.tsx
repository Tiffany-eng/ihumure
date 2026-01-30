import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  CloudRain,
  Flame,
  Heart,
  Brain,
  Users,
  Sparkles,
  Shield,
  MessageCircle,
  Compass,
  Activity,
  Sun,
  Moon,
  Star,
  Waves,
  Feather,
  TreePine,
  Droplets,
  Wind
} from 'lucide-react';

// --- Data for the mental health icon accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Anxiety Support',
    icon: Zap,
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/30',
    description: 'Calm your mind and find peace'
  },
  {
    id: 2,
    title: 'Depression Care',
    icon: CloudRain,
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/30',
    description: 'Light in the darkness'
  },
  {
    id: 3,
    title: 'Stress Management',
    icon: Brain,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/30',
    description: 'Balance your inner world'
  },
  {
    id: 4,
    title: 'Mindfulness',
    icon: Sparkles,
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/30',
    description: 'Present moment awareness'
  },
  {
    id: 5,
    title: 'Community Support',
    icon: Users,
    color: 'from-rose-400 to-red-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-900/30',
    description: 'Together we are stronger'
  },
];

// --- Animated Background Elements ---
const AnimatedBackground = ({ isActive, color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0
          }}
          animate={{
            x: [Math.random() * 100, Math.random() * 100],
            y: [Math.random() * 100, Math.random() * 100],
            opacity: isActive ? [0, 0.6, 0] : [0, 0, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient waves */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`}
        animate={{
          scale: isActive ? [1, 1.1, 1] : [1, 1, 1],
          rotate: isActive ? [0, 5, -5, 0] : [0, 0, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }) => {
  const Icon = item.icon;

  return (
    <motion.div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out shadow-lg hover:shadow-2xl
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
      whileHover={{ scale: isActive ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background with animated elements */}
      <div className={`absolute inset-0 ${item.bgColor}`}>
        <AnimatedBackground isActive={isActive} color={item.color} />
      </div>

      {/* Animated Icon */}
      <motion.div
        className="absolute inset-0 flex items-start justify-center pt-12"
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{
          scale: isActive ? 1 : 0.8,
          rotate: isActive ? 0 : 0,
          opacity: isActive ? 1 : 0.9
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <motion.div
          animate={{
            y: isActive ? [0, -10, 0] : [0, 0, 0],
            rotate: isActive ? [0, 10, -10, 0] : [0, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <Icon
            className={`w-12 h-12 bg-gradient-to-br ${item.color} text-white p-2 rounded-xl shadow-lg`}
            strokeWidth={2}
          />
        </motion.div>
      </motion.div>

      {/* Caption Text */}
      <motion.span
        className={`
          absolute text-foreground font-semibold whitespace-nowrap z-10
          transition-all duration-300 ease-in-out
          ${isActive
            ? 'bottom-8 left-1/2 -translate-x-1/2 rotate-0 text-center text-lg'
            : 'bottom-24 left-1/2 -translate-x-1/2 rotate-90 origin-center text-sm'
          }
        `}
        animate={{
          opacity: isActive ? 1 : 0.8,
          scale: isActive ? 1 : 0.9,
          writingMode: isActive ? 'horizontal-tb' : 'vertical-rl'
        }}
      >
        {item.title}
      </motion.span>

      {/* Description (visible when active) */}
      {isActive && (
        <motion.p
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-sm text-foreground/70 max-w-[300px] px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {item.description}
        </motion.p>
      )}

      {/* Decorative elements */}
      {isActive && (
        <>
          <motion.div
            className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br ${item.color} opacity-20`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className={`absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-br ${item.color} opacity-20`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </motion.div>
  );
};

// --- Main Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle item active

  const handleItemHover = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-background font-sans">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Side: Text Content */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Comprehensive Mental Health Support
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Find the right support for your mental wellness journey. From anxiety management to community connection, we're here to help you thrive.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="/support"
                className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Icon Accordion */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
