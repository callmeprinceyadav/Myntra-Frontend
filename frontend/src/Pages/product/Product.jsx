import { useEffect, useState } from "react";
import "./Product.css";
import ProductStr from "../../Components/Product/ProductStr";
import { Select, Skeleton } from "antd";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Box,
  VStack,
  Stack,
  RadioGroup,
  Divider,
  Text,
  CheckboxGroup,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import api from "../../api/axios";

const Product = () => {
  const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams();
  const category = new URLSearchParams(search).get("category");
  const [prevCategory, setPrevCategory] = useState(category);
  const [proLoading, setProLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPrevCategory(category);
    setPage(1);
  }, [prevCategory, category]);

  const sortOptions = [
    {
      label: "Low to High",
      value: "asc",
    },
    {
      label: "High to Low",
      value: "desc",
    },
  ];

    const fetchProducts = async () => {
      setProLoading(true);
      try {
        const params = {
          page,
          category: searchParams.get("category"),
          subcategory: searchParams.get("subcategory"),
          brand: searchParams.get("brand"),
          type: searchParams.get("type"),
        };

        // Filter out null/empty params
        Object.keys(params).forEach(key => !params[key] && delete params[key]);

        console.log(`Fetching products with params:`, params);
        const response = await api.get("/products", { params });
        setProducts(response.data.products);
        setProLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProLoading(false);
      }
    };

    useEffect(() => {
      fetchProducts();
    }, [searchParams, page]);



  // filter functionality


  const handleSortChange = (value) => {
    console.log("Selected Sort By:", value);
    setSortBy(value);
  };

  const handleType = (el) => {
    setSearchParams({ ...searchParams, type: el });
  };

  const handleCategory = (el) => {
    setSearchParams({ ...searchParams, category: el });
  };

  const handleBrand = (el) => {
    setSearchParams({ ...searchParams, brand: el });
  };

  const handleSelectAllCategories = (checked) => {
    if (checked) {
      setSearchParams({
        ...searchParams,
        subcategory: [
          "Shirts",
          "Kurtas",
          "T-Shirts",
          "Jeans",
          "Watches",
          "Dresses"
        ],
      });
    } else {
      setSearchParams({ ...searchParams, subcategory: [] });
    }
  };








  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "asc") {
      return a.price - b.price;
    } else if (sortBy === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="product-page">
      <div className="product-top-bar">
        <p className="proNavigation">
          <span>Home /</span> {category ? category : "All Products"}
        </p>
        <div className="product-summary-row">
          <div className="proCount">
            {category || "Products"} <span>- {products.length} items</span>
          </div>
          <div className="proSort">
            <Select
              size="large"
              placeholder="Sort-By-Price"
              className="sortBy"
              style={{ width: 220 }}
              options={sortOptions}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="product-main-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-header">Filters</div>
          
          <div className="filter-section">
            <div className="filter-title">Categories</div>
            <div className="filter-list">
              {["Shirts", "Kurtas", "T-Shirts", "Jeans", "Watches", "Sarees"].map(cat => (
                <label key={cat} className="filter-item">
                  <input 
                    type="checkbox" 
                    checked={searchParams.getAll("category").includes(cat)}
                    onChange={() => handleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">Brand</div>
            <div className="filter-list">
              {["Puma", "Roadster", "WROGN", "HRX", "Adidas", "Biba"].map(brand => (
                <label key={brand} className="filter-item">
                  <input 
                    type="checkbox" 
                    checked={searchParams.getAll("brand").includes(brand)}
                    onChange={() => handleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="products-grid-container">
          {proLoading ? (
            <div className="proGrid">
              {[...Array(10)].map((_, ind) => (
                <div key={ind} style={{ padding: "20px" }}>
                  <Skeleton active vertical />
                </div>
              ))}
            </div>
          ) : (
            <div className="proGrid">
              {sortedProducts.map((pro, ind) => (
                <ProductStr product={pro} key={ind} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Product;
