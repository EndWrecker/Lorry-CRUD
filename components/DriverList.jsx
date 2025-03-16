import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getDrivers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/drivers", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Drivers");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function DriverList() {
  const { drivers } = await getDrivers();
  return (
    <>
      {drivers.map((t) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{t.name}</h2>
            <div>Driver Vehicle</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id}></RemoveBtn>
            <Link href={`/editDriver/${t._id}`}>
              <HiPencilAlt size={24}></HiPencilAlt>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
