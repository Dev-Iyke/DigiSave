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
    <div className="flex flex-col min-h-screen font-montserrat">
      {auth.isUserLoading ? (
        <div className="h-screen flex justify-center items-center w-full">
          <CustomLoader color="green" />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pb-20 p-6">{children}</div>
          <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
            <div className="w-full max-w-[450px] mx-auto">
              <DashboardNavbar />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
