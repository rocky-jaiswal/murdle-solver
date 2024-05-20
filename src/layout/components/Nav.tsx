import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import { ThemeTogglerButton } from '/@/components/ThemeTogglerButton'
import { dispatchForThemeStore } from '/@/store'

type Props = {}

const label = (link: string) => {
  const labels: Record<string, string> = {
    '/': 'Home',
    '/home': 'Home',
    '/about': 'About',
  }

  return labels[link] || ''
}

const buildLinks = (links: string[], pathname: string) => {
  return links.map((link, index) => {
    return (
      <li key={index}>
        <Link
          to={link}
          className={clsx(
            'flex-shrink-0 px-3 py-2 font-medium',
            pathname === link ? 'btn-ghost' : 'btn-link',
          )}
        >
          {label(link)}
        </Link>
      </li>
    )
  })
}

export const Nav: React.FC<Props> = () => {
  const { pathname } = useLocation()
  const links = ['/home', '/about']

  return (
    <nav className={clsx('navbar bg-base-100 shadow')}>
      <div className="flex-1">
        <Link to={'/home'} className="btn btn-ghost text-xl">
          Murdle-Solver
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {buildLinks(links, pathname)}
          <li>
            <details>
              <summary>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </summary>
              <ul>
                <li>
                  <ThemeTogglerButton
                    handleClick={() => dispatchForThemeStore({ type: 'CHANGE_THEME' })}
                  />
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  )
}
