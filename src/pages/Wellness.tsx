import { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Sun, Sparkles, Music, TrendingUp, ArrowLeft, Brain } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { BreatheWithMe } from "@/components/wellness/BreatheWithMe";
import { OneGoodThing } from "@/components/wellness/OneGoodThing";
import { DailyAffirmations } from "@/components/wellness/DailyAffirmations";
import { AmbientAudio } from "@/components/wellness/AmbientAudio";
import { MoodTracker } from "@/components/wellness/MoodTracker";
import { FunFactGame } from "@/components/wellness/FunFactGame";

const activities = [
  {
    id: "breathe",
    name: "Breathe With Me",
    description: "Guided breathing exercises to calm your mind and body",
    icon: Wind,
    bgClass: "wellness-card-breathe",
    component: BreatheWithMe,
  },
  {
    id: "gratitude",
    name: "One Good Thing",
    description: "Capture and celebrate small positive moments in your day",
    icon: Sun,
    bgClass: "wellness-card-gratitude",
    component: OneGoodThing,
  },
  {
    id: "affirmations",
    name: "Daily Affirmations",
    description: "Positive affirmations to nurture your mindset",
    icon: Sparkles,
    bgClass: "wellness-card-affirmation",
    component: DailyAffirmations,
  },
  {
    id: "audio",
    name: "Ambient Sounds",
    description: "Calming background music for relaxation and focus",
    icon: Music,
    bgClass: "wellness-card-audio",
    component: AmbientAudio,
  },
  {
    id: "mood",
    name: "Mood Tracker",
    description: "Track your emotional patterns over time",
    icon: TrendingUp,
    bgClass: "wellness-card-mood",
    component: MoodTracker,
  },
  {
    id: "funfacts",
    name: "Fun Fact Quiz",
    description: "Learn interesting facts about mental wellness",
    icon: Brain,
    bgClass: "wellness-card-breathe",
    component: FunFactGame,
  },
];

export default function Wellness() {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const activeActivityData = activities.find((a) => a.id === activeActivity);
  const ActiveComponent = activeActivityData?.component;

  return (
    <PageLayout>
      <section className="py-20 bg-calm-gradient min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Wellness Activities
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a moment for yourself. These calming activities are designed 
              to support your mental wellness journey, one breath at a time.
            </p>
          </motion.div>

          {/* Activity View or Grid */}
          {activeActivity && ActiveComponent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={() => setActiveActivity(null)}
                className="mb-6 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to activities
              </Button>

              {/* Activity Container */}
              <div className={`rounded-3xl shadow-soft ${activeActivityData.bgClass}`}>
                <ActiveComponent />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => setActiveActivity(activity.id)}
                      className={`w-full text-left wellness-card ${activity.bgClass} group`}
                    >
                      <Icon className="w-10 h-10 text-foreground/70 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {activity.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {activity.description}
                      </p>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
