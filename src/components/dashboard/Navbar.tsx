import { Home, MoreHorizontal, UserPlus, UsersIcon } from "lucide-react";
import React from "react";
import NavbarLink from "./NavbarLink";

interface NavbarLinkProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}
const DashboardNavbar = () => {
  const navbarLinks: NavbarLinkProps[] = [
    {
      href: "/dashboard",
      label: "Home",
      Icon: Home,
    },
    {
      href: "/dashboard/join-group",
      label: "Join Group",
      Icon: UsersIcon,
    },
    {
      href: "/dashboard/create-group",
      label: "Create Group",
      Icon: UserPlus,
    },
    {
      href: "/dashboard/more",
      label: "More",
      Icon: MoreHorizontal,
    },
  ];
  return (
    <div>
      <div className="flex justify-between p-4 gap-6 bg-gray-200">
        {navbarLinks.map((nl, i) => (
          <NavbarLink key={i} label={nl.label} href={nl.href} Icon={nl.Icon} />
        ))}
      </div>
    </div>
  );
};

export default DashboardNavbar;
