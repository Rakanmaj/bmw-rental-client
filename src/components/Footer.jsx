import '../styles/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col footer-brand">
          <div className="logo">B</div>
          <h3>BMW Rental</h3>
          <p>Experience the ultimate driving pleasure with our exclusive BMW fleet.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Fleet</a></li>
            <li><a href="#">My Reservations</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Fleet</h4>
          <ul>
            <li><a href="#">Sedans &amp; Coupes</a></li>
            <li><a href="#">SUVs</a></li>
            <li><a href="#">Convertibles</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li><a href="tel:+1888BMWRENT">+1 (888) BMW-RENT</a></li>
            <li><a href="mailto:book@bmwrental.com">book@bmwrental.com</a></li>
            <li>Amman, Jordan</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="divider" />
        <p>© 2025 BMW Rental. All rights reserved. The Ultimate Driving Experience.</p>
      </div>
    </footer>
  );
}

export default Footer;
