import { PageLayout } from "@/components/layout/PageLayout";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { ConditionsGrid } from "@/components/home/ConditionsGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WellnessPreview } from "@/components/home/WellnessPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <PageLayout>
      {/* New Minimalist Hero Section */}
      <MinimalistHero
        mainText="Providing a safe, anonymous platform where Rwandans can access mental health information, connect with peer support communities, and find resources to support their wellbeing journey."
        readMoreLink="/about"
        imageSrc="/images/IMG_2398.WEBP"
        imageAlt="Mental health support and community connection"
        overlayText={{
          part1: 'mental',
          part2: 'health.',
        }}
      />

      {/* Keep existing sections below the hero */}
      <ConditionsGrid />
      <StatsSection />
      <WellnessPreview />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
