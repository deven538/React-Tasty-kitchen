import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Payment = () => (
  <>
    <Header isCartActive="true" isHomeActive="false" />
    <div className="payment-container">
      <img
        src="https://res.cloudinary.com/djbwslukn/image/upload/v1635233529/Vector_d5sf6a.png"
        alt="success"
        className="payment-success-image"
      />
      <h1 className="payment-heading">Payment Successful</h1>
      <p className="payment-description">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button className="payment-go-to-home-button" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)

export default Payment
