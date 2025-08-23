"use client";
import CustomLoader from "@/components/CustomLoader";
import DashboardNavbar from "@/components/dashboard/Navbar";
import { useAuthInit } from "@/hooks/initializeAuth";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthInit();
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col gap-6 justify-between min-h-[90vh]">
      {auth.isUserLoading ? (
        <div className="h-screen flex justify-center items-center w-full">
          <CustomLoader color="green" />
        </div>
      ) : (
        <>
          <div>{children}</div>
          <div>
            <DashboardNavbar />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
