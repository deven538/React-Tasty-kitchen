import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantHeader = props => {
  const {sortByOptions, selectedSortByValue, updateSelectedSortByValue} = props

  const onChangeSortBy = event => {
    updateSelectedSortByValue(event.target.value)
  }

  return (
    <div className="restaurant-header-container">
      <div className="restaurant-header">
        <h1 className="popular-restaurants">Popular Restaurants</h1>
      </div>
      <div className="description-sort-by-container">
        <p className="header-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-by-container">
          <BsFilterLeft className="sort-by-icon" />
          <p className="sort-by">Sort By {selectedSortByValue}</p>
          <select
            className="sort-by-select"
            value={selectedSortByValue}
            onChange={onChangeSortBy}
          >
            {sortByOptions.map(eachOption => (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
