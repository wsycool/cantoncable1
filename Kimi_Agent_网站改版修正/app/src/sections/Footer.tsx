import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

gsap.registerPlugin(Flip);

function BlueprintMorphFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [morphed, setMorphed] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleConnect = () => {
    if (morphed) {
      setShowForm(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLElement>('.bp-footer-line');
    if (lines.length === 0) return;

    // Set initial low opacity
    gsap.set(lines, { opacity: 0.3 });

    // Capture states and animate
    lines.forEach((line, i) => {
      const state = Flip.getState(line, {
        props: 'opacity,backgroundColor',
      });

      line.classList.remove('scattered');
      line.classList.add('grid-locked');

      // Position to grid
      const row = Math.floor(i / 5);
      const col = i % 5;
      line.style.left = `${10 + col * 20}%`;
      line.style.top = `${15 + row * 22}%`;
      line.style.width = '15%';
      line.style.height = '2px';

      Flip.to(state, {
        duration: 1.5,
        ease: 'power3.inOut',
        stagger: 0.05,
        delay: i * 0.05,
        onComplete: () => {
          if (i === lines.length - 1) {
            gsap.to('.footer-modal', {
              opacity: 1,
              duration: 1,
              onStart: () => setShowForm(true),
            });
          }
        },
      });
    });

    setMorphed(true);
  };

  useEffect(() => {
    // Initial scattered positions
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll<HTMLElement>('.bp-footer-line');
    lines.forEach((line) => {
      line.style.left = `${Math.random() * 80 + 5}%`;
      line.style.top = `${Math.random() * 60 + 10}%`;
      line.style.width = `${Math.random() * 30 + 10}%`;
      line.style.height = '1px';
      line.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    });
  }, []);

  return (
    <div className="relative min-h-[400px] lg:min-h-[500px]">
      {/* Blueprint lines container */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="bp-footer-line scattered"
            style={{
              left: `${Math.random() * 80 + 5}%`,
              top: `${Math.random() * 60 + 10}%`,
              width: `${Math.random() * 30 + 10}%`,
              height: '1px',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
          />
        ))}

        {/* Blueprint labels */}
        <div className="absolute top-[10%] left-[5%] font-mono text-[9px] tracking-[0.2em] text-[#8896A4]/30">
          GZ-CABLE-FOOTPRINT-V3.2
        </div>
        <div className="absolute bottom-[15%] right-[8%] font-mono text-[9px] tracking-[0.2em] text-[#8896A4]/30">
          COORD: 22.9913°N, 113.4737°E
        </div>
      </div>

      {/* Center CTA */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px] px-6">
        {!showForm ? (
          <>
            <h3 className="font-display font-black text-white text-3xl lg:text-5xl tracking-[-0.02em] text-center mb-6">
              READY TO POWER
              <br />
              <span className="text-[#E86110]">YOUR PROJECT?</span>
            </h3>
            <p className="text-white/50 text-center max-w-[500px] mb-10 text-sm lg:text-base">
              From low-voltage building wires to extra-high-voltage transmission
              cables, we deliver precision-engineered solutions tailored to your
              specifications.
            </p>
            <button
              onClick={handleConnect}
              className="px-10 py-4 rounded-full bg-[#E86110] text-white font-mono text-[12px] tracking-[0.2em] glow-pulse hover:bg-[#d4550f] transition-colors duration-300"
            >
              CONNECT
            </button>
          </>
        ) : (
          <div className="footer-modal opacity-0 w-full max-w-[600px]">
            <div className="liquid-glass rounded-xl p-8 lg:p-10">
              <h4 className="font-display font-bold text-white text-xl mb-6">
                Send Inquiry
              </h4>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 font-mono text-[12px] focus:outline-none focus:border-[#E86110] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 font-mono text-[12px] focus:outline-none focus:border-[#E86110] transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Product Specification (Voltage, Cross-section, etc.)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 font-mono text-[12px] focus:outline-none focus:border-[#E86110] transition-colors"
                />
                <textarea
                  rows={3}
                  placeholder="Additional Requirements"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 font-mono text-[12px] focus:outline-none focus:border-[#E86110] transition-colors resize-none"
                />
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-lg border border-white/20 text-white/60 font-mono text-[11px] tracking-[0.15em] hover:border-white/40 hover:text-white transition-colors"
                  >
                    CANCEL
                  </button>
                  <button className="flex-1 py-3 rounded-lg bg-[#E86110] text-white font-mono text-[11px] tracking-[0.15em] hover:bg-[#d4550f] transition-colors">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#111A20]">
      {/* Why Choose Us Section */}
      <div className="border-t border-white/5 py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: 'ISO',
                title: 'TRIPLE CERTIFIED',
                desc: 'ISO 9001 · ISO 14001 · OHSAS 18001 quality management systems',
              },
              {
                icon: 'Cu',
                title: 'LME COPPER',
                desc: 'Raw copper sourced exclusively from LME-registered suppliers',
              },
              {
                icon: '15D',
                title: '15-25 DAYS',
                desc: 'On-time delivery for standard items with full traceability',
              },
              {
                icon: 'FREE',
                title: 'FREE SAMPLES',
                desc: '1-2m sample cutting with complete technical dossier',
              },
            ].map((item) => (
              <div key={item.title} className="group">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#E86110] block mb-3">
                  {item.icon}
                </span>
                <h4 className="font-display font-bold text-white text-lg mb-2 group-hover:text-[#E86110] transition-colors">
                  {item.title}
                </h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t border-white/5 py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[#E86110] mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                  WHATSAPP
                </span>
                <span className="text-white/80 text-sm">+86 158 0000 3631</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#E86110] mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                  EMAIL
                </span>
                <span className="text-white/80 text-sm">king9wsy@gmail.com</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle
                size={16}
                className="text-[#E86110] mt-1 flex-shrink-0"
              />
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                  WECHAT
                </span>
                <span className="text-white/80 text-sm">king-wsy</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#E86110] mt-1 flex-shrink-0" />
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 block mb-1">
                  ADDRESS
                </span>
                <span className="text-white/80 text-sm">
                  No.51 LanZhang Rd, Nansha, Guangzhou, China
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Morph Footer */}
      <div className="border-t border-white/5">
        <BlueprintMorphFooter />
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
            © 2025 GUANGZHOU CABLE CO., LTD. ALL RIGHTS RESERVED.
          </span>
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M24 4L42 24L24 44L6 24L24 4Z"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M24 12L36 24L24 36L12 24L24 12Z"
                stroke="rgba(232,97,16,0.4)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.15em] text-white/20">
              GUANGZHOU CABLE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
