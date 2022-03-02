import {withRouter, Link} from 'react-router-dom'
import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

import classes from './NavBar.Module.css'

const logoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'

const NavBar = () => (
  <div className={classes.NavBar}>
    <Link to="/" style={{textDecoration: 'none'}}>
      <div className={classes.LogoContainer}>
        <img src={logoUrl} alt="website logo" className={classes.LogoImage} />
        <h1 className={classes.MainHeading}>Tasty Kitchens</h1>
      </div>
    </Link>
    <Navigation />
    <MobileNavigation />
  </div>
)

export default withRouter(NavBar)
