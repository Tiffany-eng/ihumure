import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, MessageSquare, Heart, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Community Members",
    description: "People finding support together",
  },
  {
    icon: MessageSquare,
    value: 50000,
    suffix: "+",
    label: "Messages Shared",
    description: "Conversations of hope and healing",
  },
  {
    icon: Heart,
    value: 11,
    suffix: "",
    label: "Support Chatrooms",
    description: "Dedicated spaces for each condition",
  },
  {
    icon: Clock,
    value: 24,
    suffix: "/7",
    label: "Always Available",
    description: "Support whenever you need it",
  },
];

// Animated counter component
function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-20 w-40 h-40 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary-foreground/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            A Growing Community of Support
          </motion.h2>
          <motion.p 
            className="text-primary-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of Rwandans who are taking steps toward better mental health
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-foreground/10 mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-primary-foreground/70">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
