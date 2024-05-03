import { useContext } from 'react'

import { AuthenticationContext } from '../../Context/Authentication'

export const DummyAuthButton: React.FC = () => {
  const authenticationContext = useContext(AuthenticationContext)

  return (
    <button
      onClick={() => {
        authenticationContext.jsonToken
          ? authenticationContext.signOut()
          : authenticationContext.signIn()
      }}
      className="rounded-sm p-4"
    >
      <span>{authenticationContext.jsonToken ? 'Sign Out' : 'Sign In'}</span>
    </button>
  )
}
