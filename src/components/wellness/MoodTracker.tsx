import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MoodEntry {
  id: string;
  level: number;
  label: string;
  notes: string;
  timestamp: Date;
}

const moodLevels = [
  { level: 1, label: "Very Low", emoji: "Struggling", color: "bg-red-400" },
  { level: 2, label: "Low", emoji: "Difficult", color: "bg-red-300" },
  { level: 3, label: "Below Average", emoji: "Challenging", color: "bg-orange-400" },
  { level: 4, label: "Slightly Low", emoji: "Uneasy", color: "bg-orange-300" },
  { level: 5, label: "Neutral", emoji: "Okay", color: "bg-yellow-400" },
  { level: 6, label: "Slightly Good", emoji: "Decent", color: "bg-lime-400" },
  { level: 7, label: "Good", emoji: "Pleasant", color: "bg-green-400" },
  { level: 8, label: "Very Good", emoji: "Happy", color: "bg-emerald-400" },
  { level: 9, label: "Great", emoji: "Joyful", color: "bg-teal-400" },
  { level: 10, label: "Excellent", emoji: "Wonderful", color: "bg-cyan-400" },
];

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const logMood = useCallback(() => {
    if (selectedMood === null) return;

    const moodInfo = moodLevels[selectedMood - 1];
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      level: selectedMood,
      label: moodInfo.label,
      notes: notes.trim(),
      timestamp: new Date(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setSelectedMood(null);
    setNotes("");
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 2000);
  }, [selectedMood, notes]);

  return (
    <div className="flex flex-col items-center p-8 min-h-[400px]">
      {/* Success message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg"
          >
            Mood logged successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-wellness-mood-soft mb-4">
          <TrendingUp className="w-8 h-8 text-wellness-mood" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Mood Tracker
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Track how you're feeling to understand your patterns over time
        </p>
      </div>

      {/* Mood Selection */}
      <div className="w-full max-w-md mb-6">
        <p className="text-sm font-medium text-foreground mb-3 text-center">
          How are you feeling right now?
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {moodLevels.map((mood) => (
            <motion.button
              key={mood.level}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.level)}
              className={`w-10 h-10 rounded-full ${mood.color} flex items-center justify-center text-white font-bold text-sm transition-all ${
                selectedMood === mood.level
                  ? "ring-4 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
              title={mood.label}
            >
              {mood.level}
            </motion.button>
          ))}
        </div>
        {selectedMood && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-3 text-foreground font-medium"
          >
            {moodLevels[selectedMood - 1].label} - {moodLevels[selectedMood - 1].emoji}
          </motion.p>
        )}
      </div>

      {/* Notes */}
      <div className="w-full max-w-md mb-6">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add some notes about how you're feeling... (optional)"
          className="resize-none"
          rows={3}
          maxLength={500}
        />
      </div>

      {/* Log Button */}
      <Button
        onClick={logMood}
        disabled={selectedMood === null}
        className="gap-2 mb-8"
      >
        <Plus className="w-4 h-4" />
        Log My Mood
      </Button>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="w-full max-w-md">
          <p className="text-sm text-muted-foreground mb-3">
            Recent mood entries
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {entries.slice(0, 5).map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted"
              >
                <div className={`w-8 h-8 rounded-full ${moodLevels[entry.level - 1].color} flex items-center justify-center text-white text-xs font-bold`}>
                  {entry.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{entry.label}</p>
                  {entry.notes && (
                    <p className="text-xs text-muted-foreground truncate">{entry.notes}</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
