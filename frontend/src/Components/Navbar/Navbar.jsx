import { useContext, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { BiSearch, BiUser, BiHeart } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { Dropdown } from "antd";
import { Context } from "../../Contexts/AuthContext";
import { useToast } from "@chakra-ui/react";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth, setIsAuth, user, setUser, totalItems } = useContext(Context);

  const handleLogout = async () => {
    try {
      const response = await api.post("/users/logout");
      if (response.status === 200) {
        setIsAuth(false);
        setUser("");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("user");
        toast({
          title: "Logout Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Failed",
        description: error.response?.data?.message || "Internal Server Error",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };


  // search functionality

  const handleClick = (param = "", value = "") => {
    setClick(!click);
    if (param === "" || value === "") {
      setClick(!click);
    } else {
      return navigate(`/product?${param}=${value}`);
    }
  };
  const handleSearchClick = () => {
    if (keyword.trim()) {
      return navigate(`/product?category=${keyword.trim()}`);
    }
  };






  const styleA = { left: "-100%" };
  const styleB = { left: "0%" };

  const items = [
    {
      label: isAuth ? (
        <div>
          <h4 style={{ color: "green" }}>WELCOME {user?.username || user}</h4>
          <p>Access orders and many more !</p>
        </div>
      ) : (
        <div>
          <h4>Welcome</h4>
          <p>Create Your account</p>
        </div>
      ),
      key: "-1",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/">Home</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/orders">Orders</Link>,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/wishlist">Wishlist</Link>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <Link to="/profile">Account</Link>,
      key: "4",
    },

    {
      label: isAuth ? (
        <p onClick={handleLogout} style={{ color: "red" }}>
          LOGOUT
        </p>
      ) : (
        <Link padding="10px" to="/login" style={{ color: "green" }}>
          LOGIN / SIGNUP
        </Link>
      ),
      key: "0",
    },
  ];

  return (
    <div className="container">
      <div className="row v-center">
        <div className="nav-item item-left">
          <div className="logo">
            <Link to="/">
              <img
                src="https://www.freelogovectors.net/wp-content/uploads/2021/02/myntra-logo-freelogovectors.net_.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="nav-item item-center">
          <nav className="menu" style={click ? styleB : styleA}>
            <ul className="menu-main">
              <p className="mobItem">
                <Link>SHOP FOR</Link>
                <MdClose className="cross" onClick={() => handleClick()} />
              </p>

              <li className="menuItem" onClick={() => handleClick("", "")}>
                <Link>ALL</Link>
                <div className="subMenu megaMenu menuColumn">
                  <div className="menuList">
                    <ul>
                      <p>Men</p>
                      <li
                        onClick={() => handleClick("subcategory", "T-Shirts")}
                      >
                        <Link to={`/product?subcategory=T-Shirts`}>
                          T-Shirts
                        </Link>
                      </li>
                      <li
                        onClick={() => handleClick("subcategory", "Flip Flops")}
                      >
                        <Link to={`/product?subcategory=Flip Flops`}>
                          Flip Flops
                        </Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Jeans")}>
                        <Link to={`/product?subcategory=Jeans`}>Jeans</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menuList">
                    <ul>
                      <p>Women</p>
                      <li onClick={() => handleClick("subcategory", "Kurtas")}>
                        <Link to="/product?subcategory=Kurtas">Kurtas & Suits</Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Sarees")}>
                        <Link to="/product?subcategory=Sarees">Sarees</Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Dresses")}>
                        <Link to="/product?subcategory=Dresses">Dresses</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menuList">
                    <ul>
                      <p>Kids</p>
                      <li onClick={() => handleClick("subcategory", "T-Shirts")}>
                        <Link to="/product?subcategory=T-Shirts">T-Shirts</Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Dresses")}>
                        <Link to="/product?subcategory=Dresses">Party Wear</Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Watches")}>
                        <Link to="/product?subcategory=Watches">Watches</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menuList">
                    <ul>
                      <p>Beauty</p>
                      <li onClick={() => handleClick("subcategory", "Face Wash")}>
                        <Link to="/product?subcategory=Face Wash">Face Wash</Link>
                      </li>
                      <li onClick={() => handleClick("subcategory", "Lipstick")}>
                        <Link to="/product?subcategory=Lipstick">Lipstick</Link>
                      </li>
                      <li>
                        <Link>Beauty Gift</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menuList">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTapNCdwQMoGwF4Opebj3d9PxJQLqLcUVeYz0RDholbBzNdTKnplyAoscs-T0Dxpucmdqs&usqp=CAU"
                      alt=""
                    />
                  </div>
                </div>
              </li>
              <li
                className="menuItem"
                onClick={() => handleClick("category", "Men")}
              >
                <Link to={`/product?category=Men`}>MEN</Link>
              </li>
              <li
                className="menuItem"
                onClick={() => handleClick("category", "Women")}
              >
                <Link to={`/product?category=Women`}>WOMEN</Link>
              </li>
              <li
                className="menuItem"
                onClick={() => handleClick("category", "Kids")}
              >
                <Link to={`/product?category=Kids`}>KIDS</Link>
              </li>
              <li
                className="menuItem"
                onClick={() => handleClick("category", "Beauty")}
              >
                <Link to={`/product?category=Beauty`}>BEAUTY</Link>
              </li>
              <br />

              <h3 style={{ color: isAuth ? "green" : "" }} className="mobItem">
                {isAuth ? "WELCOME USER" : ""}{" "}
              </h3>

              <h4 className="mobItem" onClick={handleClick}>
                <Link to="/login" style={{ color: isAuth ? "red" : "green" }}>
                  {isAuth ? (
                    <p onClick={handleLogout} style={{ color: "red" }}>
                      LOGOUT
                    </p>
                  ) : (
                    "LOGIN / SIGNUP"
                  )}
                </Link>
              </h4>
            </ul>
          </nav>
        </div>
        <div className="nav-item item-right">

        {/* search functionality */}

          <div
            className="navSearch"
            onKeyUp={({ keyCode }) => {
              if (keyCode === 13) {
                handleSearchClick();
              }
            }}
          >
            <input
              type="text"
              placeholder="Search for products, brands and more"
              onChange={({ target }) => setKeyword(target.value)}
            />
            <BiSearch className="searchIcon" onClick={handleSearchClick} />
          </div>



          <div className="navIcons hide">
            <BiSearch className="sideIcons" />
          </div>
          <div className="navIcons">
            <Dropdown
              menu={{ items, selectable: true, defaultSelectedKeys: ["0"] }}
              placement="bottom"
              trigger={["hover"]}
            >
              <Link
                onClick={(e) => e.preventDefault()}
                style={{ color: isAuth ? "green" : "" }}
              >
                <BiUser className={isAuth ? "sideIconspro" : "sideIcons"} />
                <p className="display">Profile</p>
              </Link>
            </Dropdown>
          </div>

          <div className="navIcons display">
            <Link to="/wishlist" data-tip="Wishlist">
              <BiHeart className="sideIcons" />
              <p className="display">Wishlist</p>
            </Link>
            {/* <ReactTooltip place="top" type="dark" effect="solid" /> */}
          </div>

          <div className="navIcons">
            <Link to="/bag">
              <HiOutlineShoppingBag className="sideIcons" />
              <span>{totalItems}</span>
              <p className="display">Bag</p>
            </Link>
          </div>
          <div className="navIcons hamburger">
            <RxHamburgerMenu className="sideIcons" onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
