import { FiLogIn } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
export default function Register() {
  return (
    <form>
      <div className="vertical-left-aligned-container">
        <label>
          Username<sup className="required-sup">*</sup>
        </label>
        <input type="text" placeholder="john31" />
      </div>
      <div className="vertical-left-aligned-container">
        <label>Profile picture</label>
        <input type="file" placeholder="john31" />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Password<sup className="required-sup">*</sup>
        </label>
        <input type="password" placeholder="••••••••••" />
      </div>
      <div className="vertical-left-aligned-container">
        <label>
          Confirm Password<sup className="required-sup">*</sup>
        </label>
        <input type="password" placeholder="••••••••••" />
      </div>
      <button type="submit">
        <IoCreateOutline className="icon" />
        Register
      </button>
    </form>
  );
}
