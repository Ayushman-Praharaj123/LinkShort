import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchUserUrls } from '../store/slices/urlSlice'
import { useNavigate } from '@tanstack/react-router'
import UrlList from '../components/UrlList'
import StatsCards from '../components/StatsCards'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const { urls, loading, stats } = useAppSelector(state => state.urls)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [filterBy, setFilterBy] = useState('all')

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/auth' })
    }
  }, [isAuthenticated, navigate])

  // Fetch user URLs on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserUrls())
    }
  }, [dispatch, isAuthenticated])

  // Filter and sort URLs
  const filteredUrls = urls.filter(url => {
    const matchesSearch = url.originalUrl?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         url.shortUrl?.toLowerCase().includes(searchQuery.toLowerCase())

    if (filterBy === 'all') return matchesSearch
    if (filterBy === 'active') return matchesSearch && url.isActive !== false
    if (filterBy === 'inactive') return matchesSearch && url.isActive === false

    return matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    }
    if (sortBy === 'clicks') {
      return (b.clicks || 0) - (a.clicks || 0)
    }
    if (sortBy === 'alphabetical') {
      return (a.originalUrl || '').localeCompare(b.originalUrl || '')
    }
    return 0
  })

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your shortened URLs and track their performance
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search URLs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters and Sort */}
            <div className="flex space-x-4">
              {/* Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All URLs</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="createdAt">Newest First</option>
                <option value="clicks">Most Clicks</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* URL List */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-600">Loading your URLs...</span>
              </div>
            </div>
          ) : filteredUrls.length === 0 ? (
            <div className="text-center py-12">
              {urls.length === 0 ? (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No URLs yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first short URL.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => navigate({ to: '/' })}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create URL
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500">No URLs match your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setFilterBy('all')
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <UrlList urls={filteredUrls} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
