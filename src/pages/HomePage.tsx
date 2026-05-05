import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import PromoBanners from '../components/PromoBanners';
import BrandStory from '../components/BrandStory';
import StoresSection from '../components/StoresSection';
import Advantages from '../components/Advantages';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <HeroBanner />
        <CategoryGrid />
        <ProductSection
          tab="new"
          title="New arrivals"
          subtitle="The latest drops, fresh from our atelier"
          ctaLabel="View all jeans"
          ctaHref="/jeans?new=1"
        />
        <PromoBanners />
        <ProductSection
          tab="popular"
          title="Best sellers"
          subtitle="Loved by thousands of customers"
          ctaLabel="View all best sellers"
          ctaHref="/jeans"
          soft
        />
        <BrandStory />
        <Advantages />
        <StoresSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
