import { FiLogIn } from "react-icons/fi";

export default function Login() {
  return (
    <form>
      <div className="vertical-left-aligned-container">
        <label>
          Username<sup className="required-sup">*</sup>
        </label>
        <input type="text" placeholder="john31" />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Password<sup className="required-sup">*</sup>
        </label>
        <input type="password" placeholder="••••••••••" />
      </div>
      <button type="submit">
        <FiLogIn className="icon" />
        Login
      </button>
    </form>
  );
}
