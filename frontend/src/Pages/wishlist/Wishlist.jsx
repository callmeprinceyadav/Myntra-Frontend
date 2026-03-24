import { useContext, useState, useEffect } from "react";
import Login from "../../Components/Login/Login";
import { Context } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import { useToast } from "@chakra-ui/react";
import api from "../../api/axios";

const Wishlist = () => {
  const [wishData, setWishData] = useState([]);
  const { isAuth } = useContext(Context);
  const {setTotalItems} = useContext(Context)
  const toast = useToast(); 

  if (!isAuth) {
    return <Login />;
  }

  const showWishData = async () => {
    try {
      const res = await api.get("/wishlists");
      setWishData(res.data.myWishlist);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleMoveToBag = async (id) => {
    try {
      const addToBagRes = await api.post(`/carts/add/${id}`);

      const deleteFromWishlistRes = await api.delete(`/wishlists/delete/${id}`);

      if (
        addToBagRes.data.message === "Product Added Successfully" &&
        deleteFromWishlistRes.data.message === "Item was removed from Wishlist!"
      ) {
        toast({
          title: "Product Moved",
          description: "Product has been moved to your bag successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setTotalItems((prevTotalItems) => prevTotalItems + 1);
        setWishData((prevWishData) =>
          prevWishData.filter((item) => item._id !== id)
        );

      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while moving the product to your bag.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDeleteWish = async (id) => {
    try {
      const deleteFromWishlistRes = await api.delete(`/wishlists/delete/${id}`);

      if (
        deleteFromWishlistRes.data.message === "Item was removed from Wishlist!"
      ) {
        toast({
          title: "Item Removed",
          description: "Item has been removed from your wishlist.",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setWishData((prevWishData) =>
          prevWishData.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while removing the item from your wishlist.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    showWishData();
  }, []);

  return (
    <div className="wishlist-page">
      <h3 className="wishlist-header">My Wishlist <span>({wishData.length} Items)</span></h3>
      <div className="fillItem">
        {wishData.map((ele) => (
          <div className="itemwish" key={ele._id}>
            <div className="remove-icon" onClick={() => handleDeleteWish(ele._id)}>
              <MdClose />
            </div>
            <div className="itemwish2">
              <Link to={`/product/${ele._id}`} className="image-container">
                <img src={ele.image} alt="ProductImage" className="imagewish" />
              </Link>
              <div className="product-info">
                <h4>{ele.brand}</h4>
                <p>{ele.title}</p>
                <div className="price-container">
                  <span className="current-price">Rs. {ele.price}</span>
                </div>
              </div>
              <button
                className="move-to-bag-btn"
                onClick={() => handleMoveToBag(ele._id)}
              >
                MOVE TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
