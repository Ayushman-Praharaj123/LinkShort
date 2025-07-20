import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createShortUrl as createShortUrlAPI } from '../../apis/shortUrl.api.js';

// Async thunks for URL operations
export const createShortUrl = createAsyncThunk(
  'urls/createShortUrl',
  async ({ url, customSlug }, { rejectWithValue }) => {
    try {
      const response = await createShortUrlAPI(url, customSlug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create short URL');
    }
  }
);

export const fetchUserUrls = createAsyncThunk(
  'urls/fetchUserUrls',
  async (_, { rejectWithValue }) => {
    try {
      // This would be your API call to fetch user's URLs
      // const response = await getUserUrlsAPI();
      // return response;
      
      // For now, return empty array until you implement the API
      return [];
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch URLs');
    }
  }
);

export const deleteUrl = createAsyncThunk(
  'urls/deleteUrl',
  async (urlId, { rejectWithValue }) => {
    try {
      // This would be your API call to delete a URL
      // await deleteUrlAPI(urlId);
      return urlId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete URL');
    }
  }
);

const initialState = {
  urls: [],
  recentUrl: null,
  loading: false,
  error: null,
  stats: {
    totalUrls: 0,
    totalClicks: 0,
  },
};

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecentUrl: (state) => {
      state.recentUrl = null;
    },
    addUrlToList: (state, action) => {
      state.urls.unshift(action.payload);
      state.stats.totalUrls += 1;
    },
    updateUrlClicks: (state, action) => {
      const { urlId, clicks } = action.payload;
      const url = state.urls.find(url => url.id === urlId);
      if (url) {
        const oldClicks = url.clicks || 0;
        url.clicks = clicks;
        state.stats.totalClicks += (clicks - oldClicks);
      }
    },
    setUrls: (state, action) => {
      state.urls = action.payload;
      state.stats.totalUrls = action.payload.length;
      state.stats.totalClicks = action.payload.reduce((total, url) => total + (url.clicks || 0), 0);
    },
  },
  extraReducers: (builder) => {
    builder
      // Create short URL cases
      .addCase(createShortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShortUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.recentUrl = action.payload;
        state.error = null;
        
        // Add to URLs list if it contains URL data
        if (action.payload.url) {
          state.urls.unshift(action.payload.url);
          state.stats.totalUrls += 1;
        }
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch user URLs cases
      .addCase(fetchUserUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
        state.stats.totalUrls = action.payload.length;
        state.stats.totalClicks = action.payload.reduce((total, url) => total + (url.clicks || 0), 0);
        state.error = null;
      })
      .addCase(fetchUserUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete URL cases
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUrlId = action.payload;
        const deletedUrl = state.urls.find(url => url.id === deletedUrlId);
        
        if (deletedUrl) {
          state.stats.totalClicks -= (deletedUrl.clicks || 0);
          state.stats.totalUrls -= 1;
        }
        
        state.urls = state.urls.filter(url => url.id !== deletedUrlId);
        state.error = null;
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  clearRecentUrl, 
  addUrlToList, 
  updateUrlClicks, 
  setUrls 
} = urlSlice.actions;

export default urlSlice.reducer;
