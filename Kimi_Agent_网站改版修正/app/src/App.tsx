import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import GlobalNav from '@/components/GlobalNav';
import HeroBlueprint from '@/sections/HeroBlueprint';
import ScrollMaskReveal from '@/sections/ScrollMaskReveal';
import ProductShowcase from '@/sections/ProductShowcase';
import ProductionFacility from '@/sections/ProductionFacility';
import Footer from '@/sections/Footer';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative">
        <GlobalNav />
        <main>
          <HeroBlueprint />
          <ScrollMaskReveal />
          <ProductShowcase />
          <ProductionFacility />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
