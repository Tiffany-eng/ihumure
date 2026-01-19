import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { ConditionsGrid } from "@/components/home/ConditionsGrid";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WellnessPreview } from "@/components/home/WellnessPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <ConditionsGrid />
      <StatsSection />
      <WellnessPreview />
      <TestimonialsSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
