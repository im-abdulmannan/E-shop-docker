import axios from "axios";
import { server } from "../../server";

// Get admin sellers
export const getAdminSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "AdminSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-sellers`, {
      withCredentials: true,
    });
    dispatch({
      type: "AdminSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "AdminSellersFail",
      payload: error.message,
    });
  }
};
