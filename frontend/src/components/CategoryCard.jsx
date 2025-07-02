import React from "react";
const CategoryCard = ({ name, selected, onClick, description }) => {
  return (
    <div
      className={`category-card ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CategoryCard;