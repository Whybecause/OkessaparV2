"use client";

import MotionDiv from "@/components/motion-div";

const AdminPage = () => {
  return (
    <div>
      <h1 className="py-6 text-center">Admin Dashboard</h1>
      <MotionDiv className="flex mt-6">
        <div className="max-w-4xl mx-auto flex flex-col bg-gray-900/50  p-8 rounded-md gap-y-4">
          <p className="break-all">C&apos;est ici pour gérer le site</p>
        </div>
      </MotionDiv>
    </div>
  );
};

export default AdminPage;
