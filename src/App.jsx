import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import CustomCakeBuilder from "./components/CustomCakeBuilder";
import StorySection from "./components/StorySection";
import ReviewsSection from "./components/ReviewsSection";
import ContactFooter from "./components/ContactFooter";
import CartDrawer from "./components/CartDrawer";
import { CheckCircle2, X } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Add item to cart
  const handleAddToCart = (product, quantity = 1, instructions = "") => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.instructions === instructions
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            instructions: instructions || ""
          }
        ];
      }
    });

    // Trigger floating notification toast
    setToastMessage(`Added ${quantity}x ${product.name} to order!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bakery-app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="floating-toast animate-slideDown">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="toast-view-cart-btn"
          >
            View Cart ({totalCartCount})
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* Main Page Sections */}
      <main>
        <Hero 
          onExploreMenu={() => scrollToSection("menu")} 
          onCustomCakeClick={() => scrollToSection("custom-cake")} 
        />

        <MenuSection 
          onAddToCart={handleAddToCart} 
        />

        <CustomCakeBuilder 
          onAddToCart={handleAddToCart} 
        />

        <StorySection />

        <ReviewsSection />
      </main>

      {/* Footer */}
      <ContactFooter />

      {/* Shopping Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
