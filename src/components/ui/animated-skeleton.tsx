import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "button" | "image";
}

export function AnimatedSkeleton({ className, variant = "text" }: AnimatedSkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] rounded-md";
  
  const variantClasses = {
    text: "h-4 w-full",
    card: "h-48 w-full rounded-xl",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-lg",
    image: "h-32 w-full rounded-lg"
  };

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={{
        backgroundPosition: ["200% 0", "-200% 0"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

interface EventCardSkeletonProps {
  className?: string;
}

export function EventCardSkeleton({ className }: EventCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-card rounded-2xl p-6 border border-border", className)}
    >
      <div className="flex justify-between items-start mb-4">
        <AnimatedSkeleton variant="button" className="w-20" />
        <AnimatedSkeleton variant="text" className="w-24 h-5" />
      </div>
      <AnimatedSkeleton variant="text" className="h-6 w-3/4 mb-2" />
      <AnimatedSkeleton variant="text" className="h-4 w-full mb-1" />
      <AnimatedSkeleton variant="text" className="h-4 w-2/3 mb-4" />
      <div className="flex items-center gap-4 mb-4">
        <AnimatedSkeleton variant="text" className="h-4 w-32" />
        <AnimatedSkeleton variant="text" className="h-4 w-24" />
      </div>
      <AnimatedSkeleton variant="button" className="w-full h-10" />
    </motion.div>
  );
}

interface DashboardSkeletonProps {
  className?: string;
}

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-4">
        <AnimatedSkeleton variant="avatar" className="h-16 w-16" />
        <div className="space-y-2 flex-1">
          <AnimatedSkeleton variant="text" className="h-8 w-48" />
          <AnimatedSkeleton variant="text" className="h-4 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-4 border border-border"
          >
            <AnimatedSkeleton variant="text" className="h-4 w-20 mb-2" />
            <AnimatedSkeleton variant="text" className="h-8 w-12" />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <AnimatedSkeleton variant="text" className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <AnimatedSkeleton key={j} variant="text" className="h-12 w-full" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ChatSkeletonProps {
  className?: string;
}

export function ChatSkeleton({ className }: ChatSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "flex gap-3",
            i % 2 === 0 ? "justify-start" : "justify-end"
          )}
        >
          {i % 2 === 0 && <AnimatedSkeleton variant="avatar" />}
          <div className={cn("space-y-1", i % 2 === 0 ? "items-start" : "items-end")}>
            <AnimatedSkeleton variant="text" className="h-3 w-20" />
            <AnimatedSkeleton 
              variant="text" 
              className={cn("h-16 rounded-2xl", i % 2 === 0 ? "w-64" : "w-48")} 
            />
          </div>
          {i % 2 !== 0 && <AnimatedSkeleton variant="avatar" />}
        </motion.div>
      ))}
    </div>
  );
}

interface ResourcesSkeletonProps {
  className?: string;
}

export function ResourcesSkeleton({ className }: ResourcesSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex gap-2 mb-6">
        {[...Array(3)].map((_, i) => (
          <AnimatedSkeleton key={i} variant="button" className="w-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl overflow-hidden border border-border"
          >
            <AnimatedSkeleton variant="image" className="h-40 rounded-none" />
            <div className="p-4 space-y-2">
              <AnimatedSkeleton variant="text" className="h-5 w-3/4" />
              <AnimatedSkeleton variant="text" className="h-4 w-full" />
              <AnimatedSkeleton variant="text" className="h-4 w-1/2" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface ConditionsSkeletonProps {
  className?: string;
}

export function ConditionsSkeleton({ className }: ConditionsSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center gap-4 mb-4">
            <AnimatedSkeleton variant="avatar" className="h-14 w-14" />
            <AnimatedSkeleton variant="text" className="h-6 w-32" />
          </div>
          <AnimatedSkeleton variant="text" className="h-4 w-full mb-1" />
          <AnimatedSkeleton variant="text" className="h-4 w-full mb-1" />
          <AnimatedSkeleton variant="text" className="h-4 w-2/3 mb-4" />
          <AnimatedSkeleton variant="button" className="w-full h-10" />
        </motion.div>
      ))}
    </div>
  );
}
