import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Bot, Shield, Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/20"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated icon that pulses
const PulsingIcon = ({ Icon, className }: { Icon: React.ElementType; className?: string }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    <Icon className="w-full h-full" />
  </motion.div>
);

// Orbiting element
const OrbitingElement = ({ children, radius, duration, delay = 0 }: { children: React.ReactNode; radius: number; duration: number; delay?: number }) => (
  <motion.div
    className="absolute"
    style={{ width: radius * 2, height: radius * 2 }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2">
      {children}
    </div>
  </motion.div>
);

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} duration={6} x="10%" y="20%" size={8} />
        <FloatingParticle delay={1} duration={8} x="20%" y="60%" size={12} />
        <FloatingParticle delay={2} duration={7} x="80%" y="30%" size={10} />
        <FloatingParticle delay={0.5} duration={9} x="70%" y="70%" size={6} />
        <FloatingParticle delay={1.5} duration={6} x="40%" y="15%" size={14} />
        <FloatingParticle delay={3} duration={8} x="90%" y="50%" size={8} />
        <FloatingParticle delay={2.5} duration={7} x="5%" y="80%" size={10} />
        <FloatingParticle delay={4} duration={6} x="60%" y="85%" size={12} />
        
        {/* Morphing gradient blobs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0], 
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0], 
            x: [0, -20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/30 blur-3xl"
        />
        
        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[15%] text-primary/30"
        >
          <Heart className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-[12%] text-accent/40"
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[8%] text-secondary/50"
        >
          <Users className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-soft text-primary text-sm font-medium mb-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4" />
            </motion.div>
            <span>A Safe Space for Mental Wellness in Rwanda</span>
          </motion.div>

          {/* Main Heading with staggered animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              You Are Not Alone on
            </motion.span>
            <motion.span 
              className="block text-gradient-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Your Healing Journey
            </motion.span>
          </motion.h1>

          {/* Subtitle with fade-up */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Connect with a supportive community, access mental health resources, 
            and discover wellness tools designed to help you thrive.
          </motion.p>

          {/* CTA Buttons with stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/conditions">
                <Button size="lg" className="shadow-soft gap-2 w-full sm:w-auto">
                  <motion.div
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="w-5 h-5" />
                  </motion.div>
                  Get Support
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/chatrooms">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.div>
                  Join a Chatroom
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/ai-assistant">
                <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Bot className="w-5 h-5" />
                  </motion.div>
                  AI Assistant
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators with hover animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Shield, title: "100% Anonymous", subtitle: "Safe & Private", color: "bg-primary-soft", iconColor: "text-primary" },
              { icon: Users, title: "Peer Support", subtitle: "Community Care", color: "bg-secondary", iconColor: "text-secondary-foreground" },
              { icon: Sparkles, title: "Free Resources", subtitle: "Always Available", color: "bg-accent", iconColor: "text-accent-foreground" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-card shadow-card cursor-default"
              >
                <motion.div 
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.color}`}
                  whileHover={{ rotate: 10 }}
                >
                  <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                </motion.div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
