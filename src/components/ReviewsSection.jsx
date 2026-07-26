import React, { useState } from "react";
import { REVIEWS } from "../data/bakeryData";
import { Star, MessageSquarePlus, Check, User } from "lucide-react";

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: name,
      role: "Verified Guest Reviewer",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d97706&color=fff`,
      rating: Number(rating),
      date: "Just now",
      comment: comment
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setName("");
      setComment("");
    }, 1500);
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">LOVED BY BAKERY ENTHUSIASTS</span>
          <h2 className="section-title">What Our Guests Say About IamGroot.in</h2>
          <p className="section-subtitle">
            Over 500+ verified 5-star reviews from sourdough sourdough lovers, coffee connoisseurs, and birthday cake celebrants.
          </p>
        </div>

        {/* Overall Score Badge Bar */}
        <div className="reviews-score-bar">
          <div className="score-main">
            <span className="big-rating-num">4.9</span>
            <div>
              <div className="stars-row">★★★★★</div>
              <span className="score-subtext">Based on 520+ local reviews</span>
            </div>
          </div>

          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="write-review-btn"
          >
            <MessageSquarePlus size={18} />
            <span>{showReviewForm ? "Close Form" : "Write a Review"}</span>
          </button>
        </div>

        {/* Review Submission Form Modal / Inline */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="review-form-card animate-slideDown">
            <h3>Share Your IamGroot Experience</h3>
            
            <div className="form-row-grid">
              <div className="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Rating (1 to 5 Stars) *</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(e.target.value)}
                  className="form-input"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Exceptional)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Your Review Comment *</label>
              <textarea 
                required 
                rows={3} 
                placeholder="Tell us what you loved about your sourdough loaf, croissants, coffee, or custom cake!"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-input"
              ></textarea>
            </div>

            <button type="submit" className="submit-review-btn">
              {submitted ? (
                <>
                  <Check size={18} />
                  <span>Review Published!</span>
                </>
              ) : (
                <span>Submit Guest Review</span>
              )}
            </button>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="review-card animate-fadeIn">
              <div className="review-card-header">
                <img src={rev.avatar} alt={rev.author} className="review-avatar" />
                <div>
                  <h4 className="reviewer-name">{rev.author}</h4>
                  <span className="reviewer-role">{rev.role}</span>
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <div className="review-card-stars">
                {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
              </div>

              <p className="review-comment">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
