import { RequestState } from "../../interfaces";
import { ReactNode } from "react";
import ErrorWarning from "../Errors";
export default function SubmitBox({
  state,
  error,
  defaultComponent,
}: {
  state: RequestState;
  error: string;
  defaultComponent: ReactNode;
}) {
  if (!state) {
    return <button type="submit">{defaultComponent}</button>;
  } else if (state === 1) {
    return (
      <button type="submit">
        <div className="loader black"></div>
        Loading...
      </button>
    );
  } else if (state === 2) {
    return <button type="submit">Registered!</button>;
  } else {
    return (
      <>
        <button type="submit">Failed!</button>
        <ErrorWarning errorText={error} />
      </>
    );
  }
}
