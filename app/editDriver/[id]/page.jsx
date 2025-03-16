import EditDriverForm from "@/components/EditDriverForm";

const getDriverbyId = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/drivers/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch driver");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function editDriver({ params }) {
  const { id } = await params;
  const { driver } = await getDriverbyId(id);
  const { name } = driver;

  return <EditDriverForm id={id} name={name}></EditDriverForm>;
}
