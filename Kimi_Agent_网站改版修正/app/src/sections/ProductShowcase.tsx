import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalSweepCard from '@/components/DiagonalSweepCard';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: 'LOW-VOLTAGE',
    subtitle: 'POWER CABLE 0.6/1 kV',
    specs: [
      { label: 'CONDUCTOR', value: 'Cu / Al' },
      { label: 'INSULATION', value: 'XLPE / PVC' },
      { label: 'ARMOR', value: 'SWA / STA / AWA' },
      { label: 'STANDARDS', value: 'IEC 60502-1' },
      { label: 'CROSS-SECTION', value: '1.5 – 1000 mm²' },
      { label: 'CORES', value: '1 – 5' },
    ],
    imageSrc: '/images/cable-reel.jpg',
    imageAlt: 'Low Voltage Power Cable',
  },
  {
    title: 'MEDIUM-VOLTAGE',
    subtitle: 'POWER CABLE 6/10 – 26/35 kV',
    specs: [
      { label: 'CONDUCTOR', value: 'Cu / Al' },
      { label: 'INSULATION', value: 'XLPE' },
      { label: 'SCREEN', value: 'Semi-conductive' },
      { label: 'STANDARDS', value: 'IEC 60502-2' },
      { label: 'CROSS-SECTION', value: '25 – 1000 mm²' },
      { label: 'CORES', value: '1 – 3' },
    ],
    imageSrc: '/images/copper-core.jpg',
    imageAlt: 'Medium Voltage Power Cable',
  },
  {
    title: 'BUILDING WIRES',
    subtitle: 'BV / RV / THHN / MC',
    specs: [
      { label: 'CONDUCTOR', value: 'Cu (Class 1/2)' },
      { label: 'INSULATION', value: 'PVC / XLPE' },
      { label: 'RATED VOLTAGE', value: '450/750V' },
      { label: 'STANDARDS', value: 'GB/T 5023' },
      { label: 'CROSS-SECTION', value: '0.5 – 240 mm²' },
      { label: 'TEMP', value: '-15°C ~ +70°C' },
    ],
    imageSrc: '/images/cable-reel.jpg',
    imageAlt: 'Building Wires',
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          scrub: false,
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        card,
        {
          opacity: 0,
          y: 60 + index * 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-[#F4F5F7] py-32 lg:py-48"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#8896A4] block mb-4">
            PRODUCT PORTFOLIO
          </span>
          <h2 className="font-display font-black text-[#111A20] text-[clamp(36px,6vw,72px)] leading-[0.95] tracking-[-0.02em]">
            ENGINEERED FOR
            <br />
            <span className="text-[#0052D9]">GLOBAL STANDARDS</span>
          </h2>
        </div>

        {/* Product Cards */}
        <div className="space-y-12 lg:space-y-16">
          {products.map((product, index) => (
            <div
              key={product.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="opacity-0"
            >
              <DiagonalSweepCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
