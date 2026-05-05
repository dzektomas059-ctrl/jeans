import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartSidebar from './components/CartSidebar';
import SearchOverlay from './components/SearchOverlay';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <CartSidebar />
        <SearchOverlay />
      </BrowserRouter>
    </AppProvider>
  );
}
