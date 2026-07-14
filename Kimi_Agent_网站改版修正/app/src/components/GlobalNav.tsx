import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'PRODUCTS', href: '#products' },
    { label: 'TECH', href: '#tech' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Company Logo */}
            <img
              src="/images/logo.png"
              alt="Guangzhou Cable Logo"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/70 hidden sm:block">
              GUANGZHOU CABLE
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[13px] tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E86110] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full bg-[#E86110] text-white font-mono text-[11px] tracking-[0.15em] glow-pulse hover:bg-[#d4550f] transition-colors duration-300"
            >
              QUICK INQUIRY
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden nav-glass border-t border-white/5">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-[13px] tracking-[0.15em] text-white/60 hover:text-[#E86110] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-block mt-4 px-6 py-3 rounded-full bg-[#E86110] text-white font-mono text-[11px] tracking-[0.15em]"
            >
              QUICK INQUIRY
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
