import { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { ContactView } from './components/ContactView';
import { CustomStudioView } from './components/CustomStudioView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { OurStoryView } from './components/OurStoryView';
import { PastProjectsView } from './components/PastProjectsView';
import { ProductModal } from './components/ProductModal';
import { ProjectModal } from './components/ProjectModal';
import { ShopDropsView } from './components/ShopDropsView';
import {
  CartItem,
  ClayProduct,
  CommissionTicket,
  PageView,
  PastProject,
} from './types';

const CART_STORAGE_KEY = 'unroooled_cart_v1';
const TICKETS_STORAGE_KEY = 'unroooled_tickets_v1';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('shop-cute-drops');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [tickets, setTickets] = useState<CommissionTicket[]>(() => {
    try {
      const saved = localStorage.getItem(TICKETS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CommissionTicket[]) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ClayProduct | null>(null);
  const [selectedProject, setSelectedProject] = useState<PastProject | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    } catch {
      // ignore storage quota errors
    }
  }, [tickets]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const handleAddProductToCart = (product: ClayProduct, quantity = 1, note?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.note === note);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.note === note
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          note,
          meta: product.hardware,
        },
      ];
    });
    showToast(`${product.name} unrolled into basket! ✨`);
  };

  const handleAddCustomToCart = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    showToast(`${customItem.name} added to your bag! ✨`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSubmitTicket = (
    draft: Omit<CommissionTicket, 'id' | 'createdAt' | 'estimatedPrice'>
  ): CommissionTicket => {
    const v = draft.vibe.toLowerCase();
    let estimatedPrice = 150;
    if (v.includes('face badge')) estimatedPrice = 60;
    else if (v.includes('lip balm')) estimatedPrice = 99;
    else if (v.includes('name keychain')) estimatedPrice = 150;
    else if (v.includes('diva')) estimatedPrice = 238;
    else if (v.includes('2 custom')) estimatedPrice = 250;
    else if (v.includes('fridge magnet')) estimatedPrice = 349;
    else if (v.includes('4 custom')) estimatedPrice = 450;

    const newTicket: CommissionTicket = {
      ...draft,
      id: `CLAY-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: 'just now',
      estimatedPrice,
    };
    setTickets((prev) => [newTicket, ...prev]);
    showToast(`ticket #${newTicket.id} sent to studio! ✿`);
    return newTicket;
  };

  const handleOrderSimilarProject = () => {
    setActivePage('custom-orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-clip">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="w-full pt-16 sm:pt-20 bg-surface flex-1">
        {activePage === 'shop-cute-drops' && (
          <ShopDropsView
            onAddToCart={(product) => handleAddProductToCart(product, 1)}
            onSelectProduct={setSelectedProduct}
            onSelectProject={setSelectedProject}
            onNavigate={setActivePage}
            onSubmitTicket={handleSubmitTicket}
            recentTickets={tickets}
            cartItems={cartItems}
          />
        )}

        {activePage === 'custom-orders' && (
          <CustomStudioView
            onAddCustomToCart={handleAddCustomToCart}
            onSubmitTicket={handleSubmitTicket}
          />
        )}

        {activePage === 'past-projects' && (
          <PastProjectsView
            onSelectProject={setSelectedProject}
            onOrderCustom={() => {
              setActivePage('custom-orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'our-story' && <OurStoryView onNavigate={setActivePage} />}

        {activePage === 'contact-and-dm' && (
          <ContactView onSubmitTicket={handleSubmitTicket} recentTickets={tickets} />
        )}
      </main>

      <Footer onNavigate={setActivePage} />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddProductToCart}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOrderSimilar={handleOrderSimilarProject}
      />

      {/* Interactive Mini Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
          toastMessage
            ? 'translate-y-0 opacity-100'
            : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-surface-container-lowest text-on-surface px-4 sm:px-5 py-3 rounded-full shadow-[4px_4px_0px_#1b1836] border border-on-surface/10 flex items-center justify-between sm:justify-start gap-2.5 max-w-full sm:max-w-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0">
              auto_awesome
            </span>
            <span className="font-label-sm lowercase truncate">{toastMessage || ''}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="ml-1 font-label-sm lowercase text-primary underline shrink-0"
          >
            view bag
          </button>
        </div>
      </div>
    </div>
  );
}
