export function filterProducts(
  products,
  {
    maxPrice = null,
    category = null,
    subcategory = null,
    dietaryPreference = null,
    avoidAllergens = [],
  }
) {
  return products.filter((product) => {

    const matchesBudget =
      maxPrice === null || product.price <= maxPrice;

    const matchesCategory =
      category === null || product.category === category;

    const matchesSubcategory =
      subcategory === null || product.subcategory === subcategory;

    const matchesDiet =
      dietaryPreference === null ||
      product.dietaryTags.includes(dietaryPreference);

    const containsAvoidedAllergen =
      avoidAllergens.some((allergen) =>
        product.allergens.includes(allergen)
      );

    const matchesAllergens = !containsAvoidedAllergen;

    return (
      matchesBudget &&
      matchesCategory &&
      matchesSubcategory &&
      matchesDiet &&
      matchesAllergens
    );
  });
}