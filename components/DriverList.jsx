import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

export default function DriverList() {
  return (
    <>
      <div>
        <div>
          <h2>Driver Name</h2>
          <div>Driver Vehicle</div>
        </div>

        <div>
          <RemoveBtn></RemoveBtn>
          <Link href={"/editDriver/123"}>
            <HiPencilAlt sixze={24}></HiPencilAlt>
          </Link>
        </div>
      </div>
    </>
  );
}
