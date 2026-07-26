import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Store, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { BAKERY_INFO } from "../data/bakeryData";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [orderType, setOrderType] = useState("pickup"); // pickup | delivery
  const [address, setAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tipPercentage, setTipPercentage] = useState(10);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // cart | checkout | confirmation
  const [receiptData, setReceiptData] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? 80 : 0;
  const tipAmount = Math.round((subtotal * tipPercentage) / 100);
  const taxAmount = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + tipAmount + taxAmount;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (orderType === "delivery" && !address)) {
      alert("Please fill in your name, contact phone number, and delivery address.");
      return;
    }

    const orderReceipt = {
      orderId: `GROOT-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cartItems,
      orderType,
      customerName,
      customerPhone,
      address: orderType === "delivery" ? address : BAKERY_INFO.address,
      subtotal,
      deliveryFee,
      taxAmount,
      tipAmount,
      grandTotal,
      estimatedTime: orderType === "delivery" ? "35 - 45 Mins" : "20 Mins"
    };

    setReceiptData(orderReceipt);
    setCheckoutStep("confirmation");
    onClearCart();
  };

  const handleReset = () => {
    setCheckoutStep("cart");
    setReceiptData(null);
    onClose();
  };

  return (
    <div className="cart-backdrop animate-fadeIn" onClick={onClose}>
      <div 
        className="cart-drawer-panel animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} />
            <h2>Your Order Cart</h2>
            <span className="cart-count-pill">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Step Views */}
        {checkoutStep === "confirmation" && receiptData ? (
          /* Confirmation Receipt View */
          <div className="confirmation-view animate-fadeIn">
            <div className="success-icon-wrap">
              <CheckCircle size={48} className="success-check-icon" />
            </div>

            <h3 className="confirmation-heading">Order Placed Successfully!</h3>
            <p className="confirmation-sub">Thank you, <strong>{receiptData.customerName}</strong>! Your artisanal bakery order is being freshly prepared at IamGroot.in.</p>

            <div className="order-ticket-card">
              <div className="ticket-row header">
                <span>Order Ref: <strong>#{receiptData.orderId}</strong></span>
                <span>Est. {receiptData.orderType === "delivery" ? "Delivery" : "Pickup"}: <strong>{receiptData.estimatedTime}</strong></span>
              </div>

              <div className="ticket-items-list">
                {receiptData.items.map((item, idx) => (
                  <div key={idx} className="ticket-item-row">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="ticket-divider"></div>

              <div className="ticket-row">
                <span>Payment Status:</span>
                <span className="badge-paid">Pay on {receiptData.orderType === "delivery" ? "Delivery" : "Pickup"}</span>
              </div>
              <div className="ticket-row grand-total-row">
                <span>Grand Total:</span>
                <span className="grand-total-val">₹{receiptData.grandTotal}</span>
              </div>
            </div>

            <button onClick={handleReset} className="back-to-bakery-btn">
              Continue Browsing IamGroot.in
            </button>
          </div>
        ) : checkoutStep === "checkout" ? (
          /* Checkout Form View */
          <form onSubmit={handlePlaceOrder} className="checkout-form-view animate-fadeIn">
            <button type="button" onClick={() => setCheckoutStep("cart")} className="back-to-cart-link">
              ← Back to Cart Overview
            </button>

            <h3>Customer & Delivery Details</h3>

            {/* Order Type Switch */}
            <div className="order-type-switch">
              <button
                type="button"
                className={`switch-btn ${orderType === "pickup" ? "active" : ""}`}
                onClick={() => setOrderType("pickup")}
              >
                <Store size={18} />
                <span>Store Pickup (Free)</span>
              </button>
              <button
                type="button"
                className={`switch-btn ${orderType === "delivery" ? "active" : ""}`}
                onClick={() => setOrderType("delivery")}
              >
                <Truck size={18} />
                <span>Express Delivery (₹80)</span>
              </button>
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anmol Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-input"
              />
            </div>

            {orderType === "delivery" && (
              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat/House No., Street Name, Area, Jubilee Hills"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                ></textarea>
              </div>
            )}

            {/* Tip Selection */}
            <div className="tip-selection-group">
              <label>Baker & Barista Tip:</label>
              <div className="tip-buttons-row">
                {[0, 5, 10, 15].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    className={`tip-btn ${tipPercentage === pct ? "active" : ""}`}
                    onClick={() => setTipPercentage(pct)}
                  >
                    {pct === 0 ? "No Tip" : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="checkout-summary-mini">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {orderType === "delivery" && (
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>₹{deliveryFee}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Baker Tip:</span>
                <span>₹{tipAmount}</span>
              </div>
              <div className="summary-row">
                <span>GST (5%):</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="summary-row total-highlight">
                <span>Total Amount:</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button type="submit" className="confirm-order-submit-btn">
              <span>Confirm Order (₹{grandTotal})</span>
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          /* Cart List View */
          <div className="cart-list-view">
            {cartItems.length === 0 ? (
              <div className="empty-cart-state">
                <div className="empty-cart-icon">🥖</div>
                <h3>Your Cart is Empty</h3>
                <p>Add some freshly baked sourdough, croissants, or custom cakes to get started.</p>
                <button onClick={onClose} className="browse-menu-cta">
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-scroll">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <img src={item.image} alt={item.name} className="cart-item-thumb" />

                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        {item.instructions && (
                          <p className="cart-item-note">Note: {item.instructions}</p>
                        )}
                        <div className="cart-item-price-unit">₹{item.price} each</div>
                      </div>

                      <div className="cart-item-actions">
                        <div className="qty-controls">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                          >
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="cart-remove-btn"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-subtotal-row">
                    <span>Subtotal</span>
                    <span className="subtotal-val">₹{subtotal}</span>
                  </div>

                  <p className="cart-tax-note">Taxes & delivery calculated at checkout</p>

                  <button onClick={() => setCheckoutStep("checkout")} className="proceed-checkout-btn">
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
