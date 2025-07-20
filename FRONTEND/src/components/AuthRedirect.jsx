import { useEffect } from 'react'
import { useAppSelector } from '../store/hooks'
import { useNavigate } from '@tanstack/react-router'

const AuthRedirect = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate({ to: redirectTo })
    }
  }, [isAuthenticated, loading, navigate, redirectTo])

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600 text-lg">Loading...</span>
        </div>
      </div>
    )
  }


  if (isAuthenticated) {
    return null
  }

  return children
}

export default AuthRedirect
