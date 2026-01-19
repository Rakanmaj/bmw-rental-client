import "../styles/footer.css";
import "../styles/icons.css";

import {
  FaHome,
  FaCar,
  FaClipboardList,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* BRAND */}
        <div className="footer-col footer-brand">
          <div className="logo">B</div>
          <h3>BMW Rental</h3>
          <p>
            Experience the ultimate driving pleasure with our exclusive BMW
            fleet.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">
                <FaHome className="icon" /> Home
              </a>
            </li>
            <li>
              <a href="#">
                <FaCar className="icon" /> Our Fleet
              </a>
            </li>
            <li>
              <a href="#">
                <FaClipboardList className="icon" /> My Reservations
              </a>
            </li>
          </ul>
        </div>

        {/* FLEET */}
        <div className="footer-col">
          <h4>Our Fleet</h4>
          <ul>
            <li>
              <a href="#">
                <FaCar className="icon" /> Sedans &amp; Coupes
              </a>
            </li>
            <li>
              <a href="#">
                <FaCar className="icon" /> SUVs
              </a>
            </li>
            <li>
              <a href="#">
                <FaCar className="icon" /> Convertibles
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <FaPhoneAlt className="icon" />
              <a href="tel:+1888BMWRENT">+1 (888) BMW-RENT</a>
            </li>

            <li>
              <FaEnvelope className="icon" />
              <a href="mailto:book@bmwrental.com">book@bmwrental.com</a>
            </li>

            <li>
              <FaMapMarkerAlt className="icon" />
              Amman, Jordan
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <div className="divider" />
        <p>
          © 2025 BMW Rental. All rights reserved. The Ultimate Driving Experience.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
