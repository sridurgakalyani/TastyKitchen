import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import classes from './AllRestaurantsListItem.module.css'

const ListItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className={classes.ListItem}>
        <img
          src={imageUrl}
          alt="restaurant"
          className={classes.RestaurantImage}
        />
        <div className={classes.RestaurantDetails}>
          <h1 className={classes.Name}>{name}</h1>
          <p className={classes.Cuisine}>{cuisine}</p>
          <div className={classes.RatingsContainer}>
            <FaStar size="13px" color="#FFCC00" />
            <p className={classes.Rating}>{rating}</p>
            <p className={classes.Reviews}>({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
