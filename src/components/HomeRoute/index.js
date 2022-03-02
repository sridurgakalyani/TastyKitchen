import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'

import Slider from 'react-slick'

import NavBar from '../NavBar/NavBar'
import ListItem from '../AllRestaurantsListItem'
import Counter from '../Counter/index'
import Footer from '../Footer'

import classes from './Home.module.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const limit = 9

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

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    carouselData: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    allRestaurants: [],
    searchInput: '',
    loadFooter: false,
  }

  // component did Mount method

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getCarouselData()
    this.getAllRestaurantsData()
  }

  // convert snake case to camel case

  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  // making api call to get carousel data

  getCarouselData = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.success,
        carouselData: data.offers,
      })
    }
  }

  // fetch the active page using prop function

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  // making api call to get all restaurants data

  getAllRestaurantsData = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {selectedSortByValue, activePage, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    // console.log(offset)

    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    // console.log(response.status)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(response)
      const {restaurants} = data
      // console.log(restaurants)
      const convertedRestaurants = restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      // console.log(convertedRestaurants)
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        allRestaurants: convertedRestaurants,
        loadFooter: true,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  // displaying carousel images using react slick

  displayCarouselImages = () => {
    const {carouselData} = this.state
    //  console.log(carouselData)

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className={classes.SliderContainer}>
        <Slider {...settings}>
          {carouselData.map(each => (
            <img
              src={each.image_url}
              alt="offer"
              key="carousel-image"
              className={classes.CarouselImage}
            />
          ))}
        </Slider>
      </div>
    )
  }

  // carousel loader

  carouselDisplayLoading = () => (
    <div className={classes.Loader} testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // restaurants loader

  restaurantsDisplayLoading = () => (
    <div className={classes.Loader} testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // onchange event function for change the sort value in the state

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  // on search restaurant results

  onSearchRestaurant = event => {
    this.setState({searchInput: event.target.value}, this.getAllRestaurantsData)
  }

  // rendering the popular restaurant and sort options in html

  popularRestaurantsView = () => {
    const {selectedSortByValue} = this.state
    // console.log(selectedSortValue)
    return (
      <>
        <div className={classes.popularRestaurantsContainer}>
          <div className={classes.HeadingContainer}>
            <h1 className={classes.MainHeading}>Popular Restaurants</h1>
            <p className={classes.MainParagraph}>
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className={classes.SearchInputContainer}>
            <label className={classes.SearchLabel} htmlFor="searchInput">
              Search The Restaurant
            </label>
            <input
              type="search"
              id="searchInput"
              className={classes.SearchElement}
              onChange={this.onSearchRestaurant}
              placeholder="Search Restaurant Here.."
            />
          </div>

          <div className={classes.FilterContainer}>
            <BsFilterLeft className={classes.FilterLogo} />
            <p className={classes.SortLabel}>Sort By</p>
            <select
              id="sortBy"
              onChange={this.changeTheSortByOptionValue}
              value={selectedSortByValue}
              className={classes.SelectElement}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <hr />
      </>
    )
  }

  // rendering the all restaurants in html view

  renderRestaurantsView = () => {
    const {allRestaurants, showNoRes} = this.state
    // console.log(allRestaurants)
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <ul className={classes.RestaurantList}>
            {allRestaurants.map(each => (
              <ListItem key={each.id} item={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  // render on search no restaurants view

  noRestaurantsView = () => (
    <div className={classes.NoResContainer}>
      <p className={classes.NoResPara}>No Restaurants Found!</p>
    </div>
  )

  // rendering the loader and carousel html elements using switch condition based on api status

  onRenderDisplayCarousel = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.displayCarouselImages()

      case carouselApiStatusConstants.inProgress:
        return this.carouselDisplayLoading()

      default:
        return null
    }
  }

  // rendering the loader and restaurants html elements using switch condition based on api status

  onRenderDisplayRestaurants = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantsView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return this.noRestaurantsView()
      default:
        return null
    }
  }

  // rendering the home route in  render method

  render() {
    const {loadFooter} = this.state
    return (
      <>
        <div className={classes.HomeContainer}>
          <NavBar />
          <div className={classes.MainContainer}>
            {this.onRenderDisplayCarousel()}
            {this.popularRestaurantsView()}
            {this.onRenderDisplayRestaurants()}
            <Counter pageChangeFunction={this.getActivePage} />
          </div>
          {loadFooter && <Footer />}
        </div>
      </>
    )
  }
}

export default HomeRoute
