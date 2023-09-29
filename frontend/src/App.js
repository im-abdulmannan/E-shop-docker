import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminProtectedRoute from "./ProtectedRoutes/AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import SellerProtectedRoute from "./ProtectedRoutes/SellerProtectedRoute";
import {
  AdminDashboardEventsPage,
  AdminDashboardOrdersPage,
  AdminDashboardPage,
  AdminDashboardProductsPage,
  AdminDashboardSellersPage,
  AdminDashboardUsersPage,
  AdminWithdrawPage
} from "./Routes/AdminRoute";
import {
  ActivationPage,
  BestSellingPage,
  CheckoutPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  PaymentPage,
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  SellerActivationPage,
  ShopCreatePage,
  ShopLoginPage,
  SignupPage,
  UserInboxPage,
  UserOrderDetailsPage,
  UserTrackOrderPage,
} from "./Routes/Routes";
import {
  ShopAllCouponsPage,
  ShopAllEventPage,
  ShopAllOrdersPage,
  ShopAllProductsPage,
  ShopAllRefundsPage,
  ShopCreateEventPage,
  ShopCreateProductPage,
  ShopDashboardPage,
  ShopHomePage,
  ShopInboxPage,
  ShopOrderDetailsPage,
  ShopPreviewPage,
  ShopSettingsPage,
  ShopWithdrawPage,
} from "./Routes/ShopeRoutes";
import { getAllEvents } from "./redux/actions/eventAction";
import { getAllProducts } from "./redux/actions/productAction";
import { loadSeller, loadUser } from "./redux/actions/userAction";
import Store from "./redux/store";
import { server } from "./server";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  return (
    <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInboxPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <UserOrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <UserTrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* Shop Route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithdrawPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProductPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrdersPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefundsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetailsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <ShopAllCouponsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-users"
          element={
            <AdminProtectedRoute>
              <AdminDashboardUsersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-products"
          element={
            <AdminProtectedRoute>
              <AdminDashboardProductsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-events"
          element={
            <AdminProtectedRoute>
              <AdminDashboardEventsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-orders"
          element={
            <AdminProtectedRoute>
              <AdminDashboardOrdersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-sellers"
          element={
            <AdminProtectedRoute>
              <AdminDashboardSellersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-settings"
          element={
            <AdminProtectedRoute>
              <AdminDashboardUsersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard-withdraw-request"
          element={
            <AdminProtectedRoute>
              <AdminWithdrawPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
