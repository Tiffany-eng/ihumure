import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreatheWithMeProps {
  onClose?: () => void;
}

export function BreatheWithMe({ onClose }: BreatheWithMeProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 4,
  };

  const phaseMessages = {
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out",
  };

  const resetExercise = useCallback(() => {
    setIsActive(false);
    setPhase("inhale");
    setSecondsLeft(phaseDurations.inhale);
    setTotalCycles(0);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          if (phase === "inhale") {
            setPhase("hold");
            return phaseDurations.hold;
          } else if (phase === "hold") {
            setPhase("exhale");
            return phaseDurations.exhale;
          } else {
            setPhase("inhale");
            setTotalCycles((c) => c + 1);
            return phaseDurations.inhale;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getCircleScale = () => {
    if (!isActive) return 1;
    if (phase === "inhale") return 1.3;
    if (phase === "hold") return 1.3;
    return 1;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* Breathing Circle */}
      <div className="relative mb-8">
        {/* Outer glow */}
        <motion.div
          animate={{
            scale: getCircleScale(),
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.3,
          }}
          transition={{
            scale: { duration: phaseDurations[phase], ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity },
          }}
          className="absolute inset-0 w-48 h-48 rounded-full bg-wellness-breathe/30 blur-xl"
        />
        
        {/* Main circle */}
        <motion.div
          animate={{ scale: getCircleScale() }}
          transition={{ duration: phaseDurations[phase], ease: "easeInOut" }}
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-wellness-breathe to-wellness-breathe/70 shadow-lg flex items-center justify-center"
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white"
              >
                <div className="text-2xl font-semibold mb-1">
                  {isActive ? phaseMessages[phase] : "Ready?"}
                </div>
                {isActive && (
                  <div className="text-4xl font-bold">{secondsLeft}</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Cycle counter */}
      {totalCycles > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mb-6"
        >
          Completed cycles: {totalCycles}
        </motion.p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          size="lg"
          onClick={() => setIsActive(!isActive)}
          className="gap-2"
        >
          {isActive ? (
            <>
              <Pause className="w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {totalCycles > 0 ? "Resume" : "Start"}
            </>
          )}
        </Button>
        
        {(isActive || totalCycles > 0) && (
          <Button size="lg" variant="outline" onClick={resetExercise}>
            <RotateCcw className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Instructions */}
      <p className="text-sm text-muted-foreground text-center mt-8 max-w-sm">
        Follow the circle as it expands and contracts. 
        Breathe in as it grows, hold, then breathe out as it shrinks.
      </p>
    </div>
  );
}
