import styles from "./styles.module.css";

// 로그인 기능이 아직 없어서, 화면 모양을 먼저 채우기 위한 더미 사용자 정보예요.
// 나중에 로그인 API가 생기면 이 값을 로그인한 사용자 정보로 교체하면 돼요.
const USER = {
  name: "김트립",
  email: "triptrip@example.com",
  joinedAt: "2026.03.02 가입",
};

const STATS = [
  { label: "작성한 트립토크", value: 12 },
  { label: "좋아요한 글", value: 34 },
  { label: "예약한 숙소", value: 5 },
];

export default function ProfileSection() {
  return (
    <section className={styles.section}>
      <div className={styles.profileCard}>
        <div className={styles.avatar} aria-hidden="true">
          👤
        </div>

        <div className={styles.info}>
          <h1>{USER.name}</h1>
          <p className={styles.email}>{USER.email}</p>
          <p className={styles.joinedAt}>{USER.joinedAt}</p>
        </div>

        {/* 정보 수정 기능은 아직 없지만, 모양은 먼저 만들어 둬요. */}
        <button className={styles.editButton} type="button">
          정보 수정
        </button>
      </div>

      <div className={styles.statList}>
        {STATS.map((stat) => (
          <div className={styles.statBox} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
