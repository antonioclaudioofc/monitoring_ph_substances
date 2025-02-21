import { Timestamp } from "firebase/firestore";

export interface Substance {
  name: string;
  date: Timestamp;
  location: string;
  pHValue: number;
  notes: string;
  status: string;
}
