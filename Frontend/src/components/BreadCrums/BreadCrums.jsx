import React from "react";
import "./BreadCrums.css";
import arrow_icon from "../assets/breadcrum_arrow.png";

// const BreadCrums = (props) => {
//   const { product } = props;
//   return (
//     <div className="breadcrums">
//       HOME <img src={arrow_icon} alt="" />
//       SHOP <img src={arrow_icon} alt="" />
//       {product?.category} <img src={arrow_icon} alt="" />
//       {product?.name} <img src={arrow_icon} alt="" />
//     </div>
//   );
// };
const BreadCrums = ({ product }) => {
  if (!product) {
    return <div className="breadcrums">Loading...</div>;
  }

  return (
    <div className="breadcrums">
      HOME <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product?.category} <img src={arrow_icon} alt="" />
      {product?.name} <img src={arrow_icon} alt="" />
    </div>
  );
};

export default BreadCrums;
