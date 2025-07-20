import { createRoute } from '@tanstack/react-router'
import HomePage from '../pages/HomePage.jsx'

export const createHomepageRoute = (rootRoute) => createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})
