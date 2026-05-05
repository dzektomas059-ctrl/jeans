import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import StubPage from './pages/StubPage';
import CartSidebar from './components/CartSidebar';
import SearchOverlay from './components/SearchOverlay';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from './context/AppContext';

// Vite injects BASE_URL from the `base` config (e.g. "/jeans/" on GH Pages).
// React Router needs the same value as `basename` (without the trailing slash)
// so internal `<Link to="/about" />` resolves to `/jeans/about` in production.
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Jeans (the flagship category) */}
          <Route path="/jeans" element={<CatalogPage />} />
          <Route path="/jeans/:slug" element={<ProductPage />} />

          {/* Top-level categories — stubs that route through to jeans */}
          <Route
            path="/women"
            element={
              <StubPage
                title="Women"
                description="Discover Conte's premium hosiery, lingerie and clothing for women. Our flagship category — Jeans — is fully shoppable below."
              />
            }
          />
          <Route
            path="/men"
            element={
              <StubPage
                title="Men"
                description="Comfortable basics, jeans, pants and thermo wear for everyday confidence."
              />
            }
          />
          <Route
            path="/girls"
            element={
              <StubPage
                title="Girls"
                description="Tights, socks, leggings and clothing for girls — bright colors and durable fabrics."
              />
            }
          />
          <Route
            path="/boys"
            element={
              <StubPage
                title="Boys"
                description="Active basics for boys — soft cotton tights, knee-high socks and warm leggings."
              />
            }
          />
          <Route
            path="/sale"
            element={
              <StubPage
                title="Sale"
                description="Up to -50% on selected styles. Premium quality at special prices, while stock lasts."
              />
            }
          />
          <Route
            path="/promotions"
            element={
              <StubPage
                title="Promotions"
                description="Seasonal campaigns, promo codes and limited-time bundles from Conte."
              />
            }
          />

          {/* Static / informational pages */}
          <Route
            path="/about"
            element={
              <StubPage
                title="О нас"
                description="Мы — ИП Полякова С.А. Специализируемся на продаже женских джинсов премиум-качества. Работаем из Могилёвской области и отправляем заказы по всей Беларуси."
                showContact
              />
            }
          />
          <Route
            path="/how-to-order"
            element={
              <StubPage
                title="How to order"
                description="Step-by-step guide on placing your first order — choosing sizes, payment and delivery."
              />
            }
          />
          <Route
            path="/delivery"
            element={
              <StubPage
                title="Delivery"
                description="Free EU delivery for orders over €60. Tracked shipping in 2–4 business days."
              />
            }
          />
          <Route
            path="/payment"
            element={
              <StubPage
                title="Payment"
                description="Card, BLIK, PayPal, Apple Pay, Google Pay — choose what's most comfortable."
              />
            }
          />
          <Route
            path="/returns"
            element={
              <StubPage
                title="Returns and refunds"
                description="30 days easy returns. Pre-paid label included with every order."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <StubPage
                title="Контакты"
                description="Свяжитесь с нами по телефону, email или в социальных сетях. Наша команда поможет с выбором модели, размера и оформлением заказа."
                showContact
              />
            }
          />
          <Route
            path="/size-chart-jeans"
            element={
              <StubPage
                title="Size chart — jeans"
                description="Use our size chart to find your perfect fit. Sizes are given in cm and EU letters."
              />
            }
          />
          <Route
            path="/discount-card"
            element={
              <StubPage
                title="Discount card"
                description="Get a permanent -10% with our loyalty card and join our community of denim lovers."
              />
            }
          />
          <Route
            path="/store-availability"
            element={
              <StubPage
                title="Availability in stores"
                description="Check whether the item is in stock in any of our 120 boutiques."
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <StubPage
                title="Wishlist"
                description="Items you've saved for later. Add anything to wishlist with the heart icon."
              />
            }
          />
          <Route
            path="/account"
            element={
              <StubPage
                title="My account"
                description="Sign in to view your orders, saved addresses and wishlist."
              />
            }
          />

          {/* Catch-all: graceful stub instead of 404 so dead links never break the UI */}
          <Route path="*" element={<StubPage />} />
        </Routes>
        <CartSidebar />
        <SearchOverlay />
      </BrowserRouter>
    </AppProvider>
  );
}
