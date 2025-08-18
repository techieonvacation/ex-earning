import Hero from "./components/Home/Hero";
import BestOffer from "./components/Home/BestOffer";
import BestProduct from "./components/Home/BestProduct";
import CategorySection from "./components/Home/Category";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />  
      <BestOffer />
      <CategorySection />
      <BestProduct />
    </div>
  );
}
