import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import PromoBanners from '../components/PromoBanners';
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
        <ProductSection title="Новинки" tab="new" />
        <PromoBanners />
        <ProductSection title="Популярные товары" tab="popular" />
        <Advantages />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
