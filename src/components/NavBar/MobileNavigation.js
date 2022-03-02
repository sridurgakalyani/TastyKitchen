import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useState} from 'react'
// import {motion} from 'framer-motion'
import classes from './NavBar.Module.css'
import NavLinks from './NavLinks'

const MobileNavigation = () => {
  const [open, setOpen] = useState(false)

  const hamburgerIcon = (
    <GiHamburgerMenu
      className={classes.Hamburger}
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )
  const closeIcon = (
    <AiOutlineCloseCircle
      className={classes.Hamburger}
      size="35px"
      onClick={() => setOpen(!open)}
    />
  )

  const closeMobileMenu = () => setOpen(false)
  return (
    <nav className={classes.MobileNavigation}>
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks isMobile="true" closeMobileMenu={closeMobileMenu} />}
    </nav>
  )
}
export default MobileNavigation
