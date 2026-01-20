import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  BookOpen,
  Video,
  ExternalLink,
  Play,
  Heart,
  Brain,
  Sparkles,
  Star,
  Smile,
  Moon,
  Zap,
  Target,
  Key,
  Users,
  Coffee,
  Sunrise,
  MessageCircle,
  Shield,
  Eye,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Animated icon component
const AnimatedIcon = ({ Icon, color, delay = 0 }: { Icon: React.ElementType; color: string; delay?: number }) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}
  >
    <Icon className="w-6 h-6" />
  </motion.div>
);

const podcasts = [
  {
    title: "The Happiness Lab",
    host: "Dr. Laurie Santos",
    description: "Yale professor explores the science of happiness and wellbeing.",
    Icon: Smile,
    color: "bg-yellow-100 text-yellow-600",
    link: "#",
  },
  {
    title: "On Purpose with Jay Shetty",
    host: "Jay Shetty",
    description: "Conversations about mental health, relationships, and personal growth.",
    Icon: Moon,
    color: "bg-purple-100 text-purple-600",
    link: "#",
  },
  {
    title: "The Mental Illness Happy Hour",
    host: "Paul Gilmartin",
    description: "Honest conversations about mental health struggles and recovery.",
    Icon: Heart,
    color: "bg-pink-100 text-pink-600",
    link: "#",
  },
  {
    title: "Therapy for Black Girls",
    host: "Dr. Joy Harden Bradford",
    description: "Mental health topics relevant to Black women and girls.",
    Icon: Sparkles,
    color: "bg-amber-100 text-amber-600",
    link: "#",
  },
  {
    title: "Ten Percent Happier",
    host: "Dan Harris",
    description: "Meditation and mindfulness for skeptics.",
    Icon: Brain,
    color: "bg-teal-100 text-teal-600",
    link: "#",
  },
  {
    title: "Unlocking Us",
    host: "Brené Brown",
    description: "Exploring the emotions and experiences that define us.",
    Icon: Key,
    color: "bg-indigo-100 text-indigo-600",
    link: "#",
  },
];

const blogs = [
  {
    title: "Understanding Anxiety",
    category: "Anxiety",
    excerpt: "Learn about the different types of anxiety disorders and coping strategies...",
    readTime: "5 min read",
    Icon: Brain,
  },
  {
    title: "The Power of Gratitude",
    category: "Wellness",
    excerpt: "How practicing gratitude can transform your mental health...",
    readTime: "4 min read",
    Icon: Heart,
  },
  {
    title: "Coping with Grief",
    category: "Grief",
    excerpt: "Understanding the stages of grief and finding healthy ways to cope...",
    readTime: "7 min read",
    Icon: Sparkles,
  },
  {
    title: "Building Resilience",
    category: "Growth",
    excerpt: "Practical steps to build mental resilience in challenging times...",
    readTime: "6 min read",
    Icon: Star,
  },
  {
    title: "Sleep and Mental Health",
    category: "Wellness",
    excerpt: "The critical connection between quality sleep and mental wellbeing...",
    readTime: "5 min read",
    Icon: Moon,
  },
  {
    title: "Breaking the Stigma",
    category: "Awareness",
    excerpt: "How to talk about mental health and support others...",
    readTime: "4 min read",
    Icon: Users,
  },
];

const videos = [
  {
    title: "How to Make Stress Your Friend",
    speaker: "Kelly McGonigal",
    source: "TED Talk",
    duration: "14:28",
    Icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "The Power of Vulnerability",
    speaker: "Brené Brown",
    source: "TED Talk",
    duration: "20:19",
    Icon: Target,
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    title: "What is Depression?",
    speaker: "Helen M. Farrell",
    source: "TED-Ed",
    duration: "4:28",
    Icon: BookOpen,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "How to Practice Emotional First Aid",
    speaker: "Guy Winch",
    source: "TED Talk",
    duration: "17:24",
    Icon: Heart,
    color: "from-rose-500/20 to-red-500/20",
  },
  {
    title: "The Gift of Living with Anxiety",
    speaker: "Jaymie Gerbi",
    source: "TEDx",
    duration: "11:43",
    Icon: Sparkles,
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    title: "How Mindfulness Can Help You",
    speaker: "Shauna Shapiro",
    source: "TEDx",
    duration: "16:35",
    Icon: Sunrise,
    color: "from-teal-500/20 to-emerald-500/20",
  },
];

