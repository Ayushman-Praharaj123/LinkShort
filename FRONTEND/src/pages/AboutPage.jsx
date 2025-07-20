import { Link } from '@tanstack/react-router'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">URL Shortener</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make the web more accessible by transforming long, complex URLs 
            into short, memorable links that are easy to share and track.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                In today's digital world, sharing links should be simple and effective. We believe 
                that every URL should be clean, trackable, and brandable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform empowers individuals and businesses to create professional, 
                memorable links that enhance their digital presence and provide valuable insights.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Simplifying Links</h3>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate short URLs instantly with our high-performance infrastructure. 
                No waiting, no delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track clicks, monitor performance, and gain insights into your link 
                engagement with comprehensive analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Branding</h3>
              <p className="text-gray-600">
                Create branded, memorable links that reflect your identity and 
                enhance your professional image.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Built with Modern Technology</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">R</span>
              </div>
              <h4 className="font-semibold text-gray-900">React</h4>
              <p className="text-sm text-gray-600">Modern UI Framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">N</span>
              </div>
              <h4 className="font-semibold text-gray-900">Node.js</h4>
              <p className="text-sm text-gray-600">Server Runtime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">M</span>
              </div>
              <h4 className="font-semibold text-gray-900">MongoDB</h4>
              <p className="text-sm text-gray-600">Database</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-yellow-600">E</span>
              </div>
              <h4 className="font-semibold text-gray-900">Express</h4>
              <p className="text-sm text-gray-600">Web Framework</p>
            </div>
          </div>
        </div>



        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their URL shortening needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Start Shortening
            </Link>
            <Link
              to="/auth"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
