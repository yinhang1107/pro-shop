import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <main className="py-3">
          <ProtectedRoute path="/order/:id" component={OrderScreen} />
          <ProtectedRoute path="/placeorder" component={PlaceOrderScreen} />
          <ProtectedRouteAdmin
            path="/admin/orderlist"
            component={OrderListScreen}
          />
          <ProtectedRouteAdmin
            path="/admin/userlist"
            component={UserListScreen}
          />
          <ProtectedRouteAdmin
            path="/admin/productlist"
            component={ProductListScreen}
          />
          <ProtectedRouteAdmin
            path="/admin/user/:id/edit"
            component={UserEditScreen}
          />
          <ProtectedRouteAdmin
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
          />
          <ProtectedRoute path="/payment" component={PaymentScreen} />
          <ProtectedRoute path="/shipping" component={ShippingScreen} />
          <ProtectedRoute path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/search" component={HomeScreen} />
          <Route exact path="/" component={HomeScreen} />
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
