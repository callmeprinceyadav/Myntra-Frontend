import "./ProductStr.css";
import { Link } from "react-router-dom";
import { Context } from "../../Contexts/AuthContext";
import { useContext } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../../api/axios";
import { MdFavoriteBorder } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const ProductStr = ({ product }) => {
// eslint-disable-next-line react/prop-types
  const { image, brand, title, price, _id: id } = product;
  const { isAuth } = useContext(Context);
  const toast = useToast();

  const handleAddWish = async (id) => {
    if (!isAuth) {
      toast({
        title: "Not Logged In",
        description: "You need to log in to add items to your wishlist.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position:"top"
      });
    } else {
      try {
        const res = await api.post(`/wishlists/add/${id}`);
        console.log(res)
        if (res.data.message === "Product Added Successfully in Wishlist" ) {
          // alert("Added")
          toast({
            title: "Product Added",
            description: "The product was successfully added to your wishlist.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position:"top"
          });
        }
      } catch (error) {
        console.error("Error", error);
        toast({
          title: "Error",
          description: "There was an error adding the product to your wishlist.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position:"top"
        });
      }
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${id}`}>
          <img src={image} alt={brand} className="product-card-image" />
        </Link>
        <div className="wishlist-overlay" onClick={() => handleAddWish(id)}>
          <span className="wishlist-btn">
            <MdFavoriteBorder style={{marginRight: "5px"}}/> WISHLIST
          </span>
        </div>
      </div>
      <div className="product-card-details">
        <h4 className="product-brand">{brand}</h4>
        <p className="product-title">{title}</p>
        <div className="product-price-row">
          <span className="product-discounted-price">Rs. {price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductStr;
