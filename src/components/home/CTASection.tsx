import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-[20%] w-20 h-20 rounded-full bg-primary/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-[25%] w-32 h-32 rounded-full bg-accent/20 blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-warm-gradient shadow-soft overflow-hidden"
        >
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          {/* Floating sparkles */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-20 text-primary/30"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-16 left-16 text-accent/40"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <div className="relative z-10">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6 shadow-soft"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-8 h-8" />
              </motion.div>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to Take the First Step?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Whether you're seeking support, looking to connect with others, or just 
              curious about mental wellness, we're here for you. Your journey to 
              healing starts with a single step.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/chatrooms">
                  <Button size="lg" className="gap-2 shadow-soft">
                    Join a Chatroom
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Learn More About Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
