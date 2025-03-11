import { useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleDollarSign, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "@/data";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(
    localStorage.getItem("role")
  );
  const instructorFirstVisit = localStorage.getItem("instructorFirstVisit");
  const handleRoleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    localStorage.setItem("role", role);

    if (role === "instructor") {
      navigate(
        instructorFirstVisit === "true"
          ? "/instructor/addCourse"
          : "/instructor"
      );
    } else if (role === "student") navigate("/");
    else if (role === "recruiter") navigate("/recruiter");

    try {
      await axios.put(
        `${BASE_URL}/user/changeRole`,
        { role, userId: user?.id },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  return (
    <header className="items-center">
      <nav className="flex flex-row justify-between items-center px-4">
        <Logo size="2xl" />
        <DesktopNav selectedRole={selectedRole} />
        <AuthButtons
          isSignedIn={isSignedIn}
          handleRoleChange={handleRoleChange}
          selectedRole={selectedRole}
        />
        <MobileMenu
          isSignedIn={isSignedIn}
          isOpen={isMobileMenuOpen}
          toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </nav>
    </header>
  );
}

function ShuriCoins() {
  const [userCoins, setUserCoins] = useState(0);
  const { user, isSignedIn } = useUser();
  const fetchUserCoins = async (userId: string | number|undefined) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/getUserByClerk/${userId}`
      );
      return response.data.user.shuriCoins;
    } catch (error) {
      console.error("Error fetching user coins:", error);
      return 0;
    }
  };
  fetchUserCoins(user?.id).then((coins) => setUserCoins(coins));
  return (
    <>
      {isSignedIn && (
        <div className="md:flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 font-poppins hidden">
          <CircleDollarSign size={20} className="text-yellow-500" />
          <span className="text-base font-semibold text-gray-800">
            {userCoins}
          </span>
        </div>
      )}
    </>
  );
}
interface DesktopNavInterface{
  selectedRole:string
}
function DesktopNav({ selectedRole }: DesktopNavInterface) {
  const { isLoaded, isSignedIn } = useUser();
  return (
    <>
      <ul className="hidden md:flex gap-4 items-center">
        {[
          "",
          "assessments",
          "courses",
          "mockInterview",
          "jobs",
          "compiler",
          "resume",
        ].map((path, index) => (
          <NavLink key={index} to={path}>
            <li className="li-style">
              {path ? path.charAt(0).toUpperCase() + path.slice(1) : "Home"}
            </li>
          </NavLink>
        ))}
        <NavLink to="/dsa">
          {" "}
          <li className="li-style">DSA Visualizer</li>
        </NavLink>
      </ul>
      {isLoaded && isSignedIn && <ShuriCoins />}
      <p className="hidden lg:flex">
        {isSignedIn && selectedRole !== "student" && (
          <NavLink
            to={
              selectedRole === "student"
                ? "/dashboard"
                : selectedRole === "instructor"
                ? "/instructor/dashboard"
                : "recruiter/dashboard"
            }
          >
            <Button>My Dashboard</Button>
          </NavLink>
        )}
      </p>
    </>
  );
}

interface AuthButtonsProps {
  isSignedIn: boolean | null;
  selectedRole: string | null;
  handleRoleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isSignedIn,
  handleRoleChange,
  selectedRole,
}) => {
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex space-x-4">
      {!isSignedIn ? (
        <Button
          onClick={() => navigate("/signup")}
          className="bg-blue-700 font-semibold hover:bg-blue-800"
        >
          Login/Sign Up
        </Button>
      ) : (
        <>
          <select
            className="font-semibold cursor-pointer"
            value={selectedRole ?? "student"}
            onChange={handleRoleChange}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <UserButton />
        </>
      )}
    </div>
  );
};

interface MobileMenuProps {
  isSignedIn: boolean | null;
  isOpen: boolean;
  toggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isSignedIn,
  isOpen,
  toggle,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden flex gap-5 flex-row-reverse">
        <button
          onClick={toggle}
          aria-label="Toggle menu"
          className="text-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isSignedIn && <UserButton />}
      </div>
      <div className="flex flex-col">
        {isOpen && (
          <ul className="">
            {[
              "",
              "courses",
              "assessments",
              "mockInterview",
              "jobs",
              "compiler",
            ].map((path, index) => (
              <NavLink key={index} to={`/${path}`} onClick={toggle}>
                <li className="li-style">
                  {path ? path.charAt(0).toUpperCase() + path.slice(1) : "Home"}
                </li>
              </NavLink>
            ))}

            <div className="flex flex-col items-start">
              <button
                onClick={() =>
                  isSignedIn ? navigate("/dashboard") : navigate("/signup")
                }
                className="p-2 font-semibold"
              >
                {isSignedIn ? "Dashboard" : "Login/Sign Up"}
              </button>

              {isSignedIn && (
                <select className="font-semibold cursor-pointer mt-4">
                  <option value="">Switch Role</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              )}
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default NavBar;
