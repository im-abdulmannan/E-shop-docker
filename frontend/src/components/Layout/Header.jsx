import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import { backend_url } from "../../server";
import { categoriesData } from "../../static/data";
import styles from "../../styles/styles";
import Wishlist from "../Wishlist/Wishlist";
import Dropdown from "./Dropdown";
import Navbar from "./Navbar";

const Header = ({ activeHeading }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const crossSearchHandler = () => {
    setSearchData(null);
    setSearchTerm("");
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />

            {searchData && searchData.length !== 0 ? (
              <>
                <div className="flex absolute right-2 top-1.5 cursor-pointer gap-3">
                  <RxCross1 size={25} onClick={crossSearchHandler} />
                </div>
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </>
            ) : (
              <div className="flex absolute right-2 top-1.5 cursor-pointer gap-3">
                <AiOutlineSearch size={25} />
              </div>
            )}
          </div>

          <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
            <div className={`${styles.button} min-w-max px-4`}>
              <h1 className="flex text-white items-center">
                {isSeller && isSeller ? "Go to shop" : "Become a seller"}
                <IoIosArrowForward className=" ml-1" />
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full bg-[#3321cB] h-[70px] `}
        >
          <div
            className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
          >
            {/* Categories */}
            <div
              onClick={() => setDropDown(!dropDown)}
              className=" cursor-pointer"
            >
              <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white  font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  All Categories
                </button>
                <IoIosArrowDown size={30} className="absolute right-2 top-4" />
                {dropDown ? (
                  <Dropdown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>

            {/* Navitems */}
            <div className={`${styles.noramlFlex}`}>
              <Navbar active={activeHeading} />
            </div>

            <div className="flex flex-row">
              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                    onClick={() => setOpenWishlist(true)}
                  />
                  <span
                    className={`${
                      wishlist.length === 0 ? "hidden" : null
                    } absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center`}
                  >
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span
                    className={`${
                      cart.length === 0 ? "hidden" : null
                    } absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center`}
                  >
                    {cart && cart.length}
                  </span>
                </div>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px]">
                  {isAuthenticated ? (
                    <Link to={"/profile"}>
                      <img
                        src={`${backend_url}${user.avatar}`}
                        className="w-[35px] h-[35px] rounded-full"
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to={"/login"}>
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* Wishlist popup */}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile screen header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] fixed bg-white z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to={"/"}>
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart
                size={30}
                className="cursor-pointer"
                onClick={() => setOpenCart(true)}
              />
              <span
                className={`${
                  cart.length === 0 ? "hidden" : null
                } absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center`}
              >
                {cart && cart.length}
              </span>
            </div>
          </div>

          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </div>

        {/* Header Sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3 cursor-pointer"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    />
                    <span
                      className={`${
                        wishlist.length === 0 ? "hidden" : null
                      } absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center`}
                    >
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>

                <RxCross1
                  size={30}
                  className="ml-4 mt-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && searchData.length !== 0 ? (
                  <div className="absolute bg-slate-100 shadow-sm-5 z-[9] p-4 w-full">
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link to={`/product/${i._id}`}>
                            <div className="w-full flex items-start-py-3">
                              <img
                                src={`${backend_url}/${i.images[0]}`}
                                alt=""
                                className="w-[40px] h-[40px] mr-[10px]"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <Navbar active={activeHeading} />

              <Link to={"/shop-create"}>
                <div
                  className={`${styles.button} ml-4 !rounded-[4px] min-w-max px-2`}
                >
                  <h1 className="text-white flex items-center">
                    {isSeller && isSeller ? "Go to shop" : "Become a seller"}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </div>
              </Link>
              <br />
              <br />
              <div className="flex gap-1 w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to={"/profile"}>
                      <img
                        src={`${backend_url}${user.avatar}`}
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-green-400"
                        alt=""
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="text-[18px] pr-10px] text-[#000000b7]"
                    >
                      Login
                    </Link>
                    <p className="text-[18px] pr-10px] text-[#000000b7]"> / </p>
                    <Link
                      to={"/sign-up"}
                      className="text-[18px] pr-10px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
