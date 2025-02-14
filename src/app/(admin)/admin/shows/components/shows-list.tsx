import DeleteShowForm from "@/app/(admin)/admin/shows/components/delete-show-form";
import EditShowForm from "@/app/(admin)/admin/shows/components/edit-show-form";
import ShowItem from "@/app/(routes)/shows/components/show-item";
import { GetShowProps } from "@/app/api/shows/route";
import InfoCard from "@/components/info-card";
import { cn } from "@/utils/utils";

const ShowsList = ({
  data,
  title,
  noResultMessage,
  setShows,
}: {
  data: GetShowProps[];
  title: string;
  noResultMessage: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
}) => {
  if (data.length === 0) {
    return <InfoCard message={noResultMessage} />;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 py-4">
        <h2 className="text-gray-300">{title}</h2>
        <p className="text-gray-400">({data.length})</p>
      </div>
      {data.map((show) => (
        <ShowItem data={show} key={show.id}>
          <div
            className={cn(
              "flex items-center space-x-4 mt-4 md:mt-0 md:ml-4",
              !show.ticketLink && "mt-0"
            )}
          >
            <EditShowForm id={show.id} initialData={show} setShows={setShows} />
            <DeleteShowForm id={show.id} setShows={setShows} />
          </div>
        </ShowItem>
      ))}
    </>
  );
};

export default ShowsList;
