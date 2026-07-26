import React, { useState } from "react";
import { CAKE_BUILDER_OPTIONS } from "../data/bakeryData";
import { Sparkles, Check, Cake, Layers, Palette, MessageSquare, ShoppingBag, Heart } from "lucide-react";

export default function CustomCakeBuilder({ onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(CAKE_BUILDER_OPTIONS.sizes[0]);
  const [selectedSponge, setSelectedSponge] = useState(CAKE_BUILDER_OPTIONS.sponges[0]);
  const [selectedFilling, setSelectedFilling] = useState(CAKE_BUILDER_OPTIONS.fillings[0]);
  const [selectedDecoration, setSelectedDecoration] = useState(CAKE_BUILDER_OPTIONS.decorations[0]);
  const [inscription, setInscription] = useState("");
  const [added, setAdded] = useState(false);

  // Calculate live total price
  const totalPrice = 
    selectedSize.basePrice + 
    selectedSponge.price + 
    selectedFilling.price + 
    selectedDecoration.price;

  const handleAddCustomCake = () => {
    const customCakeItem = {
      id: `custom-cake-${Date.now()}`,
      name: `Custom Cake (${selectedSize.label.split('(')[0].trim()})`,
      category: "cakes",
      price: totalPrice,
      image: "/images/cake.png",
      description: `Custom cake: ${selectedSponge.label} sponge with ${selectedFilling.label} filling, topped with ${selectedDecoration.label}. ${inscription ? `Inscription: "${inscription}"` : ""}`,
      tags: ["Custom Created", "Handcrafted"],
      customDetails: {
        size: selectedSize.label,
        sponge: selectedSponge.label,
        filling: selectedFilling.label,
        decoration: selectedDecoration.label,
        inscription: inscription || "None"
      }
    };

    onAddToCart(customCakeItem, 1, `Custom Cake: "${inscription || 'No text'}"`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="custom-cake" className="cake-builder-section">
      <div className="cake-builder-container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-badge badge-gold">
            <Sparkles size={14} /> BESPOKE CAKE STUDIO
          </span>
          <h2 className="section-title">Design Your Custom Celebration Cake</h2>
          <p className="section-subtitle">
            Craft a one-of-a-kind masterpiece for your special moments. Choose your size, gourmet sponge, artisanal filling, and fine decorative finishes.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="cake-studio-grid">
          {/* Controls Column */}
          <div className="studio-controls">
            {/* Step 1: Size & Tiers */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">1</span>
                <div>
                  <h3>Select Cake Size & Tiers</h3>
                  <p>Choose serving portion size</p>
                </div>
              </div>
              <div className="step-options-grid">
                {CAKE_BUILDER_OPTIONS.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`option-btn ${selectedSize.id === size.id ? "selected" : ""}`}
                  >
                    <div className="option-label">
                      <strong>{size.label}</strong>
                      <span className="option-cost">₹{size.basePrice}</span>
                    </div>
                    {selectedSize.id === size.id && <Check size={18} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sponge Flavor */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">2</span>
                <div>
                  <h3>Choose Sponge Layer Flavor</h3>
                  <p>Light chiffon and rich chocolate bases</p>
                </div>
              </div>
              <div className="step-options-grid">
                {CAKE_BUILDER_OPTIONS.sponges.map((sponge) => (
                  <button
                    key={sponge.id}
                    onClick={() => setSelectedSponge(sponge)}
                    className={`option-btn ${selectedSponge.id === sponge.id ? "selected" : ""}`}
                  >
                    <div className="option-label">
                      <strong>{sponge.label}</strong>
                      <span className="option-cost">{sponge.price > 0 ? `+₹${sponge.price}` : "Included"}</span>
                    </div>
                    {selectedSponge.id === sponge.id && <Check size={18} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Fillings & Frosting */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">3</span>
                <div>
                  <h3>Select Filling & Frosting</h3>
                  <p>Silky buttercream and artisanal compotes</p>
                </div>
              </div>
              <div className="step-options-grid">
                {CAKE_BUILDER_OPTIONS.fillings.map((filling) => (
                  <button
                    key={filling.id}
                    onClick={() => setSelectedFilling(filling)}
                    className={`option-btn ${selectedFilling.id === filling.id ? "selected" : ""}`}
                  >
                    <div className="option-label">
                      <strong>{filling.label}</strong>
                      <span className="option-cost">{filling.price > 0 ? `+₹${filling.price}` : "Included"}</span>
                    </div>
                    {selectedFilling.id === filling.id && <Check size={18} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Decorations & Inscription */}
            <div className="builder-step-card">
              <div className="step-header">
                <span className="step-num">4</span>
                <div>
                  <h3>Toppings & Inscription Message</h3>
                  <p>Floral crown, macarons, and custom text</p>
                </div>
              </div>
              <div className="step-options-grid">
                {CAKE_BUILDER_OPTIONS.decorations.map((deco) => (
                  <button
                    key={deco.id}
                    onClick={() => setSelectedDecoration(deco)}
                    className={`option-btn ${selectedDecoration.id === deco.id ? "selected" : ""}`}
                  >
                    <div className="option-label">
                      <strong>{deco.label}</strong>
                      <span className="option-cost">+₹{deco.price}</span>
                    </div>
                    {selectedDecoration.id === deco.id && <Check size={18} className="check-icon" />}
                  </button>
                ))}
              </div>

              <div className="inscription-box">
                <label htmlFor="inscription-input">Custom Cake Message / Name:</label>
                <input 
                  id="inscription-input"
                  type="text" 
                  placeholder="e.g. Happy 25th Birthday Anmol!" 
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  maxLength={40}
                  className="inscription-input"
                />
                <span className="char-count">{inscription.length}/40 chars</span>
              </div>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="studio-preview-card sticky-preview">
            <div className="preview-header">
              <span className="preview-tag">LIVE CREATION SUMMARY</span>
              <h3>Your Custom IamGroot Cake</h3>
            </div>

            <div className="preview-image-container">
              <img src="/images/cake.png" alt="Custom Cake Preview" className="preview-cake-img" />
              {inscription && (
                <div className="preview-inscription-banner">
                  <span>✍️ "{inscription}"</span>
                </div>
              )}
            </div>

            <div className="preview-details-list">
              <div className="detail-row">
                <span className="detail-key">Size & Tier:</span>
                <span className="detail-val">{selectedSize.label.split('(')[0]}</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Sponge Flavor:</span>
                <span className="detail-val">{selectedSponge.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Filling:</span>
                <span className="detail-val">{selectedFilling.label}</span>
              </div>
              <div className="detail-row">
                <span className="detail-key">Finish & Toppings:</span>
                <span className="detail-val">{selectedDecoration.label}</span>
              </div>
            </div>

            <div className="preview-price-total">
              <div>
                <span className="total-label">Total Estimated Price</span>
                <div className="total-price-val">₹{totalPrice}</div>
              </div>

              <button 
                onClick={handleAddCustomCake}
                className={`add-custom-cake-btn ${added ? "success" : ""}`}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added Custom Cake!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
