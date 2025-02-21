import { Substance } from "@/models/substance.model";
import { firestore } from "@/services/firestore.service";
import { collection, onSnapshot } from "firebase/firestore";

export class SubstanceController {
  static instance: SubstanceController | null = null;

  private constructor() {}

  static async getInstance() {
    if (!this.instance) {
      this.instance = new SubstanceController();
    }
    return this.instance;
  }

  async getAllSubstance(callback: (substances: Substance[]) => void) {
    try {
      const substanceRef = collection(firestore, "substances");

      const unsubscribe = onSnapshot(substanceRef, (querySnapshot) => {
        const substances: Substance[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            date: data.date,
            location: data.location,
            pHValue: data.pHValue,
            notes: data.notes,
            status: data.status,
          };
        });

        callback(substances);
      });

      return unsubscribe;
    } catch (error) {
      console.log("Erro ao listar todas as substâncias: ", error);
    }
  }
}
