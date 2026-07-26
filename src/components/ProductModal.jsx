import React, { useState } from "react";
import { X, Star, Plus, Minus, Clock, Flame, CheckCircle, ShoppingBag } from "lucide-react";

export default function ProductModal({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, instructions);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 800);
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="modal-backdrop animate-fadeIn" onClick={onClose}>
      <div 
        className="product-modal-card animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body-grid">
          {/* Item Image */}
          <div className="modal-image-col">
            <img src={item.image} alt={item.name} className="modal-product-img" />
            <div className="modal-img-badges">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="modal-tag-badge">{tag}</span>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="modal-info-col">
            <div className="modal-header-info">
              <span className="modal-category-name">{item.category.toUpperCase()}</span>
              <h2 className="modal-item-title">{item.name}</h2>
              
              <div className="modal-price-rating">
                <span className="modal-item-price">₹{item.price}</span>
                <div className="modal-rating-badge">
                  <Star size={16} className="star-icon" />
                  <strong>{item.rating}</strong>
                  <span>({item.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="modal-item-description">{item.description}</p>

            <div className="modal-meta-row">
              <div className="meta-pill">
                <Clock size={14} />
                <span>{item.prepTime}</span>
              </div>
              <div className="meta-pill">
                <Flame size={14} />
                <span>{item.calories} Calories / serving</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="modal-ingredients-section">
              <h4>Crafted With Pure Ingredients:</h4>
              <div className="ingredients-pills">
                {item.ingredients.map((ing, idx) => (
                  <span key={idx} className="ing-pill">{ing}</span>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="modal-instructions-group">
              <label htmlFor="instructions">Special Requests / Dietary Notes:</label>
              <input
                id="instructions"
                type="text"
                placeholder="e.g. Extra crisp crust, sliced loaf, less sugar"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="instructions-input"
              />
            </div>

            {/* Quantity & Add CTA */}
            <div className="modal-action-bar">
              <div className="quantity-stepper">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="step-btn"
                >
                  <Minus size={16} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="step-btn"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button onClick={handleAdd} className="modal-add-btn">
                {addedToast ? (
                  <>
                    <CheckCircle size={18} />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add ₹{totalPrice} to Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
