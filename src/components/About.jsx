import "../styles/about.css";

function About() {
  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <span className="about-tag">ABOUT US</span>
        <h1>
          About <span>BMW Rental</span>
        </h1>
        <p>
          For over 15 years, we’ve been delivering the ultimate BMW driving
          experience. Our passion for performance, precision, and luxury
          defines everything we do.
        </p>
      </div>

      {/* STATS */}
      <div className="about-stats">
        <div>
          <h2>15+</h2>
          <span>Years of Excellence</span>
        </div>
        <div>
          <h2>50+</h2>
          <span>BMW Models</span>
        </div>
        <div>
          <h2>10K+</h2>
          <span>Happy Customers</span>
        </div>
        <div>
          <h2>24/7</h2>
          <span>Customer Support</span>
        </div>
      </div>

      {/* STORY */}
      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          BMW Rental was born from a simple belief: everyone deserves to
          experience the thrill of driving a BMW.
        </p>
        <p>
          Founded in Amman — the birthplace of BMW — we set out to create a
          premium rental service that embodies the same standards of
          excellence, innovation, and performance that BMW represents.
        </p>
        <p>
          What started as a small fleet of three vehicles has grown into a
          BMW-exclusive rental service trusted by thousands of customers
          worldwide.
        </p>
      </div>

      {/* VALUES */}
      <div className="about-section">
        <h2>Our Values</h2>

        <div className="values-grid">
          <div className="value-card">
            <h3>Trust & Safety</h3>
            <p>
              Every vehicle is meticulously maintained and fully insured for
              your peace of mind.
            </p>
          </div>

          <div className="value-card">
            <h3>Premium Quality</h3>
            <p>
              Only the finest BMW models, kept in pristine condition for an
              exceptional experience.
            </p>
          </div>

          <div className="value-card">
            <h3>Customer First</h3>
            <p>
              Personalized service tailored to your needs — because you
              deserve the best.
            </p>
          </div>

          <div className="value-card">
            <h3>Flexibility</h3>
            <p>
              Easy booking and flexible pickup & drop-off options that fit
              your schedule.
            </p>
          </div>

          <div className="value-card">
            <h3>Passion for BMW</h3>
            <p>
              We are BMW enthusiasts dedicated to sharing the ultimate driving
              experience.
            </p>
          </div>

          <div className="value-card">
            <h3>Latest Fleet</h3>
            <p>
              Our fleet is constantly updated with the newest BMW innovations
              and technologies.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default About;
