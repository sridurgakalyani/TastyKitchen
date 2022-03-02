import {Link} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

import NotFoundClass from './NotFound.module.css'

const notFoundUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625830262/NotFound_kpncbm.png'
const NotFound = () => {
  /* const navigateToHome = () => {
    const {history} = props
    history.replace('/')
  } */

  console.log(null)
  return (
    <div className={NotFoundClass.BackgroundContainer}>
      <NavBar />
      <div className={NotFoundClass.NotFoundContainer}>
        <img src={notFoundUrl} alt="not found" />
        <h1 className={NotFoundClass.Heading}>Page Not Found</h1>
        <p className={NotFoundClass.Para}>
          we are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <Link to="/" style={{textDecoration: 'none'}}>
          <button type="button" className={NotFoundClass.Button}>
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
