import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { createShortUrl, clearError } from '../store/slices/urlSlice'
import { addNotification } from '../store/slices/uiSlice'

const UrlForm = () => {
    const [url, setUrl] = useState("")
    const [customSlug, setCustomSlug] = useState("")
    const [showAdvanced, setShowAdvanced] = useState(false)

    const dispatch = useAppDispatch()
    const { recentUrl, loading, error } = useAppSelector(state => state.urls)
    const { isAuthenticated } = useAppSelector(state => state.auth)

    // Clear errors when component mounts
    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    // Handle error notifications
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(addNotification({
                type: 'error',
                message: error,
                duration: 5000
            }))
        }
    }, [error, dispatch])

    // Handle success notifications
    useEffect(() => {
        if (recentUrl) {
            toast.success('URL shortened successfully!')
            dispatch(addNotification({
                type: 'success',
                message: 'URL shortened successfully!',
                duration: 3000
            }))
        }
    }, [recentUrl, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!url.trim()) {
            toast.error('Please enter a URL')
            return
        }

        // Basic URL validation
        try {
            new URL(url)
        } catch {
            toast.error('Please enter a valid URL')
            return
        }

        dispatch(createShortUrl({
            url: url.trim(),
            customSlug: customSlug.trim() || undefined
        }))
    };
    const handleCopy = () => {
        const urlToCopy = recentUrl?.workingUrl || recentUrl?.shortUrl || recentUrl;
        if (urlToCopy) {
            navigator.clipboard.writeText(urlToCopy)
            toast.success('Copied to clipboard!')
        }
    }

    const handleReset = () => {
        setUrl("")
        setCustomSlug("")
        dispatch(clearError())
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Shorten Your URL
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Main URL Input */}
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your URL
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Advanced Options Toggle */}
                    {isAuthenticated && (
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium focus:outline-none"
                            >
                                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                            </button>
                        </div>
                    )}

                    {/* Custom Slug Input (Advanced) */}
                    {showAdvanced && isAuthenticated && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                </svg>
                                <label htmlFor="customSlug" className="block text-sm font-medium text-blue-800">
                                    🎯 Create Custom Short URL
                                </label>
                            </div>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-blue-300 bg-blue-100 text-blue-700 text-sm font-medium">
                                    short.ly/
                                </span>
                                <input
                                    type="text"
                                    id="customSlug"
                                    value={customSlug}
                                    onChange={(e) => {
                                        // Only allow alphanumeric characters and hyphens
                                        const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                                        setCustomSlug(value);
                                    }}
                                    placeholder="my-awesome-link"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 border border-blue-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 disabled:opacity-50"
                                    maxLength={50}
                                />
                            </div>
                            <div className="mt-2 space-y-1">
                                <p className="text-xs text-blue-700">
                                    💡 <strong>Pro tip:</strong> Create memorable, branded links like "short.ly/summer-sale" or "short.ly/contact-us"
                                </p>
                                <p className="text-xs text-blue-600">
                                    • Only letters, numbers, and hyphens allowed
                                    • Leave empty for auto-generated slug
                                    • Must be unique (we'll let you know if it's taken)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            disabled={loading || !url.trim()}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Shortening...
                                </div>
                            ) : (
                                'Shorten URL'
                            )}
                        </button>

                        {(url || customSlug) && (
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={loading}
                                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </form>

                {/* Result Display */}
                {recentUrl && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">
                            ✅ URL Shortened Successfully!
                        </h3>

                        <div className="space-y-3">
                            {/* Original URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Original URL:
                                </label>
                                <p className="text-sm text-gray-600 break-all bg-white p-2 rounded border">
                                    {recentUrl.originalUrl || url}
                                </p>
                            </div>

                            {/* Shortened URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Shortened URL:
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={recentUrl.displayUrl || recentUrl.shortUrl || recentUrl}
                                        className="flex-1 p-3 border border-gray-300 rounded-md bg-white text-blue-600 font-medium"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                                        title={`Copy: ${recentUrl.workingUrl || recentUrl.shortUrl || recentUrl}`}
                                    >
                                        Copy
                                    </button>
                                </div>

                                {/* Show working URL info */}
                                {recentUrl.displayUrl && recentUrl.workingUrl && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        💡 Displays as <strong>{recentUrl.displayUrl}</strong> but copies the working URL for testing
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Login Prompt for Non-Authenticated Users */}
                {!isAuthenticated && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            💡 <strong>Sign in</strong> to access advanced features like custom slugs, analytics, and URL management!
                        </p>
                    </div>
                )}
            </div>
            <Toaster position="top-right" />
        </div>
    )
}

export default UrlForm
