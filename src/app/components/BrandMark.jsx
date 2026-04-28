import { Link } from "react-router-dom";
import logoMark from "../../assets/logo-mark.svg";

function BrandMark({ to = "/", compact = false }) {
  return (
    <Link className="brand-mark" to={to}>
      <img src={logoMark} alt="Online Workshop Management Platform" />
      {!compact && (
        <span>
          Online Workshop
          <br />
          Management Platform
        </span>
      )}
    </Link>
  );
}

export default BrandMark;
