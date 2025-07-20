import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user, loading } = useAppSelector(state => state.auth);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate({ to: '/auth' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-800">LinkShort</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                            Home
                        </Link>

                        {isAuthenticated && (
                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                            >
                                Dashboard
                            </Link>
                        )}

                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                        >
                            About
                        </Link>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                {/* User Info */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-medium text-sm">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">
                                        {user?.name || 'User'}
                                    </span>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging out...
                                        </div>
                                    ) : (
                                        'Logout'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/auth"
                                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/auth"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>

                            {isAuthenticated && (
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}

                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>

                            {/* Mobile User Actions */}
                            <div className="pt-4 border-t border-gray-200">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center px-3 py-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-blue-600 font-medium text-sm">
                                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium">{user?.name || 'User'}</p>
                                                <p className="text-gray-500 text-sm">{user?.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            disabled={loading}
                                            className="w-full text-left text-red-600 hover:text-red-700 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                                        >
                                            {loading ? 'Logging out...' : 'Logout'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            to="/auth"
                                            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/auth"
                                            className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;