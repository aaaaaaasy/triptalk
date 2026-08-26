import ActivitySection from "@/components/mypage/activity-section";
import ProfileSection from "@/components/mypage/profile-section";

export default function MyPage() {
  return (
    <main>
      {/* 마이페이지는 배너 대신 프로필 카드로 화면을 시작해요. */}
      <ProfileSection />
      <ActivitySection />
    </main>
  );
}
