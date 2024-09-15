"use client";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FaHospital } from "react-icons/fa";
import { navLinks } from "../../constants/index";
import SignInModal from "./SignInModal/SignInModal";
import { Menu, X, ShieldAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signInModalOpen, setSignInModelOpen] = useState(false);
  const [aftersignInModalOpen, setAftersignInModelOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const hadleemergencyclick = () => {
    router.push("/emergency");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 flex gap-2 items-center justify-center font-bold text-xl hover:text-white transition-colors"
          >
            <FaHospital className="text-blue-600 hover:text-blue-700 text-3xl mr-2" />{" "}
            <p className="hidden sm:flex">HealthSync.ai</p>
          </a>

          <nav className="xl:flex hidden">
            <NavItems />
          </nav>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleMenu}
              className="text-neutral-400 bg-slate-900 border-2 border-slate-800 hover:bg-slate-800 p-2 hover:text-white focus:outline-none xl:hidden flex"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-800 p-2 text-white"
              onClick={hadleemergencyclick}
            >
              <ShieldAlertIcon />{" "}
              <p className="hidden sm:flex ml-2">Emergency</p>
            </Button>
            {isSignedIn ? (
              <div className="relative bg-gray-900">
                <Button
                  onClick={() => setAftersignInModelOpen(true)}
                  className="bg-gray-800 hover:bg-gray-900 p-2 rounded-md"
                >
                  <UserButton />
                </Button>
                <SignInModal
                  isOpen={aftersignInModalOpen}
                  onClose={() => setAftersignInModelOpen(false)}
                />
              </div>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-800 p-2 text-white"
                onClick={() => setSignInModelOpen(true)}
              >
                Sign in
              </Button>
            )}

            <SignInModal
              isOpen={signInModalOpen}
              onClose={() => setSignInModelOpen(false)}
            />
          </div>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
