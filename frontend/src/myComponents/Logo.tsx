import { Link } from "react-router";
import { logo } from "../data";

function Logo({ size = "2xl" }) {
  return (
    <Link
      to="/"
      className="font-Inter font-bold tracking-wide flex gap-2 items-center p-4 "
    >
      <img src={logo} alt="logo" className="w-12 h-12 " />
      <div className="flex flex-col">
        <h2 className={`text-blue-600 text-${size}  font-poppins tracking-wide`}>Shuriken</h2>
        <sub className="text-sm text-start font-medium tracking-wide font-poppins ">sure you can</sub>
      </div>
    </Link>
  );
}

export default Logo;
