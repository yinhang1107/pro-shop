import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();
  const query = useQuery();

  const keyword = query.get("keyword") || "";

  const pageNumber = query.get("pageNumber") || 1;

  const { loading, error, products, page, pages, pageSize } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              key={product._id}
              className="my-3"
              sm={12}
              md={6}
              lg={4}
              xl={3}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <Paginate
        page={page}
        pages={keyword ? products.length / pageSize : pages}
        keyword={keyword}
        pathname={location.pathname}
      />
    </>
  );
};

export default HomeScreen;
