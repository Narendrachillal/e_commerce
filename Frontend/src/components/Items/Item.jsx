import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`}>
        <img
          onClick={window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })}
          src={image}
          alt=""
        />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">Rs {new_price}</div>
        <div className="item-price-old">Rs {old_price}</div>
      </div>
    </div>
  );
};

export default Item;
