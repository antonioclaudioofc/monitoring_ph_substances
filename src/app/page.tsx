"use client";

import { SubstanceController } from "@/controllers/substance.controller";
import { Substance } from "@/models/substance.model";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-blue-50">
      <section className="mx-auto max-w-7xl py-10">
        <h3 className="text-4xl font-bold mb-5 text-center">
          Monitoramento do pH
        </h3>
        <SubtanceList />
      </section>
    </main>
  );
}

function SubtanceList() {
  const [substances, setSubstances] = useState<Substance[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const controller = await SubstanceController.getInstance();

      unsubscribe = await controller.getAllSubstance((data) => {
        setSubstances(data);
      });
    })();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {substances.length > 0 ? (
        substances.map((substance, index) => (
          <div
            key={index}
            className="p-6 rounded-md shadow-md text-gray-700 bg-gray-50 border-gray-200"
          >
            <h2 className="text-xl text-center font-bold mb-2">
              {substance.name}
            </h2>
            <p className="text-lg">
              📅{" "}
              {new Date(substance.date)
                .toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
                .replace(",", " às")}
            </p>
            <p className="text-lg">📍 {substance.location}</p>
            <p className="text-lg font-semibold">💧 pH: {substance.pHValue}</p>
            <p className="text-lg">
              Descrição:{" "}
              {substance.notes.length === 0 ? "Nenhuma" : substance.notes}
            </p>
            <p className="text-lg">Status: {substance.status}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-500 col-span-3">
          Nenhuma substância cadastrada.
        </p>
      )}
    </div>
  );
}