const stories = [
  {
    title: "Finding Hope in Community",
    author: "Anonymous",
    category: "Recovery Journey",
    excerpt: "After years of struggling with anxiety, I found strength in sharing my story and connecting with others who understood...",
    readTime: "3 min read",
    date: "2 days ago",
    Icon: Heart,
    color: "bg-rose-soft text-rose",
    privacy: "anonymous"
  },
  {
    title: "The Day I Asked for Help",
    author: "Jean-Pierre",
    category: "Support Experience",
    excerpt: "Reaching out was the hardest and best decision I ever made. This is my journey from isolation to connection...",
    readTime: "5 min read",
    date: "1 week ago",
    Icon: Users,
    color: "bg-blue-soft text-blue",
    privacy: "public"
  },
  {
    title: "Small Steps, Big Changes",
    author: "Marie",
    category: "Wellness Tips",
    excerpt: "How tiny daily habits transformed my mental health. These simple practices made all the difference...",
    readTime: "4 min read",
    date: "2 weeks ago",
    Icon: Sparkles,
    color: "bg-green-soft text-green",
    privacy: "public"
  },
  {
    title: "Overcoming the Stigma",
    author: "Anonymous",
    category: "Overcoming Challenges",
    excerpt: "Growing up, mental health was never discussed. Here's how I broke free from cultural barriers and found healing...",
    readTime: "6 min read",
    date: "3 weeks ago",
    Icon: Shield,
    color: "bg-purple-soft text-purple",
    privacy: "anonymous"
  },
  {
    title: "Our Community Saved Me",
    author: "Emmanuel",
    category: "Community Impact",
    excerpt: "When I hit rock bottom, the Ihumure community became my lifeline. This is how peer support changed everything...",
    readTime: "4 min read",
    date: "1 month ago",
    Icon: MessageCircle,
    color: "bg-amber-soft text-amber",
    privacy: "public"
  },
  {
    title: "Learning to Love Myself Again",
    author: "Anonymous",
    category: "Recovery Journey",
    excerpt: "Depression made me forget who I was. This is the story of rediscovering self-worth and finding joy again...",
    readTime: "7 min read",
    date: "1 month ago",
    Icon: Star,
    color: "bg-pink-soft text-pink",
    privacy: "anonymous"
  },
];

export default function Resources() {
  return (
    <PageLayout>
      <section className="py-20 bg-hero-gradient min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <BookOpen className="w-8 h-8" />
              </motion.div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mental Health Resources
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore curated podcasts, articles, videos, and personal stories to support your mental wellness journey.
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="podcasts" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="podcasts" className="gap-2">
                <Headphones className="w-4 h-4" />
                Podcasts
              </TabsTrigger>
              <TabsTrigger value="blogs" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="stories" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Stories
              </TabsTrigger>
            </TabsList>

            {/* Podcasts */}
            <TabsContent value="podcasts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {podcasts.map((podcast, index) => {
                  const Icon = podcast.Icon;
                  return (
                    <motion.div
                      key={podcast.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-card rounded-2xl shadow-card p-6 hover:shadow-hover transition-all"
                    >
                      <AnimatedIcon Icon={Icon} color={podcast.color} delay={index * 0.2} />
                      <h3 className="font-semibold text-foreground mt-4 mb-1">{podcast.title}</h3>
                      <p className="text-sm text-primary mb-2">{podcast.host}</p>
                      <p className="text-sm text-muted-foreground mb-4">{podcast.description}</p>
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <Headphones className="w-4 h-4" />
                        Listen Now
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Blogs */}
            <TabsContent value="blogs">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => {
                  const Icon = blog.Icon;
                  return (
                    <motion.div
                      key={blog.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-card rounded-2xl shadow-card p-6 hover:shadow-hover transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <Icon className="w-5 h-5 text-primary" />
                        </motion.div>
                        <span className="text-xs font-medium text-primary bg-primary-soft px-2 py-1 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{blog.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                        <Button variant="link" size="sm" className="gap-1 p-0">
                          Read More
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => {
                  const Icon = video.Icon;
                  return (
                    <motion.div
                      key={video.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-card rounded-2xl shadow-card overflow-hidden hover:shadow-hover transition-all"
                    >
                      <div className={`h-32 bg-gradient-to-br ${video.color} flex items-center justify-center relative`}>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <Icon className="w-12 h-12 text-foreground/60" />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                          whileHover={{ scale: 1 }}
                        >
                          <motion.div
                            className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-6 h-6 text-primary ml-1" />
                          </motion.div>
                        </motion.div>
                        <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-primary mb-1">{video.source}</p>
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.speaker}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Stories */}
            <TabsContent value="stories">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, index) => {
                  const Icon = story.Icon;
                  return (
                    <motion.div
                      key={story.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-card rounded-2xl shadow-card p-6 hover:shadow-hover transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                          >
                            <Icon className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <span className="text-xs font-medium text-primary bg-primary-soft px-2 py-1 rounded-full">
                              {story.category}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              {story.privacy === "anonymous" ? (
                                <Shield className="w-3 h-3 text-muted-foreground" />
                              ) : (
                                <Eye className="w-3 h-3 text-muted-foreground" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {story.privacy === "anonymous" ? "Anonymous" : "Public"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold text-foreground mb-2">{story.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{story.excerpt}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-foreground">
                            {story.author}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{story.date}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{story.readTime}</span>
                        <Button variant="link" size="sm" className="gap-1 p-0">
                          Read Story
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Share Your Story CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center p-6 rounded-2xl bg-primary/5 border border-primary/20"
              >
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Have a Story to Share?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your experience can inspire hope and help others feel less alone.
                </p>
                <Link to="/share-story">
                  <Button className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Share Your Story
                  </Button>
                </Link>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 p-8 rounded-2xl bg-card shadow-card max-w-2xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Want personalized recommendations?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our AI Assistant can suggest resources based on your specific needs and interests.
            </p>
            <Link to="/ai-assistant">
              <Button className="gap-2">
                Talk to AI Assistant
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
