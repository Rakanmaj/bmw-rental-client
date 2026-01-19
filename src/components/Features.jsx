import '../styles/features.css'

function Features() {
  return (
    <section className="features">

      <div className="features-header">
        <span className="section-sub">WHY CHOOSE US</span>
        <h2>The BMW Rental Difference</h2>
        <p className="features-intro">We don't just rent cars—we deliver exceptional experiences with every drive.</p>
      </div>

      <div className="feature-grid">

        <div className="feature">
        <span className="feature-accent" />
          <div className="feature-icon">🔒</div>
          <h4>Full Insurance Coverage</h4>
          <p>Drive with confidence knowing you're fully protected with our comprehensive insurance package.</p>
        </div>

        <div className="feature">
            <span className="feature-accent" />
          <div className="feature-icon">⏱️</div>
          <h4>Flexible Rentals</h4>
          <p>From hourly to monthly rentals, we offer flexible booking options to suit your needs.</p>
        </div>

        <div className="feature">
            <span className="feature-accent" />
          <div className="feature-icon">🎧</div>
          <h4>24/7 Support</h4>
          <p>Our dedicated team is available around the clock to assist you with any questions.</p>
        </div>

        <div className="feature">
            <span className="feature-accent" />
          <div className="feature-icon">🏅</div>
          <h4>Premium Quality</h4>
          <p>Every BMW in our fleet is meticulously maintained to ensure peak performance.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;
