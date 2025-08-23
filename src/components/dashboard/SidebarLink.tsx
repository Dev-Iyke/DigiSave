"use client";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import CustomLoader from "../CustomLoader";

interface SidebarLinkProps {
  href: string;
  label: string;
  Icon: React.ElementType;
  isCollapsed: boolean;
}

export default function SidebarLink({
  href,
  label,
  Icon,
  isCollapsed,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();

  // Accommodate both student and sponsor dashboards
  const isActive =
    (href === "/dashboard" && pathname === "/dashboard") ||
    (pathname.startsWith(href) && href !== "/dashboard");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link className="block" href={href} onClick={handleClick}>
      <div className={`flex flex-col`}>
        <div>
          {isTransitioning ? (
            <CustomLoader color={`green`} />
          ) : (
            <Icon
              size={24}
              className={`transition-colors ${
                isActive ? "text-green-600" : "text-[#6B7280]"
              } group-hover:text-white`}
            />
          )}
        </div>

        <p className="body-lg-reg">{label}</p>
      </div>
    </Link>
  );
}
