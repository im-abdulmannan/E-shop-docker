import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const withdrawReducer = createReducer(initialState, {
  // Get all admin withdraw
  AdminWithdrawsRequest: (state) => {
    state.isLoading = true;
  },
  AdminWithdrawsSuccess: (state, action) => {
    state.isLoading = false;
    state.adminWithdraws = action.payload;
  },
  AdminWithdrawsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});
