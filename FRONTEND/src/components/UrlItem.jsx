import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { deleteUrl } from '../store/slices/urlSlice'
import toast from 'react-hot-toast'

const UrlItem = ({ url, isSelected, onSelect }) => {
  const [showActions, setShowActions] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const dispatch = useAppDispatch()

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      setIsDeleting(true)
      try {
        await dispatch(deleteUrl(url.id || url._id)).unwrap()
        toast.success('URL deleted successfully')
      } catch (err) {
        toast.error('Failed to delete URL')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (isActive) => {
    return isActive !== false ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
  }

  return (
    <div 
      className={`px-6 py-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Checkbox and URL info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onSelect}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </label>

          <div className="flex-1 min-w-0">
            {/* Original URL */}
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {url.originalUrl || url.full_url || 'Unknown URL'}
              </p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(url.isActive)}`}>
                {url.isActive !== false ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Short URL */}
            <div className="flex items-center space-x-2">
              <a
                href={url.shortUrl || url.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {url.shortUrl || url.short_url || 'No short URL'}
              </a>
              <button
                onClick={() => handleCopy(url.shortUrl || url.short_url)}
                className="text-gray-400 hover:text-gray-600"
                title="Copy short URL"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            {/* Meta info */}
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>Created: {formatDate(url.createdAt || url.created_at)}</span>
              <span>•</span>
              <span>Clicks: {url.clicks || 0}</span>
              {url.customSlug && (
                <>
                  <span>•</span>
                  <span>Custom slug</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className={`flex items-center space-x-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          {/* Analytics button */}
          <button
            className="p-2 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50"
            title="View analytics"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>

          {/* Edit button */}
          <button
            className="p-2 text-gray-400 hover:text-yellow-600 rounded-md hover:bg-yellow-50"
            title="Edit URL"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50"
            title="Delete URL"
          >
            {isDeleting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UrlItem
