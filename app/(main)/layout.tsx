import type { ReactNode } from "react";
import Header from "@/components/commons/header";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {/* 트립토크·숙박권 구매처럼 공통 헤더가 필요한 화면을 여기서 묶어요. */}
      <Header />
      {children}
    </>
  );
}
