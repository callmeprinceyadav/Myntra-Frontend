import { useContext, useState, useEffect } from "react";
import "./Bag.css";
import Cart from "../../Components/Cart/Cart";
import { Context } from "../../Contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Bag = () => {
  const { isAuth, setTotalItems, totalItems } = useContext(Context);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      const showCartData = async () => {
        try {
          const res = await api.get("/carts");
          const cartData = res.data.myCart;
          const countData = res.data.myCart.length;

          const totalPrice = cartData.reduce((acc, item) => {
            return acc + item.price;
          }, 0);
          console.log('Total Price:', totalPrice);
          setTotalPrice(totalPrice);
          setCartData(cartData);
          setTotalItems(countData);
        } catch (error) {
          console.log("error11", error);
        }
      };

      showCartData();
    }
  }, [isAuth, setTotalItems]);

  const handleDeleteBag = async (id) => {
    try {
      const deleteFromBag = await api.delete(`/carts/delete/${id}`);

      console.log(deleteFromBag);

      if (deleteFromBag.data.message === "Item is removed from cart!") {
        toast({
          title: "Product Deleted",
          description: "Product has been deleted from your cart",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setCartData((prevBagData) =>
          prevBagData.filter((item) => item._id !== id)
        );
        setTotalItems((prevTotalItems)=>prevTotalItems-1)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllItems = async () => {
    try {
      await api.delete('/carts/deleteall');
      setCartData([]);
      setTotalItems(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create actual order in backend
      const orderData = {
        orderItems: cartData.map(item => ({
          product: item._id,
          quantity: 1,
          image: item.image
        })),
        totalPrice: totalPrice,
        shippingInfo: {
          address: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pinCode: 400001,
          phone: 9876543210
        },
        paymentInfo: {
          id: "PI_" + Date.now(),
          status: "Succeeded"
        },
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0
      };

      const res = await api.post("/orders/new", orderData);

      if (res.status === 201) {
        setLoading(false);
        setSuccess(true);

        setTimeout(async () => {
          await handleDeleteAllItems();
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      }
      setLoading(false);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (!isAuth) {
    return <Cart />;
  }

  return (
    <div className="bag-page">
      <div className="bag-container">
        {/* Left Column: Items */}
        <div className="bag-items-list">
          {cartData.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <h2>Your bag is empty!</h2>
              <button className="btn-myntra btn-primary" style={{ marginTop: "20px" }} onClick={() => navigate("/")}>Add Items From Home</button>
            </div>
          ) : (
            cartData.map((ele) => (
              <div key={ele._id} className="bag-item-card">
                <div className="remove-item-x" onClick={() => handleDeleteBag(ele._id)}>
                  <MdClose />
                </div>
                <img src={ele.image} alt={ele.title} className="bag-item-image" />
                <div className="bag-item-details">
                  <h4>{ele.brand}</h4>
                  <p>{ele.title}</p>
                  <div style={{ marginTop: "10px", fontSize: "12px", color: "#282c3f", fontWeight: "700" }}>
                    Size: {ele.sizes[0]}
                  </div>
                  <div className="bag-item-price">
                    Rs. {ele.price}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Price Details */}
        <div className="price-details-panel">
          <div className="price-header">Price Details ({totalItems} Items)</div>
          <div className="price-row">
            <span>Total MRP</span>
            <span>Rs. {totalPrice}</span>
          </div>
          <div className="price-row">
            <span>Discount on MRP</span>
            <span style={{ color: "#03a685" }}>- Rs. 0</span>
          </div>
          <div className="price-row">
            <span>Coupon Discount</span>
            <span style={{ color: "#ff3f6c", cursor: "pointer" }}>Apply Coupon</span>
          </div>
          <div className="price-row">
            <span>Convenience Fee</span>
            <span><span style={{ textDecoration: "line-through" }}>Rs. 99</span> <span style={{ color: "#03a685" }}>FREE</span></span>
          </div>
          <div className="price-row total">
            <span>Total Amount</span>
            <span>Rs. {totalPrice}</span>
          </div>

          {!loading && !success && (
            <button className="place-order-btn" onClick={handlePayment}>Place Order</button>
          )}

          {loading && (
            <button className="place-order-btn" disabled style={{ opacity: 0.7 }}>Processing...</button>
          )}
        </div>
      </div>

      {/* Success Animation Overlay */}
      {success && (
        <div className="payment-success-overlay">
          <div className="success-icon">✔</div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#282c3f" }}>Order Placed Successfully!</h2>
          <p style={{ color: "#7e818c", marginTop: "10px" }}>Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
};

export default Bag;
