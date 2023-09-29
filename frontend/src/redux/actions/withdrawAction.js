import axios from "axios";
import { server } from "../../server";

// Get admin withdraws
export const getAdminWithdraws = () => async (dispatch) => {
    try {
      dispatch({
        type: "AdminWithdrawsRequest",
      });
  
      const { data } = await axios.get(`${server}/withdraw/admin-withdraws`, {
        withCredentials: true,
      });
      dispatch({
        type: "AdminWithdrawsSuccess",
        payload: data.withdraws,
      });
    } catch (error) {
      dispatch({
        type: "AdminWithdrawsFail",
        payload: error.response.data.message,
      });
    }
  };
  