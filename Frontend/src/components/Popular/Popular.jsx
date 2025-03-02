import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Popular.css";

import Item from "../Items/Item";
const Popular = () => {
  const [popularProductst, setPopularProductst] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:4000/products/popularinwomen"
    );
    setPopularProductst(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />
      <div className="popular-item">
        {popularProductst.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
