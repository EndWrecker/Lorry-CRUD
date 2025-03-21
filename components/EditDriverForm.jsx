"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditDriverForm({ id, name }) {
  const [newName, setNewName] = useState(name);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/drivers/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName }),
      });
      if (!res.ok) {
        throw new Error("Failed to update Driver");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Driver Name"
          />
          <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
            Update Driver
          </button>
        </form>
      </div>
    </>
  );
}
