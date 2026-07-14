import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMaskReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const panels = panelsRef.current;
    if (!container || panels.length < 3) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 60%',
        end: '+=200vh',
        scrub: true,
        pin: true,
      },
    });

    // Panel 1: collapse vertically
    tl.fromTo(
      panels[0],
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 100% 0%)', ease: 'power3.inOut' }
    );

    // Panel 2: reveal from right
    tl.fromTo(
      panels[1],
      { clipPath: 'inset(0% 0% 0% 100%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power3.inOut' }
    );

    // Panel 3: fade in
    tl.to(panels[2], { opacity: 1, duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="tech"
      className="relative bg-[#111A20]"
      style={{ minHeight: '100vh' }}
    >
      <div
        ref={containerRef}
        className="reveal-container relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background copper image ( Panel 3 content ) */}
        <div
          ref={(el) => {
            if (el) panelsRef.current[2] = el;
          }}
          className="reveal-panel absolute inset-0 z-0"
        >
          <img
            src="/images/copper-core.jpg"
            alt="Copper Core"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#111A20]/40" />
          {/* Data overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-mono text-[11px] tracking-[0.3em] text-[#E86110] mb-4">
                HIGH PURITY COPPER CONDUCTOR
              </p>
              <p className="font-mono text-[11px] tracking-[0.2em] text-white/50">
                Cu-ETP (T2) 99.95% · Annealed · Class 2 Stranded
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2 - Secondary mask */}
        <div
          ref={(el) => {
            if (el) panelsRef.current[1] = el;
          }}
          className="reveal-panel absolute inset-0 z-10 flex items-center justify-center bg-[#111A20]"
        >
          <h2 className="font-display font-black text-white text-[clamp(32px,8vw,120px)] leading-[0.9] tracking-[-0.02em] text-center whitespace-nowrap">
            6/10 kV — 26/35 kV
          </h2>
        </div>

        {/* Panel 1 - Primary text mask */}
        <div
          ref={(el) => {
            if (el) panelsRef.current[0] = el;
          }}
          className="reveal-panel absolute inset-0 z-20 flex items-center justify-center bg-[#111A20]"
        >
          <h2 className="font-display font-black text-white text-[clamp(40px,10vw,140px)] leading-[0.9] tracking-[-0.02em] text-center whitespace-nowrap">
            0.6/1 kV — 26/35 kV
          </h2>
        </div>
      </div>
    </section>
  );
}
