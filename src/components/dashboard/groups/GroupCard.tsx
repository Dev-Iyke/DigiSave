import { Progress } from '@/components/ui/progress';
import { Group } from '@/interfaces/groups'
import Image from 'next/image'
import React from 'react'

const GroupCard = ({ group }: { group: Group }) => {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-2xl flex flex-col gap-6">
      <div className="flex justify-between items-center gap-8">
        <Image
          src={"/assets/group-img.svg"}
          alt="group image"
          height={30}
          width={30}
        />
        <span className="px-2 py-1 font-normal bg-gray-200 rounded-2xl text-[10px]">
          Active
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-8">
          <h2 className="font-semibold">{group?.groupName}</h2>
          <div className="flex gap-1.5 items-center flex-wrap">
            <span className="font-normal text-gray-400 text-[12px]">
              Payout:{" "}
            </span>
            <strong className="font-semibold text-[#008F4C]">
              N{group?.contributionAmount * group?.membersList?.length}
            </strong>
          </div>
        </div>
        <div className="flex justify-between gap-8">
          <div className="flex gap-1.5 items-center flex-wrap">
            <span className="font-normal text-gray-400 text-[12px]">
              Starting date:{" "}
            </span>
            <strong className="font-semibold text-sm">
              {new Date(group?.createdAt).toLocaleDateString()}
            </strong>
          </div>
          <div className="flex gap-1.5 items-center flex-wrap">
            <span className="font-normal text-gray-400 text-[12px]">
              Amount:{" "}
            </span>
            <strong className="font-semibold text-sm">
              {group?.contributionAmount} Monthly
            </strong>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <Progress value={33} />
          <div className='flex justify-between gap-6 text-red-600 text-[10px]'>
            <span>number {"2,3,4"} available</span>
            <span>{2}/{7} remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard