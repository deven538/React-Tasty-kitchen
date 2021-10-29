import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-heading-container">
      <img
        src="https://res.cloudinary.com/dvhmxwjp7/image/upload/v1633443853/footer-website-logo.png"
        alt="website-footer-logo"
        className="footer-website-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>

    <p className="footer-description">
      The only thing we are serious about is food.
      <br />
      Contact us on
    </p>

    <div className="footer-social-media-icons">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="pintrest-social-icon"
      />

      <FaInstagram
        testid="instagram-social-icon"
        className="instagram-social-icon"
      />

      <FaTwitter testid="twitter-social-icon" className="twitter-social-icon" />

      <FaFacebookSquare
        testid="facebook-social-icon"
        className="facebook-social-icon"
      />
    </div>
  </div>
)
export default Footer
