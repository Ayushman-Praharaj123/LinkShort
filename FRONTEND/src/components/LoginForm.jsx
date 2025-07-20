import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector(state => state.auth);

    
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    
    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/' });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return;
        }

        if (!formData.email.includes('@')) {
            return;
        }

        try {
            await dispatch(loginUser({
                email: formData.email,
                password: formData.password
            })).unwrap();

           
            setFormData({ email: '', password: '' });
        } catch (err) {
            
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        disabled={loading}
                        required
                    />
                </div>

                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            disabled={loading}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            disabled={loading}
                        >
                            {showPassword ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

               
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing in...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>

          
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium focus:outline-none focus:underline"
                        disabled={loading}
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;