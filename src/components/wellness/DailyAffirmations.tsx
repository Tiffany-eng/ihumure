import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const affirmations = [
  "I am worthy of love and kindness.",
  "I choose to focus on what I can control.",
  "My feelings are valid, and I give myself permission to feel them.",
  "I am stronger than my challenges.",
  "Today, I choose peace over worry.",
  "I am enough, just as I am.",
  "I deserve rest and self-compassion.",
  "My journey is unique, and that is beautiful.",
  "I release what no longer serves me.",
  "I am capable of healing and growth.",
  "I trust the timing of my life.",
  "I am surrounded by love and support.",
  "My mind is calm, my heart is at peace.",
  "I embrace each day with hope and courage.",
  "I am resilient and can handle whatever comes my way.",
  "I give myself permission to take things one step at a time.",
  "I am deserving of happiness and joy.",
  "My worth is not defined by my productivity.",
  "I choose to be gentle with myself today.",
  "I am learning and growing every day.",
];

export function DailyAffirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(() => 
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );
  const [savedAffirmations, setSavedAffirmations] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewAffirmation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      let newAffirmation = currentAffirmation;
      while (newAffirmation === currentAffirmation) {
        newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      }
      setCurrentAffirmation(newAffirmation);
      setIsAnimating(false);
    }, 300);
  }, [currentAffirmation]);

  const saveAffirmation = useCallback(() => {
    if (!savedAffirmations.includes(currentAffirmation)) {
      setSavedAffirmations((prev) => [...prev, currentAffirmation]);
    }
  }, [currentAffirmation, savedAffirmations]);

  const isSaved = savedAffirmations.includes(currentAffirmation);

  return (
    <div className="flex flex-col items-center p-8 min-h-[400px]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wellness-affirmation-soft mb-4">
          <Sparkles className="w-8 h-8 text-wellness-affirmation" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Daily Affirmations
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Let these words of encouragement guide your day
        </p>
      </div>

      {/* Affirmation Card */}
      <motion.div
        className="relative w-full max-w-md mb-8"
        initial={false}
      >
        <div className="absolute inset-0 bg-wellness-affirmation/20 rounded-3xl blur-xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAffirmation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-wellness-affirmation-soft to-white border border-wellness-affirmation/20 shadow-lg"
          >
            <p className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed">
              "{currentAffirmation}"
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={getNewAffirmation}
          disabled={isAnimating}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isAnimating ? "animate-spin" : ""}`} />
          New Affirmation
        </Button>
        <Button
          variant={isSaved ? "secondary" : "default"}
          onClick={saveAffirmation}
          disabled={isSaved}
          className="gap-2"
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>

      {/* Saved Affirmations */}
      {savedAffirmations.length > 0 && (
        <div className="w-full max-w-md">
          <p className="text-sm text-muted-foreground mb-3 text-center">
            Saved affirmations ({savedAffirmations.length})
          </p>
          <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
            {savedAffirmations.map((affirmation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-4 py-2 rounded-lg bg-muted text-sm text-foreground"
              >
                {affirmation}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
