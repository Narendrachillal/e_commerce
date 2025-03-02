import React, { createContext, useEffect, useState } from "react";

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
  console.log(all_product);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products/allproducts")
  //     .then((res) => res.json())
  //     .then((data) => setAll_Product(data));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:4000/products/allproducts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data); // Debugging
        setAll_Product(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    //getCartData
    const token = localStorage.getItem("auth-token");
    console.log("Auth Token:", token); // log token to ensure it's present

    if (token) {
      fetch("http://localhost:4000/products/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token, //  Ensure token is correctly set
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

 
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    console.log("Updated Cart Items:", cartItems);

    const token = localStorage.getItem("auth-token");
    console.log("Auth Token:", token); // log token to ensure it's present

    if (token) {
      fetch("http://localhost:4000/products/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token, //  Ensure token is correctly set
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
    console.log("Auth Token:", token);

    if (token) {
      fetch("http://localhost:4000/products/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token, //  Ensure token is correctly set
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Response Data:", data))
        .catch((error) => console.error("Fetch Error:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product?.find(
          (product) => product?.id === Number(item)
        );

        if (itemInfo && itemInfo.new_price) {
          // Ensure itemInfo exists
          totalAmount += itemInfo?.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

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
