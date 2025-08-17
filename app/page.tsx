import Hero from "./components/Home/Hero";
import BestOffer from "./components/Home/BestOffer";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />  
      <BestOffer />
    </div>
  );
}
