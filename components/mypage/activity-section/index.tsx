"use client";

import Link from "next/link";
import { useState } from "react";
import type { Board } from "@/types/board";
import type { Reservation } from "@/types/reservation";
import styles from "./styles.module.css";

// 로그인 사용자별 데이터 조회 API가 아직 없어서, 화면 모양을 먼저 채우는 더미 데이터예요.
// 나중에 fetchMyBoards, fetchMyReservations 같은 API가 생기면 이 배열들을 응답 데이터로 교체하면 돼요.
const MY_BOARDS: Board[] = [
  { _id: "1", writer: "김트립", title: "제주도 3박 4일 완벽 코스 공유해요", likeCount: 128, createdAt: "2026-08-20" },
  { _id: "3", writer: "김트립", title: "부산 해운대에서 하루종일 놀기", likeCount: 214, createdAt: "2026-08-18" },
  { _id: "6", writer: "김트립", title: "남해 힐링 여행 2박 3일 후기", likeCount: 61, createdAt: "2026-08-15" },
];

const MY_RESERVATIONS: Reservation[] = [
  {
    _id: "r1",
    productName: "제주 오션뷰 리조트",
    location: "제주 서귀포",
    checkIn: "2026-09-05",
    checkOut: "2026-09-07",
    status: "예약 완료",
    price: 378000,
  },
  {
    _id: "r2",
    productName: "부산 마린시티 호텔",
    location: "부산 해운대",
    checkIn: "2026-07-12",
    checkOut: "2026-07-13",
    status: "이용 완료",
    price: 132000,
  },
  {
    _id: "r3",
    productName: "강릉 소나무 펜션",
    location: "강원 강릉",
    checkIn: "2026-06-01",
    checkOut: "2026-06-02",
    status: "취소",
    price: 95000,
  },
];

const TABS = ["내가 쓴 트립토크", "예약 내역"] as const;
type Tab = (typeof TABS)[number];

const formatDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

const statusClassName = (status: Reservation["status"]) => {
  if (status === "예약 완료") return styles.statusActive;
  if (status === "이용 완료") return styles.statusDone;
  return styles.statusCanceled;
};

export default function ActivitySection() {
  const [activeTab, setActiveTab] = useState<Tab>("내가 쓴 트립토크");

  return (
    <section className={styles.section}>
      <div className={styles.tabs} role="tablist" aria-label="마이페이지 탭">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "내가 쓴 트립토크" && (
        <div className={styles.boardList}>
          {MY_BOARDS.map((board) => (
            <Link className={styles.boardRow} href={`/boards/${board._id}`} key={board._id}>
              <span className={styles.boardTitle}>{board.title}</span>
              <span className={styles.boardMeta}>
                ♡ {board.likeCount} · {formatDate(board.createdAt)}
              </span>
            </Link>
          ))}

          {MY_BOARDS.length === 0 && <p className={styles.empty}>아직 작성한 트립토크가 없어요.</p>}
        </div>
      )}

      {activeTab === "예약 내역" && (
        <div className={styles.reservationList}>
          {MY_RESERVATIONS.map((reservation) => (
            <div className={styles.reservationCard} key={reservation._id}>
              <div className={styles.reservationInfo}>
                <p className={styles.reservationLocation}>📍 {reservation.location}</p>
                <h3>{reservation.productName}</h3>
                <p className={styles.reservationDate}>
                  {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                </p>
              </div>

              <div className={styles.reservationRight}>
                <span className={`${styles.status} ${statusClassName(reservation.status)}`}>
                  {reservation.status}
                </span>
                <p className={styles.reservationPrice}>{reservation.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}

          {MY_RESERVATIONS.length === 0 && (
            <p className={styles.empty}>아직 예약한 숙소가 없어요.</p>
          )}
        </div>
      )}
    </section>
  );
}
