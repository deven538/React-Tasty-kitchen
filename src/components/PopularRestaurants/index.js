import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import RestaurantHeader from '../RestaurantHeader'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class PopularRestaurents extends Component {
  state = {
    isLoading: false,
    restaurentsList: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    // searchInput: '',
  }

  componentDidMount() {
    this.getRestaurents()
  }

  getRestaurents = async () => {
    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')
    const {selectedSortByValue, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      //  console.log(fetchedData)
      const updatedData = fetchedData.restaurants.map(eachRestaurants => ({
        costForTwo: eachRestaurants.cost_for_two,
        cuisine: eachRestaurants.cuisine,
        groupByTime: eachRestaurants.group_by_time,
        hasOnlineDelivery: eachRestaurants.has_online_delivery,
        hasTableBooking: eachRestaurants.has_table_booking,
        id: eachRestaurants.id,
        imageUrl: eachRestaurants.image_url,
        isDeliveringNow: eachRestaurants.is_delivering_now,
        location: eachRestaurants.location,
        menuType: eachRestaurants.menu_type,
        name: eachRestaurants.name,
        opensAt: eachRestaurants.opens_at,
        userRating: eachRestaurants.user_rating,
      }))
      // const pages = Math.ceil(fetchedData.total / 9)

      this.setState({
        restaurentsList: updatedData,
        isLoading: false,
      })
    }
  }

  updateSelectedSortByValue = selectedSortByValue => {
    this.setState({selectedSortByValue}, this.getRestaurents)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurents,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage} = this.state
    if (activePage <= 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurents,
      )
    }
  }

  renderRestaurants = () => {
    const {
      selectedSortByValue,
      activePage,
      restaurentsList,
      // searchInput,
    } = this.state

    /* const updatedList = restaurantList.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    ) */
    return (
      <>
        <RestaurantHeader
          sortByOptions={sortByOptions}
          selectedSortByValue={selectedSortByValue}
          updateSelectedSortByValue={this.updateSelectedSortByValue}
          onChangeSearchInput={this.onChangeSearchInput}
        />
        <hr className="line" />
        {restaurentsList.length === 0 ? (
          <div className="no-restaurants-container">
            <h1 className="no-res-heading">No Restaurants Found</h1>
          </div>
        ) : (
          <ul className="restaurants-list">
            {restaurentsList.map(restaurant => (
              <RestaurantCard restaurantData={restaurant} key={restaurant.id} />
            ))}
          </ul>
        )}
        <div className="pagination">
          <button
            testid="pagination-left-button"
            className="button"
            type="button"
            onClick={this.onClickLeftArrow}
          >
            <RiArrowDropLeftLine className="arrow" />
          </button>
          <h1 testid="active-page-number" className="page-numbers">
            {activePage}
          </h1>
          <button
            testid="pagination-right-button"
            className="button"
            type="button"
            onClick={this.onClickRightArrow}
          >
            <RiArrowDropRightLine className="arrow" />
          </button>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderRestaurants()
  }
}

export default PopularRestaurents
