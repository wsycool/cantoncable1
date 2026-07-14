import { useState } from 'react';

interface DiagonalSweepCardProps {
  title: string;
  subtitle: string;
  specs: { label: string; value: string }[];
  imageSrc: string;
  imageAlt: string;
}

export default function DiagonalSweepCard({
  title,
  subtitle,
  specs,
  imageSrc,
  imageAlt,
}: DiagonalSweepCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="card-wrapper relative bg-white rounded overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Content Layer */}
      <div className="content-layer">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-80 overflow-hidden bg-[#F4F5F7]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 img-reveal"
              onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')}
            />
          </div>

          {/* Info */}
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="font-display font-black text-[#111A20] text-2xl lg:text-3xl tracking-[-0.02em] mb-2">
              {title}
            </h3>
            <p className="font-mono text-[11px] tracking-[0.15em] text-[#8896A4] mb-6">
              {subtitle}
            </p>
            <div className="space-y-2">
              {specs.slice(0, 3).map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between text-sm"
                >
                  <span className="text-[#8896A4]">{spec.label}</span>
                  <span className="text-[#111A20] font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sweep Layer */}
      <div className={`sweep-layer ${isActive ? 'active' : ''}`}>
        {/* Hidden data revealed on sweep */}
        <div className="hidden-data absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#111A20]/90 to-transparent">
          <div className="grid grid-cols-3 gap-4 font-mono text-[10px] tracking-[0.1em]">
            {specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <div className="text-white/40 mb-1">{spec.label}</div>
                <div className="text-white">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
