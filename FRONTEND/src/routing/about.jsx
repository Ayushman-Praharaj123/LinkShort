import { createRoute } from '@tanstack/react-router'
import AboutPage from '../pages/AboutPage.jsx'

export const createAboutRoute = (rootRoute) => createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})
