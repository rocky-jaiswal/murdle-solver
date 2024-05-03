import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { AuthenticationContext } from '../Context/Authentication'

export const AuthenticatedPage: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props

  const authenticationContext = useContext(AuthenticationContext)
  const location = useLocation()

  // No auth on some pages
  if (
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/about'
  ) {
    return <>{children}</>
  }

  if (!authenticationContext.jsonToken) {
    // Redirect them to the / page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
