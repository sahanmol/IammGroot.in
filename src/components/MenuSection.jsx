import React, { useState } from "react";
import { CATEGORIES, MENU_ITEMS } from "../data/bakeryData";
import { Search, Sparkles, Star, Plus, Eye, Wheat, Cookie, Cake, Coffee, Leaf, Filter } from "lucide-react";
import ProductModal from "./ProductModal";

const ICON_MAP = {
  Sparkles: Sparkles,
  Wheat: Wheat,
  Cookie: Cookie,
  Cake: Cake,
  Coffee: Coffee,
  Leaf: Leaf,
};

export default function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filtering & Sorting Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "popular") return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">FRESH FROM THE OVEN</span>
          <h2 className="section-title">Explore Our Artisan Delights</h2>
          <p className="section-subtitle">
            Every item is baked in small daily batches using organic ingredients, 100% Normandy butter, and wild sourdough cultures.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="menu-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search sourdough, croissant, tart, espresso..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="clear-search-btn">✕</button>
            )}
          </div>

          <div className="sort-box">
            <Filter size={16} />
            <span>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Sparkles;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
              >
                <IconComponent size={18} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="no-items-state">
            <span className="no-items-icon">🥖</span>
            <h3>No baking items found</h3>
            <p>Try searching for a different keyword or browse all categories.</p>
            <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="reset-filter-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="menu-items-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="food-card animate-fadeIn">
                {/* Image & Quick Actions */}
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.name} className="food-card-img" />
                  
                  <div className="card-badges">
                    {item.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="card-tag-badge">{tag}</span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProduct(item)}
                    className="card-quickview-btn"
                    title="Quick View Details"
                  >
                    <Eye size={16} /> Quick View
                  </button>
                </div>

                {/* Content */}
                <div className="food-card-content">
                  <div className="card-rating">
                    <Star size={14} className="star-fill" />
                    <strong>{item.rating}</strong>
                    <span>({item.reviewsCount})</span>
                  </div>

                  <h3 className="food-card-title">{item.name}</h3>
                  <p className="food-card-desc">{item.description}</p>

                  <div className="food-card-footer">
                    <div className="price-tag">
                      <span className="currency">₹</span>
                      <span className="amount">{item.price}</span>
                    </div>

                    <button 
                      onClick={() => onAddToCart(item, 1)}
                      className="card-add-btn"
                      aria-label={`Add ${item.name} to order`}
                    >
                      <Plus size={16} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          item={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
