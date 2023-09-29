import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // Get all orders of a user
  GetUserOrdersRequest: (state) => {
    state.isLoading = true;
  },
  GetUserOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  GetUserOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all orders of a seller
  GetShopOrdersRequest: (state) => {
    state.isLoading = true;
  },
  GetShopOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  GetShopOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all admin orders
  AdminOrdersRequest: (state) => {
    state.isLoading = true;
  },
  AdminOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.adminOrders = action.payload;
  },
  AdminOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Clear Error
  clearError: (state) => {
    state.error = null;
  },
});
