import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djbwslukn/image/upload/v1633408338/Layer_1_hac9wc.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button className="not-found-home-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
    <Footer />
  </>
)

export default NotFound
