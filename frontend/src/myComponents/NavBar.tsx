import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  CircleDollarSign,
  Menu,
  ChevronDown,
  Home,
  BookOpen,
  FileCheck,
  Video,
  Briefcase,
  Code,
  FileText,
  LayoutDashboard,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { BASE_URL } from "@/data";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "./Logo";
import LanguageTranslator from "./GoogleTranslate";

// Navigation items with icons
const navigationItems = [
  { path: "", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
  {
    path: "assessments",
    label: "Assessments",
    icon: <FileCheck className="h-4 w-4 mr-2" />,
  },
  {
    path: "courses",
    label: "Courses",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
  },
  {
    path: "mockInterview",
    label: "Mock Interview",
    icon: <Video className="h-4 w-4 mr-2" />,
  },
  { path: "jobs", label: "Jobs", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  {
    path: "compiler",
    label: "Compiler",
    icon: <Code className="h-4 w-4 mr-2" />,
  },
  {
    path: "resume",
    label: "Resume",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    path: "dsa",
    label: "DSA Visualizer",
    icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
  },
];

function NavBar() {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<string | null>(
    localStorage.getItem("role") || "student"
  );
  const instructorFirstVisit = localStorage.getItem("instructorFirstVisit");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoleChange = async (role: string) => {
    setSelectedRole(role);
    localStorage.setItem("role", role);

    if (role === "instructor") {
      navigate("/instructor/addCourse");
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Logo size="2xl" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={`/${item.path}`}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === `/${item.path}`
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="ml-2">
              <LanguageTranslator />
            </div>
          </div>

          {/* Right side - Auth & Actions */}
          <div className="flex items-center space-x-4">
            {isSignedIn && <ShuriCoins userId={user?.id} />}

            {isSignedIn && selectedRole !== "student" && (
              <Link
                to={
                  selectedRole === "student"
                    ? "/dashboard"
                    : selectedRole === "instructor"
                    ? "/instructor/dashboard"
                    : "recruiter/dashboard"
                }
                className="hidden md:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}

            {!isSignedIn ? (
              <Button
                onClick={() => navigate("/signup")}
                className="bg-primary hover:bg-primary/90"
              >
                Login / Sign Up
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                <RoleSelector
                  selectedRole={selectedRole}
                  handleRoleChange={handleRoleChange}
                />
                <UserButton afterSignOutUrl="/" />
              </div>
            )}

            {/* Mobile Menu */}
            <MobileNavigation
              isSignedIn={isSignedIn}
              selectedRole={selectedRole}
              handleRoleChange={handleRoleChange}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

function ShuriCoins({ userId }: { userId: string | undefined }) {
  const [userCoins, setUserCoins] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchUserCoins = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/user/getUserByClerk/${userId}`
        );
        setUserCoins(response.data.user.shuriCoins);
      } catch (error) {
        console.error("Error fetching user coins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCoins();
  }, [userId]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-amber-200 font-medium">
            <CircleDollarSign size={18} className="text-amber-500" />
            <span
              className={`text-sm font-semibold text-gray-800 ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading ? "..." : userCoins}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your Shuri Coins balance</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface RoleSelectorProps {
  selectedRole: string | null;
  handleRoleChange: (role: string) => void;
}

function RoleSelector({ selectedRole, handleRoleChange }: RoleSelectorProps) {
  const roleLabels = {
    student: "Student",
    instructor: "Instructor",
    recruiter: "Recruiter",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center"
        >
          {roleLabels[selectedRole as keyof typeof roleLabels] || "Student"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(roleLabels).map(([role, label]) => (
          <DropdownMenuItem
            key={role}
            className={selectedRole === role ? "bg-primary/10 font-medium" : ""}
            onClick={() => handleRoleChange(role)}
          >
            {label}
            {selectedRole === role && (
              <Badge
                variant="outline"
                className="ml-2 bg-primary/10 text-primary border-primary/20"
              >
                Active
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface MobileNavigationProps {
  isSignedIn: boolean | null;
  selectedRole: string | null;
  handleRoleChange: (role: string) => void;
}

function MobileNavigation({
  isSignedIn,
  selectedRole,
  handleRoleChange,
}: MobileNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={`/${item.path}`}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === `/${item.path}`
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t">
            {isSignedIn ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UserButton />
                    <span className="text-sm font-medium">Your Account</span>
                  </div>
                  <ShuriCoins userId={undefined} />
                </div>

                {/* Role Selection */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Switch Role</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["student", "instructor", "recruiter"].map((role) => (
                      <Button
                        key={role}
                        variant={selectedRole === role ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-center capitalize"
                        onClick={() => handleRoleChange(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Dashboard Link */}
                {selectedRole !== "student" && (
                  <Button
                    variant="outline"
                    className="w-full justify-start mt-2"
                    onClick={() =>
                      navigate(
                        selectedRole === "student"
                          ? "/dashboard"
                          : selectedRole === "instructor"
                          ? "/instructor/dashboard"
                          : "recruiter/dashboard"
                      )
                    }
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                )}
              </>
            ) : (
              <Button className="w-full" onClick={() => navigate("/signup")}>
                Login / Sign Up
              </Button>
            )}

            <div className="mt-4">
              <LanguageTranslator />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NavBar;
