import { useState } from 'react'
import UrlItem from './UrlItem'

const UrlList = ({ urls }) => {
  const [selectedUrls, setSelectedUrls] = useState([])

  const handleSelectAll = () => {
    if (selectedUrls.length === urls.length) {
      setSelectedUrls([])
    } else {
      setSelectedUrls(urls.map(url => url.id))
    }
  }

  const handleSelectUrl = (urlId) => {
    setSelectedUrls(prev => 
      prev.includes(urlId) 
        ? prev.filter(id => id !== urlId)
        : [...prev, urlId]
    )
  }

  const handleBulkDelete = () => {
    // TODO: Implement bulk delete functionality
    console.log('Bulk delete:', selectedUrls)
  }

  return (
    <div>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUrls.length === urls.length && urls.length > 0}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedUrls.length > 0 ? `${selectedUrls.length} selected` : 'Select all'}
              </span>
            </label>
          </div>

          {selectedUrls.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* URL Items */}
      <div className="divide-y divide-gray-200">
        {urls.map((url) => (
          <UrlItem
            key={url.id || url._id}
            url={url}
            isSelected={selectedUrls.includes(url.id || url._id)}
            onSelect={() => handleSelectUrl(url.id || url._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default UrlList
