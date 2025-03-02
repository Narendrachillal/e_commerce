import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import Item from "../Items/Item";
import axios from "axios";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  const fetchNewCollections = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/products/newcollections"
      );
      setNew_collection(response.data);
    } catch (error) {
      console.error("Error fetching new collections:", error.message);
    }
  };

  useEffect(() => {
    fetchNewCollections();
  }, []);

  return (
    <div className="new-collection">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => (
          <Item
            key={item.id || i} // Use unique `id` if available
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
