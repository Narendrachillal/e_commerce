import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import baseURL from "../../utils/endPoints";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}products/allproducts`);
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const removeProduct = async (id) => {
    try {
      await axios.post(`${baseURL}products/removeproduct`, { id });
      setAllProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((p) => (
          <React.Fragment key={p.id}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={p.image}
                alt={p.name}
                className="listproduct-product-image"
              />
              <p>{p.name}</p>
              <p>${p.old_price}</p>
              <p>${p.new_price}</p>
              <p>{p.category}</p>
              <img
                onClick={() => removeProduct(p.id)}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Remove"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
