import { GetShowProps } from "@/app/api/shows/route";
import ShowsList from "./shows-list";

const FilteredShows = ({
  data,
  filter,
  setShows,
}: {
  data: GetShowProps[];
  filter: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
}) => {
  if (filter === "upcoming") {
    return (
      <ShowsList
        data={data.filter((show) => new Date(show.date) >= new Date())}
        title={"Prochains Concerts"}
        noResultMessage={"Pas de concerts pour l'instant, ça bosse..."}
        setShows={setShows}
      />
    );
  }
  if (filter === "past") {
    return (
      <ShowsList
        data={data.filter((show) => new Date(show.date) < new Date())}
        title={"Concerts effectués"}
        noResultMessage={"Aucun concerts passés"}
        setShows={setShows}
      />
    );
  }
  if (filter === "all") {
    return (
      <ShowsList
        data={data}
        title={"Tous les concerts"}
        noResultMessage={"Aucun concerts enregistrés"}
        setShows={setShows}
      />
    );
  }
};

export default FilteredShows;
