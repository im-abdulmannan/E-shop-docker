import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/actions/userAction";
import { getAdminWithdraws } from "../../redux/actions/withdrawAction";
import { server } from "../../server";
import styles from "../../styles/styles";

const AdminWithdraw = () => {
  const dispatch = useDispatch();
  const { adminWithdraws } = useSelector((state) => state.withdraw);

  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    dispatch(getAdminWithdraws());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 140,
      flex: 1.2,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.row.status;
        return status === "Succeed" ? "text-green-600" : "text-red-600";
      },
    },
    {
      field: "createdAt",
      headerName: "Request at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={15}
            className={`${
              params.row.status !== "Processing" ? "hidden" : ""
            } mr-5 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const row = [];

  adminWithdraws &&
    adminWithdraws.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-status/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Status has been updated successfully!");
        dispatch(loadUser());
        setOpen(false);
      });
  };

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Withdraw Requests</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>

        {open && (
          <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
            <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
              <div className="flex justify-end w-full">
                <RxCross1
                  size={25}
                  onClick={() => setOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <h1 className="text-[25px] text-center font-Poppins">
                Update Withdraw status
              </h1>
              <br />
              <div className="flex gap-6 justify-center items-center">
                <select
                  name=""
                  id=""
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className="w-[200px] h-[42px] border rounded p-2"
                >
                  <option value={withdrawStatus}>{withdrawData.status}</option>
                  <option value={withdrawStatus}>Succeed</option>
                </select>
                <button
                  type="submit"
                  className={`block ${styles.button} text-white !h-[42px] mt-4 text-[18px]`}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdraw;
