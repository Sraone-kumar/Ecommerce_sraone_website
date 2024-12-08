import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";

export default function HomePage() {
  const category = [
    { name: "Tablets", image: "/images/categories/tabs.jpg" },
    { name: "Monitors", image: "/images/categories/monitors.jpg" },
    { name: "Games", image: "/images/categories/games.jpg" },
    { name: "consoles", image: "/images/categories/consoles.jpg" },
    { name: "GPUs", image: "/images/categories/gpus.jpg" },
    { name: "Electronics", image: "/images/categories/electronics.jpg" },
    { name: "Ram Sticks", image: "/images/categories/ramstick.jpg" },
    { name: "Hard Drives", image: "/images/categories/harddrives.jpg" },
  ];

  return (
    <div>
      <ProductCarouselComponent />
      <div className="items-center justify-center p-10  flex flex-wrap gap-10">
        {category.map((card, index) => {
          return <CategoryCardComponent key={card.name} data={card} />;
        })}
      </div>
    </div>
  );
}
