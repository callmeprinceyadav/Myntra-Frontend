import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "antd";
import "./SingleProduct.css";
import { RiStarSFill } from "react-icons/ri";
import { BiHeart, BiDetail } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useToast } from "@chakra-ui/react";
import { Context } from "../../Contexts/AuthContext";
import api from "../../api/axios";

const SingleProduct = () => {
  const { isAuth } = useContext(Context);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [proQuantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await api.get(`/products/${id}`);
        setProduct([response.data.product]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return "Loading...";
  }

  if (!product) {
    return "Product not found";
  }

  const handleAddBag = async (id) => {
    if (!isAuth) {
      toast({
        title: "Login Required",
        description: "Please login to add the product to your bag.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const res = await api.post(`/carts/add/${id}`, { proQuantity });
        if (res.data.message === "Product Added Successfully") {
          toast({
            title: "Added to Bag",
            description: "Product has been added to your bag successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "An error occurred while adding the product to your bag.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const handleAddWish = async (id) => {
    if (!isAuth) {
      toast({
        title: "Login Required",
        description: "Please login to add the product to your wishlist.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const res = await api.post(`/wishlists/add/${id}`);
        if (res.data.message === "Product Added Successfully in Wishlist") {
          toast({
            title: "Added to Wishlist",
            description: "Product has been added to your wishlist successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.log("Error", error);
        toast({
          title: "Error",
          description: "An error occurred while adding the product to your wishlist.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="singleProComponent">
      <div className="singlePro">
        <div className="singleProGallery">
          <img src={product[0].image} alt={product[0].title} />
        </div>
        <div className="singleProDetails">
          <h2 className="product-brand-main">{product[0].brand}</h2>
          <h3 className="product-title-main">{product[0].title}</h3>

          <div className="product-price-section">
            <span className="current-price-large">Rs. {product[0].price}</span>
            {product[0].oldPrice && <span className="mrp-text">Rs. {product[0].oldPrice}</span>}
            {product[0].discount && <span className="discount-text">({product[0].discount}% OFF)</span>}
          </div>
          <p className="tax-info">inclusive of all taxes</p>

          <div className="size-selection-header">
            SELECT SIZE <span>SIZE CHART {">"}</span>
          </div>
          <div className="size-buttons-container">
            {product[0].sizes.map((size) => (
              <div
                key={size}
                className={`size-circle ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className="action-buttons-container">
            <button
              className="add-to-bag-btn-large"
              onClick={() => handleAddBag(id)}
              disabled={!selectedSize}
              style={{ opacity: !selectedSize ? 0.7 : 1 }}
            >
              <HiOutlineShoppingBag size={22} /> ADD TO BAG
            </button>
            <button
              className="wishlist-btn-large"
              onClick={() => handleAddWish(id)}
            >
              <MdFavoriteBorder size={22} /> WISHLIST
            </button>
          </div>

          <div className="product-details-description">
            <h3>PRODUCT DETAILS</h3>
            <p>{product[0].description || "No description available for this premium product."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
