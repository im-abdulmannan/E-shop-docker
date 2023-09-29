import axios from "axios";
import { server } from "../../server";

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.message,
    });
  }
};

// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.message,
    });
  }
};

// Update user info
export const updateUserInfo =
  (name, email, password, phoneNumber) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFail",
        payload: error.message,
      });
    }
  };

// Update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFail",
        payload: error.message,
      });
    }
  };

// Delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFail",
      payload: error.message,
    });
  }
};

// Get admin users
export const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "AdminUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-users`, {
      withCredentials: true,
    });
    dispatch({
      type: "AdminUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "AdminUsersFail",
      payload: error.message,
    });
  }
};
