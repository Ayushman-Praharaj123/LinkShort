import { createRoute } from '@tanstack/react-router'
import AuthPage from '../pages/AuthPage.jsx'
import AuthRedirect from '../components/AuthRedirect.jsx'

const ProtectedAuthPage = () => (
  <AuthRedirect>
    <AuthPage />
  </AuthRedirect>
)

export const createAuthRoute = (rootRoute) => createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: ProtectedAuthPage
})
