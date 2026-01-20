import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Heart, Target, Eye, Users, Shield, Award, Sparkles, Calendar, MapPin, Globe, Lightbulb, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach mental health with empathy, understanding that everyone's journey is unique.",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "We prioritize creating safe, anonymous spaces where people can share without judgment.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of peer support and shared experiences in healing.",
  },
  {
    icon: Award,
    title: "Accessibility",
    description: "Mental health resources should be available to everyone, regardless of circumstances.",
  },
];

const team = [
  {
    name: "Emma Tiffany Umwari",
    role: "Founder & Technology Lead",
    initial: "E",
    bio: "Tech enthusiast passionate about using technology to improve mental health accessibility. Leading the development of our platform with innovative solutions.",
    expertise: ["Full-Stack Development", "UI/UX Design", "Mental Health Technology"],
    journey: "Started Ihumure after witnessing the need for accessible mental health resources in Rwanda, combining technical expertise with a passion for community wellbeing."
  },
  {
    name: "Tylane Keza",
    role: "Co-Founder & Outreach Lead",
    initial: "T",
    bio: "Community-driven entrepreneur focused on partnerships, awareness, and connecting people to accessible mental health support. Building bridges between communities and mental health resources.",
    expertise: ["Community Building", "Partnership Development", "Public Health Outreach"],
    journey: "Dedicated to breaking mental health stigma through education and creating safe spaces for open conversations about mental wellbeing."
  }
]

const journey = [
  {
    year: "2023",
    title: "The Beginning",
    description: "Ihumure was born from a simple observation: too many Rwandans lack access to quality mental health support. We started with a vision to create safe, anonymous spaces.",
    icon: Sparkles,
    milestone: true
  },
  {
    year: "2024",
    title: "Building Community",
    description: "Launched our first chatrooms and wellness resources. Over 1,000 users joined our platform seeking support and connection.",
    icon: Users,
    milestone: true
  },
  {
    year: "2024",
    title: "Expanding Access",
    description: "Introduced AI-powered wellness tools and partnered with local mental health professionals. Our community grew to over 5,000 active users.",
    icon: Heart,
    milestone: true
  },
  {
    year: "2025",
    title: "The Future",
    description: "Expanding to reach every corner of Rwanda with mobile access, professional counseling partnerships, and comprehensive mental health resources.",
    icon: Target,
    milestone: false
  }
]

export default function About() {
  // Floating animation for hero section
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        {/* Floating background elements */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              About Ihumure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Ihumure means "comfort" in Kinyarwanda. We are on a mission to make
              mental health support accessible, stigma-free, and community-driven for all Rwandans.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/chatrooms">
                <Button size="lg" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Join Community
                </Button>
              </Link>
              <Link to="/wellness">
                <Button size="lg" variant="outline" className="gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Explore Resources
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-primary-soft"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                To provide a safe, anonymous platform where Rwandans can access mental
                health information, connect with peer support communities, and find
                resources to support their wellbeing journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-secondary"
            >
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-secondary-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground">
                A Rwanda where mental health is prioritized, stigma is eliminated,
                and everyone has access to the support they need to thrive mentally
                and emotionally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Hope to Achieve */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-4"
          >
            What We Hope to Achieve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Our aspirations extend beyond today's impact. We're working towards transformative change in mental health accessibility and support across Rwanda.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "National Coverage",
                description: "Reach every corner of Rwanda with accessible mental health resources, from urban centers to rural communities.",
                timeline: "By 2026",
                color: "bg-blue-soft text-blue"
              },
              {
                icon: Users,
                title: "Community Leadership",
                description: "Train and empower local mental health advocates to create sustainable peer support networks in every community.",
                timeline: "By 2025",
                color: "bg-green-soft text-green"
              },
              {
                icon: Heart,
                title: "Zero Stigma",
                description: "Eliminate mental health stigma through education, awareness campaigns, and open community conversations.",
                timeline: "Ongoing",
                color: "bg-purple-soft text-purple"
              },
              {
                icon: Shield,
                title: "Professional Integration",
                description: "Partner with healthcare providers to create integrated mental health care pathways from peer support to professional treatment.",
                timeline: "By 2027",
                color: "bg-amber-soft text-amber"
              },
              {
                icon: Lightbulb,
                title: "Innovation Hub",
                description: "Develop and launch innovative digital tools including AI-powered wellness features and mobile accessibility solutions.",
                timeline: "By 2025",
                color: "bg-pink-soft text-pink"
              },
              {
                icon: Target,
                title: "Policy Impact",
                description: "Influence national mental health policy to ensure mental health is prioritized in healthcare systems and education.",
                timeline: "By 2028",
                color: "bg-teal-soft text-teal"
              }
            ].map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className={`w-14 h-14 rounded-xl ${goal.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-lg font-semibold text-foreground mb-2"
                  >
                    {goal.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className="text-sm text-muted-foreground mb-4"
                  >
                    {goal.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                    className="flex items-center gap-2 text-xs font-medium"
                  >
                    <Calendar className="w-3 h-3" />
                    <span className="text-primary">{goal.timeline}</span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Together, we're building a mentally healthy Rwanda</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card shadow-card text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-soft mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            From a simple idea to a growing community, every step has been driven by our commitment to making mental health support accessible to all Rwandans.
          </motion.p>

          <div className="max-w-4xl mx-auto">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.milestone ? 'bg-primary' : 'bg-muted'
                        }`}>
                        <Icon className={`w-6 h-6 ${item.milestone ? 'text-primary-foreground' : 'text-muted-foreground'
                          }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-primary font-medium">{item.year}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {item.milestone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="hidden md:block"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"
                >
                  <span className="text-4xl font-bold text-primary-foreground">{member.initial}</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="text-xl font-semibold text-foreground mb-2"
                >
                  {member.name}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="text-sm text-primary font-medium mb-4"
                >
                  {member.role}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                  className="text-sm text-muted-foreground mb-6"
                >
                  {member.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                  className="mb-6"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-soft text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.8 }}
                  className="pt-4 border-t border-border"
                >
                  <p className="text-xs text-muted-foreground italic">
                    "{member.journey}"
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguarding */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Safeguarding & Privacy
            </h2>
            <p className="text-muted-foreground mb-6">
              Your safety is our priority. All conversations are anonymous, we do not
              collect identifying information, and our platform is moderated to ensure
              a supportive environment for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/privacy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
              <Link to="/terms">
                <Button variant="outline">Terms of Service</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-foreground mb-12"
          >
            Our Impact
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: "5,000+", label: "Active Users", icon: Users },
              { number: "10,000+", label: "Support Sessions", icon: Heart },
              { number: "24/7", label: "Available Support", icon: Shield },
              { number: "95%", label: "User Satisfaction", icon: Award }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card shadow-card"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-soft flex items-center justify-center"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-2xl font-bold text-primary mb-2"
                  >
                    {stat.number}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    className="text-sm text-muted-foreground"
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Whether you need support or want to support others, there's a place for you at Ihumure.
              Together, we're building a stigma-free Rwanda where mental health is prioritized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chatrooms">
                <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="w-4 h-4" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/wellness">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white hover:text-primary">
                  <Lightbulb className="w-4 h-4" />
                  Explore Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
