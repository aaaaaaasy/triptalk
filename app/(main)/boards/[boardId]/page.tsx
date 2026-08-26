import HeroBanner from "@/components/home/hero-banner";

type BoardDetailPageProps = {
  params: Promise<{ boardId: string }>;
};

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
  const { boardId } = await params;

  return (
    <main>
      {/* 상세 페이지는 메인보다 낮은 배너를 재사용해요. */}
      <HeroBanner small />
      <p style={{ padding: "60px 20px", textAlign: "center", color: "#6f6f6f" }}>
        {boardId}번 게시글 상세 화면은 다음 과제에서 채워요.
      </p>
    </main>
  );
}
