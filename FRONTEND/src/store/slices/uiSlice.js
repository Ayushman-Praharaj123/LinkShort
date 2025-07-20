import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Navigation state
  activeTab: 'home',
  sidebarOpen: false,
  
  // Modal states
  showUrlModal: false,
  showDeleteModal: false,
  showEditModal: false,
  
  // Loading states
  pageLoading: false,
  
  // Toast/notification state
  notifications: [],
  
  // Theme
  theme: 'light',
  
  // Form states
  urlFormData: {
    url: '',
    customSlug: '',
    description: '',
  },
  
  // Selected items
  selectedUrls: [],
  
  // Filters and search
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  filterBy: 'all', // all, active, expired
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Navigation actions
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Modal actions
    showModal: (state, action) => {
      const modalType = action.payload;
      state[`show${modalType}Modal`] = true;
    },
    hideModal: (state, action) => {
      const modalType = action.payload;
      state[`show${modalType}Modal`] = false;
    },
    hideAllModals: (state) => {
      state.showUrlModal = false;
      state.showDeleteModal = false;
      state.showEditModal = false;
    },
    
    // Loading actions
    setPageLoading: (state, action) => {
      state.pageLoading = action.payload;
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: 'info', // info, success, warning, error
        message: '',
        duration: 5000,
        ...action.payload,
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    
    // Form actions
    setUrlFormData: (state, action) => {
      state.urlFormData = { ...state.urlFormData, ...action.payload };
    },
    resetUrlFormData: (state) => {
      state.urlFormData = {
        url: '',
        customSlug: '',
        description: '',
      };
    },
    
    // Selection actions
    selectUrl: (state, action) => {
      const urlId = action.payload;
      if (!state.selectedUrls.includes(urlId)) {
        state.selectedUrls.push(urlId);
      }
    },
    deselectUrl: (state, action) => {
      const urlId = action.payload;
      state.selectedUrls = state.selectedUrls.filter(id => id !== urlId);
    },
    toggleUrlSelection: (state, action) => {
      const urlId = action.payload;
      if (state.selectedUrls.includes(urlId)) {
        state.selectedUrls = state.selectedUrls.filter(id => id !== urlId);
      } else {
        state.selectedUrls.push(urlId);
      }
    },
    selectAllUrls: (state, action) => {
      state.selectedUrls = action.payload; // array of all URL IDs
    },
    clearSelection: (state) => {
      state.selectedUrls = [];
    },
    
    // Search and filter actions
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    
    // Reset actions
    resetUI: (state) => {
      return { ...initialState, theme: state.theme };
    },
  },
});

export const {
  // Navigation
  setActiveTab,
  toggleSidebar,
  setSidebarOpen,
  
  // Modals
  showModal,
  hideModal,
  hideAllModals,
  
  // Loading
  setPageLoading,
  
  // Notifications
  addNotification,
  removeNotification,
  clearNotifications,
  
  // Theme
  setTheme,
  toggleTheme,
  
  // Forms
  setUrlFormData,
  resetUrlFormData,
  
  // Selection
  selectUrl,
  deselectUrl,
  toggleUrlSelection,
  selectAllUrls,
  clearSelection,
  
  // Search and filter
  setSearchQuery,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  setFilterBy,
  
  // Reset
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
