import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wind, Sun, Sparkles, Music, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const activities = [
  {
    icon: Wind,
    name: "Breathe With Me",
    description: "Guided breathing exercises to calm your mind",
    color: "wellness-breathe",
    bgClass: "wellness-card-breathe",
  },
  {
    icon: Sun,
    name: "One Good Thing",
    description: "Capture and celebrate small positive moments",
    color: "wellness-gratitude",
    bgClass: "wellness-card-gratitude",
  },
  {
    icon: Sparkles,
    name: "Daily Affirmations",
    description: "Positive affirmations to start your day",
    color: "wellness-affirmation",
    bgClass: "wellness-card-affirmation",
  },
  {
    icon: Music,
    name: "Ambient Sounds",
    description: "Calming background music for relaxation",
    color: "wellness-audio",
    bgClass: "wellness-card-audio",
  },
];

// Animated breathing circle
const BreathingCircle = () => (
  <motion.div
    className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-primary/30"
    animate={{ 
      scale: [1, 1.3, 1],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />
);

export function WellnessPreview() {
  return (
    <section className="py-20 bg-calm-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-20 right-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
        />
        
        {/* Floating wellness icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-32 left-[10%] text-primary/20"
        >
          <Heart className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 right-[15%] text-accent/30"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Wellness Activities for
              <motion.span 
                className="block text-primary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Your Daily Self-Care
              </motion.span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Take a moment for yourself with our collection of calming activities 
              designed to support your mental wellness journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/wellness">
                <Button size="lg" className="gap-2">
                  Explore Activities
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Activities Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <Link
                    to="/wellness"
                    className={`block wellness-card ${activity.bgClass} relative overflow-hidden`}
                  >
                    {index === 0 && <BreathingCircle />}
                    <motion.div
                      animate={{ 
                        y: [0, -3, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <Icon className={`w-8 h-8 text-${activity.color} mb-3`} />
                    </motion.div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {activity.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
