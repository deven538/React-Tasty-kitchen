import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class Carousel extends Component {
  state = {isLoading: true, carouselImagesList: []}

  componentDidMount() {
    this.getCarouselImages()
  }

  getCarouselImages = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const updatedData = data.offers.map(eachCarousel => ({
      id: eachCarousel.id,
      imageUrl: eachCarousel.image_url,
    }))
    // console.log(updatedData)
    this.setState({isLoading: false, carouselImagesList: updatedData})
  }

  renderCarousel = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      pauseOnHover: true,
      focusOnSelect: true,
      appendDots: dots => (
        <div>
          <ul
            style={{
              marginTop: '-70px',
              color: 'white',
            }}
          >
            {dots}
          </ul>
        </div>
      ),
    }
    const {carouselImagesList} = this.state
    return (
      <Slider {...settings}>
        {carouselImagesList.map(eachImage => (
          <div className="home-carousel-item" key={eachImage.id}>
            <img
              src={eachImage.imageUrl}
              className="home-carousel-image"
              alt="restaurants-offers-loader"
            />
          </div>
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="home-carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={30} width={30} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarousel()
  }
}

export default Carousel
