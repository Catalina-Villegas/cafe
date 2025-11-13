import React from "react";
import "../css/index.css";

export default function PriceTag({ precio }) {
  return <p className="price">${precio.toLocaleString()}</p>;
}
