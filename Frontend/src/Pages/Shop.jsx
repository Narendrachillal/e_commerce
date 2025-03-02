import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Popular from "../components/Popular/Popular.jsx";
import Offers from "../components/Offers/Offers.jsx";
import NewCollections from "../components/Newcollections/NewCollections.jsx";
import NewsLetter from "../components/NewsLetter/NewsLetter.jsx";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
