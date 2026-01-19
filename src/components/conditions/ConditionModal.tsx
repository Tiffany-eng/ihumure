import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, BookOpen, ExternalLink, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConditionInfo {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  copingStrategies: string[];
  whenToSeekHelp: string[];
  resources: { title: string; url: string }[];
}

const conditionDetails: Record<string, ConditionInfo> = {
  anxiety: {
    id: "anxiety",
    name: "Anxiety",
    description: "Anxiety is a natural stress response, but when it becomes overwhelming or persistent, it can interfere with daily life. It's one of the most common mental health conditions and is highly treatable.",
    symptoms: [
      "Persistent worry or fear",
      "Restlessness or feeling on edge",
      "Rapid heartbeat or palpitations",
      "Difficulty concentrating",
      "Sleep disturbances",
      "Muscle tension",
      "Avoidance of triggering situations",
    ],
    copingStrategies: [
      "Practice deep breathing exercises",
      "Regular physical exercise",
      "Limit caffeine and alcohol",
      "Practice mindfulness meditation",
      "Maintain a regular sleep schedule",
      "Challenge negative thought patterns",
    ],
    whenToSeekHelp: [
      "Anxiety interferes with work, relationships, or daily activities",
      "You experience panic attacks",
      "You avoid situations due to fear",
      "Physical symptoms persist",
    ],
    resources: [
      { title: "Anxiety and Depression Association", url: "#" },
      { title: "NIMH Anxiety Overview", url: "#" },
    ],
  },
  depression: {
    id: "depression",
    name: "Depression",
    description: "Depression is more than feeling sad. It's a persistent condition that affects how you feel, think, and handle daily activities. With proper treatment, most people with depression can get better.",
    symptoms: [
      "Persistent sad or empty mood",
      "Loss of interest in activities",
      "Changes in appetite or weight",
      "Sleep problems",
      "Fatigue or low energy",
      "Feelings of worthlessness or guilt",
      "Difficulty concentrating",
      "Thoughts of death or suicide",
    ],
    copingStrategies: [
      "Stay connected with loved ones",
      "Engage in physical activity",
      "Set small, achievable goals",
      "Maintain regular routines",
      "Practice self-compassion",
      "Limit alcohol and avoid drugs",
    ],
    whenToSeekHelp: [
      "Symptoms last more than two weeks",
      "You have thoughts of self-harm",
      "Depression affects work or relationships",
      "You're using substances to cope",
    ],
    resources: [
      { title: "NIMH Depression Information", url: "#" },
      { title: "Depression and Bipolar Support Alliance", url: "#" },
    ],
  },
  ptsd: {
    id: "ptsd",
    name: "PTSD (Post-Traumatic Stress Disorder)",
    description: "PTSD can develop after experiencing or witnessing a traumatic event. It's a normal response to abnormal situations, and effective treatments are available to help you recover.",
    symptoms: [
      "Intrusive memories or flashbacks",
      "Nightmares about the trauma",
      "Severe emotional distress",
      "Avoidance of reminders",
      "Negative changes in mood",
      "Being easily startled",
      "Difficulty sleeping",
    ],
    copingStrategies: [
      "Learn about trauma and PTSD",
      "Practice grounding techniques",
      "Build a support network",
      "Engage in self-care activities",
      "Consider trauma-focused therapy",
      "Be patient with your recovery",
    ],
    whenToSeekHelp: [
      "Symptoms persist for more than a month",
      "Flashbacks or nightmares are frequent",
      "You're avoiding important parts of life",
      "You're using substances to cope",
    ],
    resources: [
      { title: "PTSD Foundation", url: "#" },
      { title: "National Center for PTSD", url: "#" },
    ],
  },
  bipolar: {
    id: "bipolar",
    name: "Bipolar Disorder",
    description: "Bipolar disorder involves unusual shifts in mood, energy, and activity levels. With proper treatment, people with bipolar disorder can lead full and productive lives.",
    symptoms: [
      "Episodes of elevated mood (mania)",
      "Episodes of depression",
      "Changes in energy levels",
      "Changes in sleep patterns",
      "Racing thoughts during mania",
      "Impulsive behavior",
      "Difficulty concentrating",
    ],
    copingStrategies: [
      "Maintain a regular sleep schedule",
      "Track your moods daily",
      "Stick to treatment plans",
      "Avoid drugs and alcohol",
      "Build a strong support system",
      "Learn your warning signs",
    ],
    whenToSeekHelp: [
      "You experience extreme mood swings",
      "Sleep patterns are severely disrupted",
      "You engage in risky behavior",
      "You have thoughts of suicide",
    ],
    resources: [
      { title: "International Bipolar Foundation", url: "#" },
      { title: "DBSA Resources", url: "#" },
    ],
  },
};

// Default info for conditions not yet detailed
const defaultConditionInfo = (name: string): ConditionInfo => ({
  id: name.toLowerCase(),
  name: name,
  description: `${name} is a mental health condition that affects many people. Understanding and proper support can help manage symptoms effectively.`,
  symptoms: [
    "Varies by individual",
    "May affect daily functioning",
    "Can impact relationships",
    "May cause emotional distress",
  ],
  copingStrategies: [
    "Practice self-care",
    "Connect with others",
    "Seek professional support",
    "Learn about your condition",
    "Build healthy routines",
  ],
  whenToSeekHelp: [
    "Symptoms interfere with daily life",
    "You feel overwhelmed",
    "Support from friends isn't enough",
    "You want professional guidance",
  ],
  resources: [
    { title: "Mental Health Resources", url: "#" },
  ],
});

interface ConditionModalProps {
  conditionId: string | null;
  conditionName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ConditionModal({ conditionId, conditionName, isOpen, onClose }: ConditionModalProps) {
  const info = conditionId && conditionDetails[conditionId] 
    ? conditionDetails[conditionId] 
    : defaultConditionInfo(conditionName);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary" />
            {info.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Description */}
          <div>
            <p className="text-muted-foreground">{info.description}</p>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Common Symptoms</h3>
            <ul className="space-y-2">
              {info.symptoms.map((symptom, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-1">•</span>
                  {symptom}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coping Strategies */}
          <div className="p-4 rounded-xl bg-primary-soft">
            <h3 className="font-semibold text-foreground mb-3">Coping Strategies</h3>
            <ul className="space-y-2">
              {info.copingStrategies.map((strategy, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary">✓</span>
                  {strategy}
                </li>
              ))}
            </ul>
          </div>

          {/* When to Seek Help */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-3">When to Seek Professional Help</h3>
            <ul className="space-y-2">
              {info.whenToSeekHelp.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-amber-700">
                  <span>⚠️</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link to={`/chatroom/${info.id}`} className="flex-1">
              <Button className="w-full gap-2">
                <MessageCircle className="w-4 h-4" />
                Join Support Chatroom
              </Button>
            </Link>
            <Link to="/resources" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <BookOpen className="w-4 h-4" />
                View Resources
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center italic pt-4 border-t">
            This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
