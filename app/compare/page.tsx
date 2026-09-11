'use client';

import GlobalHeader from '@/components/GlobalHeader';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Collection from '@/components/collection/Collection';

export default function ComparePage() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden selection:bg-[#A52A2C] selection:text-[#F3ECE0]">
      <h1 className="sr-only">Origin or Aura. Find your fit.</h1>
      <ScrollProgressBar />
      <CustomCursor mouseProxy={{ current: { x: 0, y: 0, px: 0, py: 0 } }} />
      <GlobalHeader />

      {/* Comparison & Duo Bundle View */}
      <div className="pt-8">
        <Collection />
      </div>

      <Footer />
    </main>
  );
}