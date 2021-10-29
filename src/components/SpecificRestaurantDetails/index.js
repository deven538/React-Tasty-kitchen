import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class SpecificRestaurantDetails extends Component {
  state = {
    restaurantDetailsData: {},
    foodItemList: [],
    isLoading: true,
    cartList: getCartListFromLocalStorage(),
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedRestaurantData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodItems = data.food_items.map(eachFoodItem => ({
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        id: eachFoodItem.id,
        imageUrl: eachFoodItem.image_url,
        name: eachFoodItem.name,
        rating: eachFoodItem.rating,
      }))
      this.setState({
        restaurantDetailsData: updatedRestaurantData,
        foodItemList: updatedFoodItems,
        isLoading: false,
      })
    }
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
    )
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = foodItem.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurants-details-loader"
    >
      <Loader
        type="TailRestaurantDetailsSpin"
        color="#F7931E"
        height={50}
        width={50}
      />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantDetailsData, foodItemList, cartList} = this.state
    // console.log(cartList)
    localStorage.setItem('cartData', JSON.stringify(cartList))
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantDetailsData
    return (
      <>
        <div className="restaurant-details-container">
          <div className="restaurant-details-view">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-detail-image"
            />
            <div>
              <h1 className="restaurant-details-heading">{name}</h1>
              <p className="restaurant-details-cuisine">{cuisine}</p>
              <p className="restaurant-details-location">{location}</p>
              <div className="restaurant-details-rating-price-container">
                <div>
                  <p className="restaurant-details-ratings">
                    <FaStar className="restaurant-details-rating-star" />
                    {rating}
                  </p>
                  <p className="restaurant-details-ratings-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <hr className="restaurant-details-vertical-line" />
                <div>
                  <p className="restaurant-details-cost">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="restaurant-details-cost-for-two">
                    Cost for two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-food-items-container">
          <ul className="food-item-list">
            {foodItemList.map(eachFoodItem => (
              <FoodItem
                foodItemDetails={eachFoodItem}
                key={eachFoodItem.id}
                addCartItem={this.addCartItem}
                deleteCartItem={this.deleteCartItem}
                cartList={cartList}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header isCartActive="false" isHomeActive="true" />
        {isLoading ? this.renderLoadingView() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}
export default SpecificRestaurantDetails
