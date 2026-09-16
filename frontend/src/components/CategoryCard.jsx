function CategoryCard({ category }) {
  return (
    <div className={`category-card ${category.color}`}>

      <div className="category-icon">
        {category.icon}
      </div>

      <div className="category-info">

        <h3>{category.name}</h3>

        <p>{category.description}</p>

      </div>

      <span className="category-arrow">
        →
      </span>

    </div>
  );
}

export default CategoryCard;