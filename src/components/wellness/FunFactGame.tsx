import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RefreshCw, CheckCircle, XCircle, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  fact: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const mentalHealthQuestions: Question[] = [
  {
    fact: "Exercise releases endorphins, which are natural mood boosters!",
    question: "What natural chemicals does exercise release that improve mood?",
    options: ["Melatonin", "Endorphins", "Insulin", "Adrenaline"],
    correctIndex: 1,
    explanation: "Endorphins are 'feel-good' chemicals that help reduce pain and boost happiness.",
  },
  {
    fact: "Getting 7-9 hours of sleep can significantly improve mental health.",
    question: "How many hours of sleep are recommended for optimal mental health?",
    options: ["4-5 hours", "5-6 hours", "7-9 hours", "10-12 hours"],
    correctIndex: 2,
    explanation: "Quality sleep helps regulate emotions and improves cognitive function.",
  },
  {
    fact: "Deep breathing can activate your body's relaxation response in just 60 seconds!",
    question: "How quickly can deep breathing activate your body's relaxation response?",
    options: ["10 minutes", "5 minutes", "2 minutes", "60 seconds"],
    correctIndex: 3,
    explanation: "Deep breathing stimulates the vagus nerve, triggering relaxation almost instantly.",
  },
  {
    fact: "Gratitude journaling for 2 weeks can increase happiness for up to 6 months!",
    question: "How long can the benefits of 2 weeks of gratitude journaling last?",
    options: ["1 week", "1 month", "3 months", "6 months"],
    correctIndex: 3,
    explanation: "Regular gratitude practice rewires the brain to focus on positive aspects of life.",
  },
  {
    fact: "Social connection is as important for health as exercise and diet!",
    question: "Social connection is as important for health as which of the following?",
    options: ["Money", "Fame", "Exercise and diet", "Material possessions"],
    correctIndex: 2,
    explanation: "Strong social bonds reduce stress, improve immune function, and increase longevity.",
  },
  {
    fact: "Laughing for 15 minutes burns approximately 40 calories!",
    question: "How many calories can laughing for 15 minutes burn?",
    options: ["10 calories", "25 calories", "40 calories", "100 calories"],
    correctIndex: 2,
    explanation: "Laughter also reduces stress hormones and boosts immune cells.",
  },
  {
    fact: "Nature exposure for just 20 minutes can lower stress hormone levels!",
    question: "How much time in nature is needed to lower stress hormones?",
    options: ["5 minutes", "20 minutes", "1 hour", "3 hours"],
    correctIndex: 1,
    explanation: "This effect is called 'forest bathing' and is used as therapy in many countries.",
  },
  {
    fact: "The brain continues to form new neural connections throughout life!",
    question: "Can the brain form new connections in adulthood?",
    options: ["No, only in childhood", "Only until age 25", "Yes, throughout life", "Only with medication"],
    correctIndex: 2,
    explanation: "This is called neuroplasticity - the brain's ability to reorganize and form new connections.",
  },
];

export function FunFactGame() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);

  const getNewQuestion = () => {
    const availableQuestions = mentalHealthQuestions.filter((_, i) => !usedQuestions.includes(i));
    
    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      const randomIndex = Math.floor(Math.random() * mentalHealthQuestions.length);
      setCurrentQuestion(mentalHealthQuestions[randomIndex]);
      setUsedQuestions([randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const originalIndex = mentalHealthQuestions.indexOf(availableQuestions[randomIndex]);
      setCurrentQuestion(availableQuestions[randomIndex]);
      setUsedQuestions(prev => [...prev, originalIndex]);
    }
    
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    getNewQuestion();
  }, []);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);
    
    if (index === currentQuestion?.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  if (!currentQuestion) return null;

  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-primary mb-2">
          <Brain className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Mental Health Fun Facts</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Learn interesting facts about mental wellness!
        </p>
        {questionsAnswered > 0 && (
          <div className="mt-2 inline-flex items-center gap-2 bg-primary-soft px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Score: {score}/{questionsAnswered}
            </span>
          </div>
        )}
      </div>

      {/* Fun Fact Display */}
      <motion.div
        key={currentQuestion.fact}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-soft to-accent p-4 rounded-xl mb-6"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Did you know?</p>
            <p className="text-foreground/80">{currentQuestion.fact}</p>
          </div>
        </div>
      </motion.div>

      {/* Question */}
      <div className="mb-4">
        <p className="font-medium text-foreground mb-4">{currentQuestion.question}</p>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (showResult) {
              if (index === currentQuestion.correctIndex) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += "border-red-400 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-border bg-muted/50 text-muted-foreground opacity-50";
              }
            } else {
              buttonClass += "border-border hover:border-primary hover:bg-primary-soft cursor-pointer";
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={buttonClass}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && index === currentQuestion.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Result & Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className={`p-4 rounded-xl ${isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Correct! Great job!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-amber-600" />
                    <span className="font-medium text-amber-800">Not quite, but you learned something new!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-foreground/80">{currentQuestion.explanation}</p>
            </div>

            <Button onClick={getNewQuestion} className="w-full gap-2">
              <RefreshCw className="w-4 h-4" />
              Next Fun Fact
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
