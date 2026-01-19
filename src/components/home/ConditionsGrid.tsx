import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  CloudRain,
  Flame,
  Heart,
  Repeat,
  Zap,
  Utensils,
  Wine,
  HeartCrack,
  Battery,
  Focus,
  ArrowRight,
} from "lucide-react";

const conditions = [
  { id: "anxiety", name: "Anxiety", icon: Zap, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  { id: "depression", name: "Depression", icon: CloudRain, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: "ptsd", name: "PTSD", icon: Flame, color: "text-red-500", bgColor: "bg-red-500/10" },
  { id: "bipolar", name: "Bipolar Disorder", icon: Repeat, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: "ocd", name: "OCD", icon: Brain, color: "text-teal-500", bgColor: "bg-teal-500/10" },
  { id: "stress", name: "Stress Disorders", icon: Heart, color: "text-rose-500", bgColor: "bg-rose-500/10" },
  { id: "eating", name: "Eating Disorders", icon: Utensils, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { id: "addiction", name: "Addiction", icon: Wine, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
  { id: "grief", name: "Grief & Trauma", icon: HeartCrack, color: "text-slate-500", bgColor: "bg-slate-500/10" },
  { id: "burnout", name: "Burnout", icon: Battery, color: "text-yellow-600", bgColor: "bg-yellow-600/10" },
  { id: "adhd", name: "ADHD", icon: Focus, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100 }
  },
};

export function ConditionsGrid() {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-primary/10"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full border border-accent/10"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4"
          >
            <Brain className="w-6 h-6" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understanding Mental Health
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore information about various mental health conditions, learn about symptoms, 
            and find the support you need. Each condition has a dedicated chatroom.
          </p>
        </motion.div>

        {/* Conditions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {conditions.map((condition, index) => {
            const Icon = condition.icon;
            return (
              <motion.div key={condition.id} variants={itemVariants}>
                <Link
                  to={`/conditions/${condition.id}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <motion.div 
                    className={`flex items-center justify-center w-14 h-14 rounded-xl ${condition.bgColor} group-hover:bg-primary-soft transition-colors`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -2, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                    >
                      <Icon className={`w-7 h-7 ${condition.color}`} />
                    </motion.div>
                  </motion.div>
                  <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">
                    {condition.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/conditions"
            className="inline-flex items-center gap-2 text-primary font-medium group"
          >
            <span className="group-hover:underline">View all conditions and resources</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
