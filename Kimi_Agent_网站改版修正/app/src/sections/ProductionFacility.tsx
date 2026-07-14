import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { use3DParallax } from '@/hooks/use3DParallax';

gsap.registerPlugin(ScrollTrigger);

export default function ProductionFacility() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsStageRef = useRef<HTMLDivElement>(null);

  use3DParallax(cardsStageRef);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Image reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 20%',
        scrub: false,
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      image,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#F4F5F7] py-32 lg:py-48"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#8896A4] block mb-4">
            PRODUCTION FACILITY
          </span>
          <h2 className="font-display font-black text-[#111A20] text-[clamp(36px,6vw,72px)] leading-[0.95] tracking-[-0.02em]">
            MANUFACTURING
            <br />
            <span className="text-[#0052D9]">EXCELLENCE</span>
          </h2>
        </div>

        {/* Asymmetric Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Factory Image (60%) */}
          <div className="lg:col-span-3" ref={imageRef}>
            <div className="relative rounded overflow-hidden shadow-2xl">
              <img
                src="/images/factory.jpg"
                alt="Guangzhou Cable Manufacturing Facility"
                className="w-full h-[400px] lg:h-[600px] object-cover img-reveal"
                onLoad={(e) =>
                  (e.currentTarget as HTMLImageElement).classList.add('loaded')
                }
              />
              {/* Overlay info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 bg-gradient-to-t from-[#111A20]/90 to-transparent">
                <div className="flex flex-wrap gap-6 lg:gap-10">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                      PLANT AREA
                    </span>
                    <span className="font-display font-bold text-white text-xl lg:text-2xl">
                      180,000 m²
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                      ANNUAL CAPACITY
                    </span>
                    <span className="font-display font-bold text-white text-xl lg:text-2xl">
                      80,000 Tons
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                      EMPLOYEES
                    </span>
                    <span className="font-display font-bold text-white text-xl lg:text-2xl">
                      700+
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description below image */}
            <div className="mt-8 lg:mt-12 max-w-[640px]">
              <p className="text-[#111A20]/80 leading-relaxed text-base lg:text-lg">
                Located in Nansha District, Guangzhou — at the heart of the
                Guangdong-Hong Kong-Macao Greater Bay Area. Our facility
                integrates Finland CCV production lines, German Sikora online
                testing equipment, and full-process quality traceability systems.
              </p>
            </div>
          </div>

          {/* Right: 3D Parallax Cards (40%) */}
          <div className="lg:col-span-2 flex items-center">
            <div
              ref={cardsStageRef}
              className="parallax-stage relative w-full h-[400px] lg:h-[500px]"
            >
              {/* Card 1 - Back layer */}
              <div
                className="parallax-layer absolute top-8 left-4 lg:left-8 w-[85%] liquid-glass rounded-lg p-5 lg:p-6"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#0052D9]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">
                    QUALITY REPORT #2024-Q3
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-white/40">TEST ITEM</span>
                    <span className="text-white/80">CONDUCTOR RESISTANCE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">RESULT</span>
                    <span className="text-[#E86110]">PASS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">STANDARD</span>
                    <span className="text-white/80">IEC 60228</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">VALUE</span>
                    <span className="text-white/80">
                      0.387 Ω/km @20°C
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">
                    CERTIFIED BY: TÜV SÜD · SGS · DEKRA
                  </span>
                </div>
              </div>

              {/* Card 2 - Front layer */}
              <div
                className="parallax-layer absolute bottom-8 right-4 lg:right-0 w-[85%] liquid-glass rounded-lg p-5 lg:p-6"
                style={{ transform: 'translateZ(100px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#E86110]" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">
                    TYPE TEST REPORT
                  </span>
                </div>
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-white/40">VOLTAGE CLASS</span>
                    <span className="text-white/80">26/35 kV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">AC WITHSTAND</span>
                    <span className="text-[#E86110]">91 kV / 5min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">IMPULSE</span>
                    <span className="text-white/80">200 kV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">TEMP RATING</span>
                    <span className="text-white/80">90°C (XLPE)</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-white/30">
                    ISSUED: 2024-09-15 · VALID: 2027-09-14
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
