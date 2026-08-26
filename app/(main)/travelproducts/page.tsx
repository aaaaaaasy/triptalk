import ProductSection from "@/components/travelproducts/product-section";
import HeroBanner from "@/components/home/hero-banner";

export default function TravelProductsPage() {
  return (
    <main>
      {/* 트립토크 상세 화면처럼, 숙박권 구매도 메인보다 낮은 배너를 재사용해요. */}
      <HeroBanner small />
      <ProductSection />
    </main>
  );
}
