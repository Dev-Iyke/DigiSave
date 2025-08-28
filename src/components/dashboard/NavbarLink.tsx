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

interface NavbarLinkProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

export default function NavbarLink({
  href,
  label,
  Icon,
}: NavbarLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, startTransition] = useTransition();

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
      <div className={`flex flex-col items-center gap-2`}>
        <div>
          {isTransitioning ? (
            <CustomLoader color={`green`} />
          ) : (
            <Icon
              size={24}
              className={`transition-colors ${
                isActive ? "text-green-600" : "text-gray-300"
              } group-hover:text-white`}
            />
          )}
        </div>

        <p className="body-lg-reg text-[14px]!">{label}</p>
      </div>
    </Link>
  );
}
