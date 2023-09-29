import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  // Update user info
  UpdateUserInfoRequest: (state) => {
    state.loading = true;
  },
  UpdateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  UpdateUserInfoFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // Update user address
  UpdateUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  UpdateUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.user = action.payload;
  },
  UpdateUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // Delete user address
  DeleteUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  DeleteUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.user = action.payload;
  },
  DeleteUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },

  // Get all admin users
  AdminUsersRequest: (state) => {
    state.isLoading = true;
  },
  AdminUsersSuccess: (state, action) => {
    state.isLoading = false;
    state.adminUsers = action.payload;
  },
  AdminUsersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Clear errors
  clearError: (state) => {
    state.error = null;
  },
});
