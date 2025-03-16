"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function addDriver() {
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/drivers", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add a Driver");
      }
    } catch (error) {}
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Driver Name"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Driver
      </button>
    </form>
  );
}
