'use client';

import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Collection from '@/components/collection/Collection';

export default function ComparePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-clip selection:bg-[#A52A2C] selection:text-[#F3ECE0]">
      <ScrollProgressBar />
      <CustomCursor mouseProxy={{ current: { px: 0, py: 0 } }} />
      <GlobalHeader />

      {/* Comparison & Duo Bundle View */}
      <div className="pt-8">
        <Collection
          h1Title="Origin or Aura. Find your fit."
          subtitle="One wears dewy. One wears invisible. Compare Origin and Aura side-by-side to find the right layer for your weather and skin."
        />
      </div>

      <Footer />
    </main>
  );
}