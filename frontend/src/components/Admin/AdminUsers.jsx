import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAdminUsers } from "../../redux/actions/userAction";
import { server } from "../../server";
import styles from "../../styles/styles";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAdminUsers());
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    dispatch(getAdminUsers());
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const role = params.row.role;
        return role === "Admin" ? "text-green-600" : "text-red-600";
      },
    },

    {
      field: "joinedAt",
      headerName: "Joined at",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete user",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  adminUsers &&
    adminUsers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
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
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center gap-5">
                <div
                  className={`${styles.cart_button} w-[100px] rounded-md text-white text-[18px] !h-[35px]`}
                  onClick={() => setOpen(false)}
                >
                  No
                </div>
                <div
                  className={`${styles.cart_button} w-[100px] rounded-md text-white text-[18px] !h-[35px]`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Yes
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
