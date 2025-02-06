import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProductListPage from "./Pages/ProductListPage";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

// ------------- user pages - protected ----------//
import UserProfilePage from "./Pages/user/UserProfilePage";
import UserOrdersPage from "./Pages/user/UserOrdersPage";
import UserOrderDetailsPage from "./Pages/user/UserOrderDetailsPage";
import UserCartDetailsPage from "./Pages/user/UserCartDetailsPage";

// ------------------ admin pages - protected ----------//
import AdminUsersPage from "./Pages/admin/AdminUsersPage";
import AdminEditUsersPage from "./Pages/admin/AdminEditUsersPage";
import AdminProductsPage from "./Pages/admin/AdminProductsPage";
import AdminCreateProductPage from "./Pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./Pages/admin/AdminEditProductPage";
import AdminOrdersPage from "./Pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./Pages/admin/AdminOrderDetailsPage";
import AdminChatsPage from "./Pages/admin/AdminChatsPage";
import AdminAnalyticsPage from "./Pages/admin/AdminAnalyticsPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";

//----------------components----------------//
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

// -----------components -- users ----------//
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
function App() {
  return (
    <Provider store={store}>
      <div className=" min-h-screen flex flex-col">
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route element={<RoutesWithUserChatComponent />}>
              {/** public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/product-details/:id"
                element={<ProductDetailsPage />}
              />
              <Route path="/product-list" element={<ProductListPage />} />
              <Route path="*" element="error 404 page doest not exist" />
            </Route>

            {/*protect routes -- user*/}
            <Route element={<ProtectedRoutesComponent admin={false} />}>
              <Route path="/user/profile" element={<UserProfilePage />} />
              <Route path="/user/my-orders" element={<UserOrdersPage />} />
              <Route
                path="/user/order-details/:id"
                element={<UserOrderDetailsPage />}
              />
              <Route
                path="/user/cart-details"
                element={<UserCartDetailsPage />}
              />
            </Route>
            {/*protect routes -- admin*/}
            <Route element={<ProtectedRoutesComponent admin={true} />}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/edit-user" element={<AdminEditUsersPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route
                path="/admin/create-new-product"
                element={<AdminCreateProductPage />}
              />
              <Route
                path="/admin/edit-product"
                element={<AdminEditProductPage />}
              />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route
                path="/admin/order-detais"
                element={<AdminOrderDetailsPage />}
              />
              <Route path="/admin/chats" element={<AdminChatsPage />} />
              <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            </Route>
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
