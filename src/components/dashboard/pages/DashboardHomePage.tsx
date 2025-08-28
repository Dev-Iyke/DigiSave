'use client'
import { useAuthInit } from '@/hooks/initializeAuth'
import { useFetchAllGroups } from '@/lib/apiLibrary/queryHooks/groups'
import { RootState } from '@/store'
import React, { useTransition } from 'react'
import { useSelector } from 'react-redux'
import GroupCard from '../groups/GroupCard'
import { Button } from '@/components/ui/button'
import CustomLoader from '@/components/CustomLoader'
import { useRouter } from 'next/navigation'

const DashboardHomePage = () => {
    useAuthInit();
    const router = useRouter()
    const [isTransitioning, startTransition] = useTransition()
    const user = useSelector((state: RootState) => state.auth.user);
    const {data: allGroups, isPending} = useFetchAllGroups()
    return (
      <div className="flex flex-col gap-6">
        <Button
          disabled={isTransitioning}
          onClick={() =>
            startTransition(() => router.push("/dashboard/create-group"))
          }
          className="w-fit font-normal"
        >
          Create Group {isTransitioning && <CustomLoader />}
        </Button>
        <h1 className="header2">EXPLORE AVAILABLE GROUPS</h1>
        <>
          {isPending ? (
            <div className="h-screen flex justify-center items-center w-full">
              <CustomLoader color="green" />
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {allGroups?.map((group) => (
                <GroupCard key={group?._id} group={group} />
              ))}
            </div>
          )}
        </>
      </div>
    );
}

export default DashboardHomePage