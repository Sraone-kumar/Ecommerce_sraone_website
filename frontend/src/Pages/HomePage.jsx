import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";

export default function HomePage() {
  const category = [
    "Tablets",
    "monitors",
    "Games",
    "consoles",
    "GPUs",
    "Electronics",
    "Rams",
    "HardDrives",
  ];

  return (
    <div>
      <ProductCarouselComponent />
      <div className="items-center justify-center p-10  flex flex-wrap gap-10">
        {category.map((card, index) => {
          return <CategoryCardComponent key="index" data={card} />;
        })}
      </div>
    </div>
  );
}
