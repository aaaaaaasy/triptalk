export type ReservationStatus = "예약 완료" | "이용 완료" | "취소";

export type Reservation = {
  _id: string;
  productName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  price: number;
};
