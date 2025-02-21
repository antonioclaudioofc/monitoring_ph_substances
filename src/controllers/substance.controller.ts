import { Substance } from "@/models/substance.model";
import { firestore } from "@/services/firestore.service";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export class SubstanceController {
  static instance: SubstanceController | null = null;

  private constructor() {}

  static async getInstance() {
    if (!this.instance) {
      this.instance = new SubstanceController();
    }
    return this.instance;
  }

  async addSubstance(substance: Substance) {
    try {
      await addDoc(collection(firestore, "substance"), {
        date: substance.date.toISOString(),
        location: substance.location,
        substanceName: substance.name,
        pHValue: substance.pHValue,
        notes: substance.notes,
        status: substance.status,
      });
    } catch (error) {
      console.error("Erro ao adicionar documento:", error);
    }
  }

  async getAllSubstance(callback: (substances: Substance[]) => void) {
    try {
      const substanceRef = collection(firestore, "substance");

      const unsubscribe = onSnapshot(substanceRef, (querySnapshot) => {
        const substances: Substance[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            date: new Date(data.date),
            location: data.location,
            substanceName: data.substanceName,
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
