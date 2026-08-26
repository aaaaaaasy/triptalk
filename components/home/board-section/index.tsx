"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Board } from "@/types/board";
import styles from "./styles.module.css";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=640&q=80",
];

// 아직 게시글 조회 API가 없어서, 화면 모양을 먼저 채우기 위한 더미 데이터예요.
// 나중에 fetchBoards 같은 API가 생기면 이 배열을 응답 데이터로 교체하면 돼요.
const BOARDS: Board[] = [
  { _id: "1", writer: "여행러버", title: "제주도 3박 4일 완벽 코스 공유해요", likeCount: 128, createdAt: "2026-08-20" },
  { _id: "2", writer: "바다향기", title: "강릉 감성 숙소 후기 (사진 많음)", likeCount: 76, createdAt: "2026-08-19" },
  { _id: "3", writer: "산책하는곰", title: "부산 해운대에서 하루종일 놀기", likeCount: 214, createdAt: "2026-08-18" },
  { _id: "4", writer: "경주사람", title: "경주 한옥 게스트하우스 다녀왔어요", likeCount: 52, createdAt: "2026-08-17" },
  { _id: "5", writer: null, title: "여수 밤바다 야경 명소 정리", likeCount: 98, createdAt: "2026-08-16" },
  { _id: "6", writer: "남해러버", title: "남해 힐링 여행 2박 3일 후기", likeCount: 61, createdAt: "2026-08-15" },
  { _id: "7", writer: "속초냥이", title: "속초 오션뷰 펜션 예약 꿀팁", likeCount: 43, createdAt: "2026-08-14" },
  { _id: "8", writer: "전주식객", title: "전주 한옥마을 먹거리 총정리", likeCount: 87, createdAt: "2026-08-13" },
  { _id: "9", writer: "제주바람", title: "제주 오름 트레킹 코스 추천", likeCount: 39, createdAt: "2026-08-12" },
  { _id: "10", writer: "강릉커피", title: "강릉 카페거리 인생샷 스팟", likeCount: 65, createdAt: "2026-08-11" },
];

const formatDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

export default function BoardSection() {
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");

  const filteredBoards = useMemo(() => {
    if (submittedKeyword === "") return BOARDS;
    return BOARDS.filter((board) => board.title.includes(submittedKeyword));
  }, [submittedKeyword]);

  const hotBoards = BOARDS.slice(0, 4);
  const displayedBoards = filteredBoards.slice(0, 10);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedKeyword(keyword);
  };

  return (
    <section className={styles.section}>
      <div className={styles.hotSection}>
        <h2>오늘 핫한 트립토크</h2>

        <div className={styles.cardList}>
          {hotBoards.map((board, index) => (
            <Link className={styles.card} href={`/boards/${board._id}`} key={board._id}>
              <img className={styles.cardImage} src={CARD_IMAGES[index]} alt="여행지" />

              <div className={styles.cardContent}>
                <h3>{board.title}</h3>

                <p className={styles.writer}>
                  <span className={styles.avatar}>👤</span>
                  {board.writer ?? "익명"}
                </p>

                <div className={styles.cardBottom}>
                  <span>♡ {board.likeCount}</span>
                  <time>{formatDate(board.createdAt)}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.boardArea}>
        <h2>트립토크 게시판</h2>

        <div className={styles.tools}>
          <form className={styles.search} onSubmit={onSubmitSearch}>
            {/* 날짜 검색은 모양만 먼저 만들어요. */}
            <div className={styles.dateBox}>▣&nbsp;&nbsp; YYYY. MM. DD - YYYY. MM. DD</div>

            <label className={styles.searchBox}>
              <span>⌕</span>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="제목을 검색해 주세요."
              />
            </label>

            <button className={styles.searchButton} type="submit">검색</button>
          </form>

          {/* 등록 화면의 기능은 없지만, 빈 페이지로 이동하는 것부터 연습해요. */}
          <Link className={styles.writeButton} href="/boards/new">
            ▣&nbsp; 트립토크 등록
          </Link>
        </div>

        <div className={styles.tableBox}>
          <div className={`${styles.row} ${styles.head}`}>
            <span className={styles.number}>번호</span>
            <span className={styles.titleCell}>제목</span>
            <span className={styles.writerCell}>작성자</span>
            <span className={styles.dateCell}>날짜</span>
          </div>

          {displayedBoards.map((board, index) => (
            <div className={styles.row} key={board._id}>
              <span className={styles.number}>{displayedBoards.length - index}</span>
              <Link className={styles.titleCell} href={`/boards/${board._id}`}>
                {board.title}
              </Link>
              <span className={styles.writerCell}>{board.writer ?? "익명"}</span>
              <time className={styles.dateCell}>{formatDate(board.createdAt)}</time>
            </div>
          ))}

          {displayedBoards.length === 0 && (
            <p className={styles.empty}>검색 결과가 없어요.</p>
          )}

          <div className={styles.pagination}>
            <button type="button">‹</button>
            <button className={styles.selected} type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
            <button type="button">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
