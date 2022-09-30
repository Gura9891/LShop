import React from "react";
import { NavLink } from "react-router-dom";
export default function ProductCard(props) {
  const { product } = props;
  
  return (
    <div className="card">
      <div className="favorite-item">
        <i class="fa-solid fa-heart"></i>
      </div>
      <img className="w-75 ms-5" src={product.image} alt="..." />
      <div className="card-body">
        <h2>{product.name}</h2>
        <p>{product.shortDescription}</p>
      </div>
      <div className="card-footer">
        <NavLink to={`/detail/${product.id}`} className="btn" onClick={() => {  window.scrollTo(0, 0); }}>
          Buy Now
        </NavLink>
        <span>{product.price}$</span>
      </div>
    </div>
  );
}
