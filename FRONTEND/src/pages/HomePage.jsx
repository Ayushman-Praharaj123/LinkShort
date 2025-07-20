import { useAppSelector } from '../store/hooks'
import UrlForm from '../components/UrlForm'
import { Link } from '@tanstack/react-router'

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const { stats } = useAppSelector(state => state.urls)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Shorten Your URLs
            <span className="text-blue-600"> Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create short, memorable links that are easy to share. Track clicks, manage your URLs, and boost your productivity.
          </p>

          {!isAuthenticated && (
            <div className="flex justify-center space-x-4 mb-8">
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
              >
                Get Started Free
              </Link>
              <Link
                to="/auth"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* URL Form Section */}
        <div className="mb-16">
          <UrlForm />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Generate short URLs instantly with our high-performance infrastructure.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600">
              Track clicks, monitor performance, and gain insights into your link engagement.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md border-2 border-yellow-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Custom URLs</h3>
            <p className="text-gray-600">
              Create branded, memorable links like <strong>short.ly/summer-sale</strong> or <strong>short.ly/contact-us</strong>
            </p>
            {!isAuthenticated && (
              <p className="text-xs text-yellow-600 mt-2 font-medium">
                ⭐ Sign up to unlock custom URLs!
              </p>
            )}
          </div>
        </div>

        {/* Custom URL Showcase */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 mb-16 border border-yellow-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Create <span className="text-yellow-600">Custom Branded</span> URLs
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Stand out with memorable, professional links that reflect your brand and are easy to remember.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-500">
                <div className="text-sm text-gray-500 mb-1">Instead of:</div>
                <div className="text-gray-800 font-mono text-sm">short.ly/A7xK9mP</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                <div className="text-sm text-gray-500 mb-1">Create:</div>
                <div className="text-green-700 font-mono text-sm font-semibold">short.ly/summer-sale</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Easy to remember and share
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional and branded
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Perfect for marketing campaigns
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Increase click-through rates
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="text-center mt-8">
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition duration-200 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                Sign Up to Create Custom URLs
              </Link>
            </div>
          )}
        </div>

        {/* Stats Section (for authenticated users) */}
        {isAuthenticated && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">Here's your URL shortening activity</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.totalUrls || 0}
                </div>
                <div className="text-sm text-gray-600">Total URLs Created</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {stats.totalClicks || 0}
                </div>
                <div className="text-sm text-gray-600">Total Clicks</div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200"
              >
                View Dashboard
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* How it Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paste Your URL</h3>
              <p className="text-gray-600">
                Enter the long URL you want to shorten in the input field above.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Short Link</h3>
              <p className="text-gray-600">
                Click "Shorten URL" and get your new short link instantly.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share & Track</h3>
              <p className="text-gray-600">
                Share your short link anywhere and track its performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
