import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders, deliverOrder } from "../actions/orderActions";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.orderList);
  const { success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, successDeliver]);

  const deliverHandler = (order) => {
    if (window.confirm(`Are you sure you want to deliver Order: ${order._id}?`))
      dispatch(deliverOrder(order._id));
  };

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.user.name}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => deliverHandler(order)}
                  >
                    <i className="fas fa-truck"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
