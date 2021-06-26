import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <main className="py-3">
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route exact path="/" component={HomeScreen} />
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
