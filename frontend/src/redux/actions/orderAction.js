import axios from "axios";
import { server } from "../../server";

// Get all order of a user
export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserOrdersRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-user-orders/${userId}`
    );
    dispatch({
      type: "GetUserOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "GetUserOrdersFail",
      payload: error.message,
    });
  }
};

// Get all orders of a shop
export const getShopOrders = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "GetShopOrdersRequest",
    });

    const { data } = await axios.get(
      `${server}/order/get-seller-orders/${shopId}`
    );
    dispatch({
      type: "GetShopOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "GetShopOrdersFail",
      payload: error.message,
    });
  }
};

// Get all admin orders
export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "AdminOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-orders`, {
      withCredentials: true,
    });
    dispatch({
      type: "AdminOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "AdminOrdersFail",
      payload: error.message,
    });
  }
};
