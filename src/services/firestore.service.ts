import { getFirestore } from "firebase/firestore";
import { app } from "./firebase.service";

export const firestore = getFirestore(app);
