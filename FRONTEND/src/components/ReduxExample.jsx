import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, logoutUser } from '../store/slices/authSlice';
import { createShortUrl } from '../store/slices/urlSlice';
import { addNotification, setTheme } from '../store/slices/uiSlice';

const ReduxExample = () => {
  const dispatch = useAppDispatch();
  
  // Select data from store
  const { user, isAuthenticated, loading: authLoading } = useAppSelector(state => state.auth);
  const { urls, recentUrl, loading: urlLoading } = useAppSelector(state => state.urls);
  const { notifications, theme } = useAppSelector(state => state.ui);

  // Example handlers
  const handleLogin = () => {
    dispatch(loginUser({ email: 'test@example.com', password: 'password' }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCreateUrl = () => {
    dispatch(createShortUrl({ url: 'https://example.com' }));
  };

  const handleShowNotification = () => {
    dispatch(addNotification({
      type: 'success',
      message: 'This is a Redux notification!',
      duration: 3000
    }));
  };

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Redux Integration Example</h2>
      
      {/* Auth State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Authentication State</h3>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>User: {user?.name || 'None'}</p>
        <p>Loading: {authLoading ? 'Yes' : 'No'}</p>
        
        <div className="mt-3 space-x-2">
          <button 
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={authLoading}
          >
            Login
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={authLoading}
          >
            Logout
          </button>
        </div>
      </div>

      {/* URL State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">URL State</h3>
        <p>Total URLs: {urls.length}</p>
        <p>Recent URL: {recentUrl?.shortUrl || 'None'}</p>
        <p>Loading: {urlLoading ? 'Yes' : 'No'}</p>
        
        <button 
          onClick={handleCreateUrl}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={urlLoading}
        >
          Create Short URL
        </button>
      </div>

      {/* UI State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">UI State</h3>
        <p>Theme: {theme}</p>
        <p>Notifications: {notifications.length}</p>
        
        <div className="mt-3 space-x-2">
          <button 
            onClick={handleToggleTheme}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Toggle Theme
          </button>
          <button 
            onClick={handleShowNotification}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Show Notification
          </button>
        </div>
      </div>

      {/* Notifications Display */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Active Notifications:</h3>
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-3 rounded ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' :
                notification.type === 'error' ? 'bg-red-100 text-red-800' :
                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReduxExample;
