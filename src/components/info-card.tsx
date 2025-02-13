import MotionDiv from "./motion-div";

const InfoCard = ({ message = "" }: { message: string }) => {
  return (
    <MotionDiv className="flex mt-6">
      <div className="max-w-4xl mx-auto flex flex-col bg-gray-900/50 p-8 rounded-md gap-y-4">
        <p className="break-all">{message}</p>
      </div>
    </MotionDiv>
  );
};

export default InfoCard;
