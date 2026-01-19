import mb from "/assets/MB.png";
import "../styles/hero.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Hero() {
  
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section className="hero">
        
        <div className="hero-text">
          <span className="tag">Premium BMW Fleet Available</span>

          <h1>
            The Ultimate <br />
            <span className="blue">Driving Experience</span>
          </h1>

          <p>
            Rent the BMW of your dreams. From the iconic M3 to the luxurious
            7 Series, experience German engineering at its finest.
          </p>

          <div className="hero-buttons">
           
            <Link to="/cars" className="primary">
              Explore Fleet
            </Link>

           
            <button className="ghost" onClick={() => setShowVideo(true)}>
              Watch Video
            </button>
          </div>

          {/* STATS */}
          <div className="stats">
            <div>
              <h3>50+</h3>
              <p>BMW Models</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>Happy Clients</p>
            </div>

            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>

        
        <div className="hero-img">
          <img src={mb} alt="BMW" loading="lazy" />

         
          <div className="badge">
            <div className="avatar">M</div>
            <div className="badge-text">
              <strong>BMW M5 (G30)</strong>
              <small>From $299/day</small>
            </div>
          </div>
        </div>
      </section>

     
      {showVideo && (
        <div className="video-overlay" onClick={() => setShowVideo(false)}>
          <div
            className="video-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
  src="https://www.youtube.com/embed/JIVp3erJDMo?autoplay=1&vq=hd2160&rel=0&modestbranding=1"
  title="BMW Experience"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
/>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
