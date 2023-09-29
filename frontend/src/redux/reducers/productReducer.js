import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  // Create product
  ProductCreateRequest: (state) => {
    state.isLoading = true;
  },
  ProductCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  ProductCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // Get product of single shop
  GetAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  GetAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  GetAllProductsShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete product of a shop
  DeleteProductRequest: (state) => {
    state.isLoading = true;
  },
  DeleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  DeleteProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all products
  GetAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  GetAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  GetAllProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get all admin products
  AdminProductsRequest: (state) => {
    state.isLoading = true;
  },
  AdminProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.adminProducts = action.payload;
  },
  AdminProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Clear Error
  clearError: (state) => {
    state.error = null;
  },
});
