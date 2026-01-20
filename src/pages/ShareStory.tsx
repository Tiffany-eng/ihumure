import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
    Heart,
    MessageCircle,
    Shield,
    Users,
    PenTool,
    Sparkles,
    CheckCircle,
    AlertCircle,
    Eye,
    EyeOff,
    Upload,
    FileText
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const storyCategories = [
    { id: "recovery", name: "Recovery Journey", icon: Heart, color: "bg-rose-soft text-rose" },
    { id: "support", name: "Support Experience", icon: Users, color: "bg-blue-soft text-blue" },
    { id: "wellness", name: "Wellness Tips", icon: Sparkles, color: "bg-green-soft text-green" },
    { id: "overcoming", name: "Overcoming Challenges", icon: Shield, color: "bg-purple-soft text-purple" },
    { id: "community", name: "Community Impact", icon: MessageCircle, color: "bg-amber-soft text-amber" }
];

const anonymityLevels = [
    { id: "public", name: "Public", description: "Share with full attribution", icon: Eye },
    { id: "anonymous", name: "Anonymous", description: "Share without revealing identity", icon: EyeOff },
    { id: "private", name: "Private", description: "Share with team only", icon: Shield }
];

export default function ShareStory() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [anonymity, setAnonymity] = useState("anonymous");
    const [wordCount, setWordCount] = useState(0);

    const [formData, setFormData] = useState({
        title: "",
        story: "",
        displayName: user?.user_metadata?.display_name || "",
        email: "",
        ageRange: "",
        location: "",
        consent: false
    });

    useEffect(() => {
        setWordCount(formData.story.split(/\s+/).filter(word => word.length > 0).length);
    }, [formData.story]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.story.trim() || !selectedCategory) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        if (wordCount < 100) {
            toast({
                title: "Story Too Short",
                description: "Please share at least 100 words to help others understand your experience.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with actual implementation
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsSubmitted(true);
            toast({
                title: "Story Submitted Successfully!",
                description: "Thank you for sharing your story. It will help others on their journey.",
            });

            // Reset form
            setFormData({
                title: "",
                story: "",
                displayName: user?.user_metadata?.display_name || "",
                email: "",
                ageRange: "",
                location: "",
                consent: false
            });
            setSelectedCategory("");
            setAnonymity("anonymous");

        } catch (error) {
            toast({
                title: "Submission Error",
                description: "There was an error submitting your story. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <PageLayout>
                <section className="py-20 bg-hero-gradient">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                            >
                                <CheckCircle className="w-10 h-10 text-primary" />
                            </motion.div>

                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                Thank You for Sharing
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                Your story has been submitted successfully. Your courage to share will inspire and help others on their mental health journey.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                                    Share Another Story
                                </Button>
                                <Button asChild>
                                    <a href="/stories">Read Other Stories</a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="py-20 bg-hero-gradient relative overflow-hidden">
                {/* Floating background elements */}
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-10 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
                />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                        >
                            <PenTool className="w-8 h-8 text-primary" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Share Your Story
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Your experience can inspire hope and help others feel less alone. Share your mental health journey to support our community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Shield className="w-4 h-4" />
                                <span>Anonymous sharing available</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Heart className="w-4 h-4" />
                                <span>Support our community</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Story Form */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            {/* Story Category */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-2xl font-semibold text-foreground mb-4">
                                    Choose Your Story Category
                                </h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {storyCategories.map((category, index) => {
                                        const Icon = category.icon;
                                        return (
                                            <motion.button
                                                key={category.id}
                                                type="button"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + index * 0.1 }}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedCategory === category.id
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <h3 className="font-medium text-foreground">{category.name}</h3>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Story Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-semibold text-foreground">Tell Your Story</h2>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Story Title *
                                    </label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="Give your story a meaningful title"
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Your Story * (minimum 100 words)
                                    </label>
                                    <Textarea
                                        value={formData.story}
                                        onChange={(e) => handleInputChange("story", e.target.value)}
                                        placeholder="Share your experience, challenges, and journey. Be honest and authentic - your story matters."
                                        rows={8}
                                        maxLength={5000}
                                        required
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm text-muted-foreground">
                                            {wordCount} / 5000 words
                                        </span>
                                        {wordCount < 100 && wordCount > 0 && (
                                            <span className="text-sm text-destructive">
                                                Minimum 100 words required
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Anonymity Level */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-foreground mb-4">
                                    Choose Your Privacy Level
                                </h2>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    {anonymityLevels.map((level, index) => {
                                        const Icon = level.icon;
                                        return (
                                            <motion.button
                                                key={level.id}
                                                type="button"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                onClick={() => setAnonymity(level.id)}
                                                className={`p-4 rounded-xl border-2 transition-all ${anonymity === level.id
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <Icon className="w-6 h-6 text-primary mb-2" />
                                                <h3 className="font-medium text-foreground mb-1">{level.name}</h3>
                                                <p className="text-xs text-muted-foreground">{level.description}</p>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Personal Information */}
                            {anonymity !== "anonymous" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <h2 className="text-2xl font-semibold text-foreground">Personal Information</h2>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Display Name
                                            </label>
                                            <Input
                                                value={formData.displayName}
                                                onChange={(e) => handleInputChange("displayName", e.target.value)}
                                                placeholder="How you'd like to be known"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Age Range
                                            </label>
                                            <select
                                                value={formData.ageRange}
                                                onChange={(e) => handleInputChange("ageRange", e.target.value)}
                                                className="w-full p-2 border border-border rounded-lg bg-background"
                                            >
                                                <option value="">Select age range</option>
                                                <option value="18-24">18-24</option>
                                                <option value="25-34">25-34</option>
                                                <option value="35-44">35-44</option>
                                                <option value="45-54">45-54</option>
                                                <option value="55+">55+</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Location (Optional)
                                            </label>
                                            <Input
                                                value={formData.location}
                                                onChange={(e) => handleInputChange("location", e.target.value)}
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Consent */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.consent}
                                        onChange={(e) => handleInputChange("consent", e.target.checked)}
                                        className="mt-1"
                                        required
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        I consent to sharing my story with the Ihumure community. I understand that my story may help others and agree to the terms of service and privacy policy.
                                    </span>
                                </label>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex justify-center"
                            >
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting || !formData.consent}
                                    className="gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4" />
                                            Share My Story
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Your Story Matters
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Every story shared helps break down stigma and shows others they're not alone.
                            Your courage to share creates ripples of hope throughout our community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="outline" asChild>
                                <a href="/stories">Read Other Stories</a>
                            </Button>
                            <Button variant="outline" asChild>
                                <a href="/support">Get Support</a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
}
