import { createRoute } from '@tanstack/react-router'
import Dashboard from '../pages/Dashboard.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const ProtectedDashboard = () => (
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
)

export const createDashboardRoute = (rootRoute) => createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: ProtectedDashboard,
})
