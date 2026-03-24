import { useContext, useEffect, useState } from "react";
import Login from "../../Components/Login/Login";
import { Context } from "../../Contexts/AuthContext";
import "./Order.css";
import api from "../../api/axios";
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
  Divider,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";

const Orders = () => {
  const { isAuth } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth) {
      fetchOrders();
    }
  }, [isAuth]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/user");
      setOrders(response.data.order);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  if (!isAuth) {
    return <Login />;
  }

  if (loading) {
    return (
      <Center height="60vh">
        <Spinner size="xl" color="pink.400" />
      </Center>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h3 className="orders-header">All Orders</h3>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>You haven't placed any orders yet.</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-top">
                <div className="order-status-id">
                  <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus === "Delivered" ? "Delivered" : "Order Placed"}
                  </span>
                  <span className="order-id">Order ID # {order._id.substring(order._id.length - 8).toUpperCase()}</span>
                </div>
                <div className="order-date">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="order-items-list">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <img src={item.image} alt="" className="order-item-image" />
                    <div className="order-item-info">
                      <h5>{item.product?.brand || "Myntra Exclusive"}</h5>
                      <p>{item.product?.title || "Premium Apparel"}</p>
                      <p>Size: {item.product?.sizes ? item.product.sizes[0] : "Universal"}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total-bar">
                <span className="total-label">Total Amount Paid</span>
                <span className="total-price">₹{order.totalPrice}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;