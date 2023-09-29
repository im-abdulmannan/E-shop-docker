import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteShopEvent } from "../../redux/actions/eventAction";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const ShopAllCoupons = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-shop-coupons/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteShopEvent(id));
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProducts,
          shopId: seller._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Coupon created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Product id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 120, flex: 1.1 },
    { field: "discount", headerName: "Discount", minWidth: 160, flex: 0.6 },
    {
      field: "Delete",
      headerName: "",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  coupons &&
    coupons.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        discount: item.value + "%",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-max !rounded-[5px] p-2 mr-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon</span>
            </div>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[200] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow relative p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                {/* Create coupon code form */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <div>
                    <label htmlFor="name" className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your coupon name..."
                    />
                  </div>
                  <br />

                  <div>
                    <label htmlFor="value" className="pb-2">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      id="value"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your coupon value..."
                    />
                  </div>
                  <br />

                  <div>
                    <label htmlFor="minAmount" className="pb-2">
                      Min Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      id="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your coupon min amount..."
                    />
                  </div>
                  <br />

                  <div>
                    <label htmlFor="maxAmount" className="pb-2">
                      Max Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      id="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className={`${styles.input} mt-2`}
                      placeholder="Enter your coupon max amount..."
                    />
                  </div>
                  <br />

                  <div>
                    <label htmlFor="selectedProducts" className="pb-2">
                      Select a product
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      id="selectedProducts"
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />

                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopAllCoupons;
