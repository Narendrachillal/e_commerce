import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    addToCart,
  } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.name}</p>
                <p>Rs {item.new_price ? item.new_price : "N/A"}</p>
                <div className="cartitems-quantity-main">
                  <span
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    -
                  </span>

                  <span className="cartitems-quantity">
                    {cartItems[item.id]}
                  </span>

                  <span
                    onClick={() => {
                      addToCart(item.id);
                    }}
                  >
                    +
                  </span>
                </div>
                <p>
                  Rs {item.new_price ? item.new_price * cartItems[item.id] : 0}
                </p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(item.id);
                  }}
                  alt=""
                />
                <hr />
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to check out</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode enter it here</p>
          <div className="catitems-promobox">
            <input type="text " placeholder="promocode" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
