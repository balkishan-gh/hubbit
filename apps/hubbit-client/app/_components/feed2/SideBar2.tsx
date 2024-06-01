import Image from "next/image";
import React from "react";

const imgUrl =
  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

function SideBar2() {
  return (
    <div className="h-full flex flex-col gap-10 p-10 pl-4 pr-20 ">
      <div className="flex gap-2 items-center w-[300px] justify-between">
        <div className="flex gap-2 items-center">
          <Image
            width={45}
            height={45}
            alt="Profile Pic"
            src={imgUrl}
            className="rounded-full border-[2px] border-indigo-600"
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">stfusharme</div>
            <div className="text-sm text-gray-500">Bal Kishan</div>
          </div>
        </div>
        <div className="font-semibold text-indigo-600">Switch</div>
      </div>
      <div className="flex w-[300px] justify-between">
        <div className="text-sm font-semibold">Recommended for you</div>
        <div className="text-sm text-gray-500">See all</div>
      </div>
      <div className="flex gap-2 items-center w-[300px] justify-between">
        <div className="flex gap-2 items-center">
          <Image
            width={45}
            height={45}
            alt="Profile Pic"
            src={imgUrl}
            className="rounded-full border-[2px] border-indigo-600"
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">oyeesharme</div>
            <div className="text-sm text-gray-500">suggestion</div>
          </div>
        </div>
        <div className="font-semibold text-indigo-600">Follow</div>
      </div>
      <div className="flex gap-2 items-center w-[300px] justify-between">
        <div className="flex gap-2 items-center">
          <Image
            width={45}
            height={45}
            alt="Profile Pic"
            src={imgUrl}
            className="rounded-full border-[2px] border-indigo-600"
          />
          <div className="flex flex-col">
            <div className="text-sm font-semibold">radiuspi</div>
            <div className="text-sm text-gray-500">suggestion</div>
          </div>
        </div>
        <div className="font-semibold text-indigo-600">Follow</div>
      </div>
    </div>
  );
}

export default SideBar2;
