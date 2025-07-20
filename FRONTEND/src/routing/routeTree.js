import RootLayout from '../RootLayout.jsx'
import { createRootRoute } from '@tanstack/react-router'
import { createAuthRoute } from './auth.route.jsx'
import { createDashboardRoute } from './dashboard.jsx'
import { createHomepageRoute } from './homepage.jsx'
import { createAboutRoute } from './about.jsx'

export const rootRoute = createRootRoute({
  component: RootLayout
})

// Create child routes
const authRoute = createAuthRoute(rootRoute)
const dashboardRoute = createDashboardRoute(rootRoute)
const homepageRoute = createHomepageRoute(rootRoute)
const aboutRoute = createAboutRoute(rootRoute)

export const routeTree = rootRoute.addChildren([authRoute, dashboardRoute, homepageRoute, aboutRoute]);
