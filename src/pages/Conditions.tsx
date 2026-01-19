import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ConditionModal } from "@/components/conditions/ConditionModal";
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
  MessageCircle,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const conditions = [
  {
    id: "anxiety",
    name: "Anxiety",
    icon: Zap,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    description: "Persistent worry, fear, and physical symptoms like rapid heartbeat.",
  },
  {
    id: "depression",
    name: "Depression",
    icon: CloudRain,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Persistent sadness, loss of interest, and feelings of hopelessness.",
  },
  {
    id: "ptsd",
    name: "PTSD",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Trauma-related flashbacks, nightmares, and severe anxiety.",
  },
  {
    id: "bipolar",
    name: "Bipolar Disorder",
    icon: Repeat,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Extreme mood swings between emotional highs and lows.",
  },
  {
    id: "ocd",
    name: "OCD",
    icon: Brain,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    description: "Unwanted repetitive thoughts and compulsive behaviors.",
  },
  {
    id: "stress",
    name: "Stress Disorders",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    description: "Overwhelming stress affecting physical and mental health.",
  },
  {
    id: "eating",
    name: "Eating Disorders",
    icon: Utensils,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Unhealthy eating patterns affecting physical and mental wellbeing.",
  },
  {
    id: "addiction",
    name: "Addiction",
    icon: Wine,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    description: "Compulsive substance use or behaviors despite harmful consequences.",
  },
  {
    id: "grief",
    name: "Grief & Trauma",
    icon: HeartCrack,
    color: "text-slate-500",
    bgColor: "bg-slate-50",
    description: "Processing loss and traumatic experiences.",
  },
  {
    id: "burnout",
    name: "Burnout",
    icon: Battery,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Physical and emotional exhaustion from prolonged stress.",
  },
  {
    id: "adhd",
    name: "ADHD",
    icon: Focus,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    description: "Difficulty with attention, hyperactivity, and impulsivity.",
  },
];

export default function Conditions() {
  const [selectedCondition, setSelectedCondition] = useState<{ id: string; name: string } | null>(null);

  return (
    <PageLayout>
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mental Health Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Understanding is the first step toward healing. Learn about various 
              mental health conditions and connect with others who share similar experiences.
            </p>
            <p className="text-sm text-muted-foreground italic max-w-xl mx-auto">
              Note: This information is for educational purposes only and is not a substitute 
              for professional medical advice or diagnosis.
            </p>
          </motion.div>

          {/* Conditions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {conditions.map((condition, index) => {
              const Icon = condition.icon;
              return (
                <motion.div
                  key={condition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className={`h-full p-6 rounded-2xl ${condition.bgColor} border border-transparent hover:border-border transition-all duration-300 hover:shadow-hover hover:-translate-y-1`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm">
                        <Icon className={`w-6 h-6 ${condition.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {condition.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {condition.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <Link to={`/chatroom/${condition.id}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Join Chatroom
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => setSelectedCondition({ id: condition.id, name: condition.name })}
                      >
                        <BookOpen className="w-4 h-4" />
                        Learn More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">
              Not sure where to start? Our AI Assistant can help guide you.
            </p>
            <Link to="/ai-assistant">
              <Button size="lg" className="gap-2">
                Talk to AI Assistant
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Condition Modal */}
      <ConditionModal
        conditionId={selectedCondition?.id || null}
        conditionName={selectedCondition?.name || ""}
        isOpen={!!selectedCondition}
        onClose={() => setSelectedCondition(null)}
      />
    </PageLayout>
  );
}
