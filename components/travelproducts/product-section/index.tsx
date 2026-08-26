"use client";

import { useMemo, useState } from "react";
import type { TravelProduct, TravelProductCategory } from "@/types/travel-product";
import styles from "./styles.module.css";

// 아직 상품 조회 API가 없어서, 화면 모양을 먼저 채우기 위한 더미 데이터예요.
// 나중에 fetchTravelProducts 같은 API가 생기면 이 배열을 응답 데이터로 교체하면 돼요.
const TRAVEL_PRODUCTS: TravelProduct[] = [
  {
    _id: "1",
    name: "제주 오션뷰 리조트",
    location: "제주 서귀포",
    category: "리조트",
    price: 189000,
    rating: 4.8,
    reviewCount: 128,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "2",
    name: "강릉 소나무 펜션",
    location: "강원 강릉",
    category: "펜션",
    price: 95000,
    rating: 4.6,
    reviewCount: 76,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "3",
    name: "부산 마린시티 호텔",
    location: "부산 해운대",
    category: "호텔",
    price: 132000,
    rating: 4.7,
    reviewCount: 214,
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "4",
    name: "경주 한옥 게스트하우스",
    location: "경북 경주",
    category: "게스트하우스",
    price: 68000,
    rating: 4.9,
    reviewCount: 52,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "5",
    name: "여수 밤바다 호텔",
    location: "전남 여수",
    category: "호텔",
    price: 118000,
    rating: 4.5,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "6",
    name: "남해 힐링 리조트",
    location: "경남 남해",
    category: "리조트",
    price: 165000,
    rating: 4.6,
    reviewCount: 61,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "7",
    name: "속초 오션뷰 펜션",
    location: "강원 속초",
    category: "펜션",
    price: 89000,
    rating: 4.4,
    reviewCount: 43,
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=640&q=80",
  },
  {
    _id: "8",
    name: "전주 한옥마을 게스트하우스",
    location: "전북 전주",
    category: "게스트하우스",
    price: 59000,
    rating: 4.8,
    reviewCount: 87,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=640&q=80",
  },
];

const CATEGORIES: Array<TravelProductCategory | "전체"> = [
  "전체",
  "호텔",
  "리조트",
  "펜션",
  "게스트하우스",
];

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("전체");

  // 카테고리 버튼은 실제 API 없이도 눈으로 바로 결과를 볼 수 있도록 더미 데이터를 걸러줘요.
  const filteredProducts = useMemo(() => {
    if (activeCategory === "전체") return TRAVEL_PRODUCTS;
    return TRAVEL_PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h1>숙박권 구매</h1>
        <p>여행지에 딱 맞는 숙소를 TripTalk이 골라드려요.</p>
      </div>

      <div className={styles.tools}>
        <div className={styles.categoryTabs} role="tablist" aria-label="숙소 유형">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`${styles.categoryTab} ${
                activeCategory === category ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 정렬 기능은 아직 없지만, 모양은 먼저 만들어 둬요. */}
        <div className={styles.sortBox}>인기순 ▾</div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <article className={styles.card} key={product._id}>
            <div className={styles.imageBox}>
              <img src={product.image} alt={product.name} />
              <span className={styles.badge}>{product.category}</span>
            </div>

            <div className={styles.cardBody}>
              <p className={styles.location}>📍 {product.location}</p>
              <h3>{product.name}</h3>

              <div className={styles.rating}>
                <span className={styles.star}>★</span>
                {product.rating.toFixed(1)}
                <span className={styles.reviewCount}>({product.reviewCount})</span>
              </div>

              <div className={styles.cardBottom}>
                <p className={styles.price}>
                  {formatPrice(product.price)}
                  <span>/박</span>
                </p>

                {/* 상세·결제 기능은 다음 단계에서 연결할 예정이라 지금은 모양만 만들어요. */}
                <button className={styles.buyButton} type="button">
                  예약하기
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredProducts.length === 0 && (
          <p className={styles.empty}>해당 유형의 숙소가 아직 없어요.</p>
        )}
      </div>

      <div className={styles.pagination}>
        <button type="button">‹</button>
        <button className={styles.selected} type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">›</button>
      </div>
    </section>
  );
}
