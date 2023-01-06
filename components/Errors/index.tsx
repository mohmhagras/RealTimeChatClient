import { BiErrorAlt } from "react-icons/bi";

export default function ErrorWarning({ errorText }: { errorText: string }) {
  return (
    <p className="horizontal-centered-container error">
      <BiErrorAlt className="icon" />
      {errorText}
    </p>
  );
}
