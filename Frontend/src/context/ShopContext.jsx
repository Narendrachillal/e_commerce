import React, { createContext, useEffect, useState } from "react";
import API from "../utils/endPoints.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300 + 1; index++) {
    cart[index] = 0;
  }

  return cart;
};
const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(API.allproducts)
      .then((res) => res.json())
      .then((data) => {
        setAll_Product(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    //getCartData
    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(API.getCart, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    const token = localStorage.getItem("auth-token");
    if (!token) {
      console.error("No auth token found in localStorage!");
      alert("  Please log in to add items to cart.");
      return;
    }

    if (token) {
      fetch(API.addToCart, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Response Data:", data))
        .catch((error) => console.error("Fetch Error:", error));
    } else {
      console.error("No auth token found in localStorage!");
    }
  };

  //remove cart

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    const token = localStorage.getItem("auth-token");

    if (token) {
      fetch(API.removeFromCart, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Response Data:", data))
        .catch((error) => console.error("Fetch Error:", error));
    }
  };

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      if (qty > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(itemId)
        );
        return itemInfo?.new_price ? total + itemInfo.new_price * qty : total;
      }
      return total;
    }, 0);

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce(
      (total, qty) => total + (qty > 0 ? qty : 0),
      0
    );

  const contextValue = {
    cartItems,
    all_product,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
