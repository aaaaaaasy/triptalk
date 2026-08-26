"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

export default function Header() {
  const pathname = usePathname();

  const isTripTalkPage = pathname === "/" || pathname.startsWith("/boards");
  const isTravelProductsPage = pathname.startsWith("/travelproducts");
  const isMyPage = pathname.startsWith("/mypage");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label="TripTalk 홈">
          TripTalk
        </Link>

        <nav className={styles.navigation} aria-label="주요 메뉴">
          <Link className={isTripTalkPage ? styles.active : ""} href="/">
            트립토크
          </Link>
          <Link
            className={isTravelProductsPage ? styles.active : ""}
            href="/travelproducts"
          >
            숙박권 구매
          </Link>
          <Link className={isMyPage ? styles.active : ""} href="/mypage">
            마이 페이지
          </Link>
        </nav>

        {/* 로그인 기능은 아직 없어서, 버튼 모양만 먼저 만들어요. */}
        <button className={styles.loginButton} type="button">
          로그인 <span>›</span>
        </button>
      </div>
    </header>
  );
}
