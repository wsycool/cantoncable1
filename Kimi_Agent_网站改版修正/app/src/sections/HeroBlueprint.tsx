import BlueprintGrid from '@/components/BlueprintGrid';
import { ChevronDown } from 'lucide-react';

export default function HeroBlueprint() {
  return (
    <section
      id="hero"
      className="relative min-h-[150vh] bg-[#111A20] overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <BlueprintGrid />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 lg:pt-48 pb-20">
        {/* Main Title */}
        <div className="max-w-[1000px]">
          <h1 className="font-display font-black text-white leading-[0.9] tracking-[-0.02em]">
            <span className="block text-[clamp(48px,12vw,160px)]">GLOBAL</span>
            <span className="block text-[clamp(48px,12vw,160px)] text-[#E86110]">
              POWER
            </span>
            <span className="block text-[clamp(48px,12vw,160px)]">
              INFRASTRUCTURE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-white/50 text-lg lg:text-xl max-w-[600px] leading-relaxed">
            Since 1956, Guangzhou Cable Co., Ltd. has been delivering
            world-class power transmission solutions across 30+ countries.
          </p>
        </div>

        {/* Liquid Glass Info Panel */}
        <div className="mt-12 lg:mt-16 max-w-[520px]">
          <div className="liquid-glass rounded-lg p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 font-mono text-[12px] lg:text-[13px]">
              <div>
                <span className="text-white/40 block mb-1">EST.</span>
                <span className="text-white/90">1956</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">LOCATION</span>
                <span className="text-white/90">22.99°N, 113.47°E</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">MATERIAL</span>
                <span className="text-white/90">Cu-ETP (T2) 99.95%</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">STANDARDS</span>
                <span className="text-white/90">IEC / BS / ASTM</span>
              </div>
              <div className="col-span-2 pt-3 border-t border-white/10">
                <span className="text-white/40 block mb-1">CERTIFICATION</span>
                <span className="text-white/90">
                  ISO 9001 · ISO 14001 · OHSAS 18001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-24 lg:mt-32 flex flex-col items-center">
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/30 mb-4">
            SCROLL
          </span>
          <ChevronDown
            size={32}
            className="text-white/20 float-animation"
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111A20] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
