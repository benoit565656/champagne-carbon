import React from 'react';
import { Hero } from '@/components/home/Hero';
import { VineyardOverlay } from '@/components/home/VineyardOverlay';
import { ManilaWineExclusivity } from '@/components/home/ManilaWineExclusivity';
import { CuveeShowcase } from '@/components/home/CuveeShowcase';
import { BugattiSection } from '@/components/home/BugattiSection';
import { RecognitionStrip } from '@/components/home/RecognitionStrip';
import { CoffretSection } from '@/components/home/CoffretSection';
import { VideoSection } from '@/components/home/VideoSection';
import { PromiseSection } from '@/components/home/PromiseSection';
import { PrivateAccessSection } from '@/components/home/PrivateAccessSection';

export default function HomePage() {
  return (
    <div className="w-full bg-[#000000] text-[#ece9e2] overflow-x-hidden">
      {/* 1. Full-Height Hero with Halo Artwork, Partner Badges & 3-Pillar Protection Strip */}
      <Hero />

      {/* 2. Cinematic Vineyard Panoramic Section (Nature Creates. Time Perfects. Carbon Protects.) */}
      <VineyardOverlay />

      {/* 3. The House: Champillon · Premier Cru · Five Generations */}
      <ManilaWineExclusivity />

      {/* 4. The Collection: Full-Width 4 Tall Bottles on Pure Black (Brut, Rosé, BdB, BdN) */}
      <CuveeShowcase />

      {/* 5. Edition Bugatti: Full-Width 3 Tall Bottles on Pure Black (EB.01, Chiron 300+, Bolide) */}
      <BugattiSection />

      {/* 6. Recognition Strip: Gilbert & Gaillard Double Gold + Bugatti, Lamborghini, Zephalto */}
      <RecognitionStrip />

      {/* 7. Signature Case: Full-Width Lacquered Casket on Black Marble */}
      <CoffretSection />

      {/* 8. Video Background: High-Res Looping Video of Carbon Craftsmanship */}
      <VideoSection />

      {/* 9. Our Promise: Full-Width Woven Carbon Fiber & 6 Circular Luxury Badges */}
      <PromiseSection />

      {/* 10. Private Access: VIP Allocation & Concierge List Signup */}
      <PrivateAccessSection />
    </div>
  );
}
