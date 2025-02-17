import { GetShowProps } from "@/app/api/shows/route";
import ShowsList from "./shows-list";
import { SHOWS_FILTER } from "@/constant/api-params";

const FilteredShows = ({
  data,
  filter,
  setShows,
}: {
  data: GetShowProps[];
  filter: string;
  setShows: React.Dispatch<React.SetStateAction<GetShowProps[]>>;
}) => {
  if (filter === SHOWS_FILTER.upcoming) {
    return (
      <ShowsList
        data={data.filter((show) => new Date(show.date) >= new Date())}
        title={"Concerts à venir"}
        noResultMessage={"Pas de concerts pour l'instant, ça bosse..."}
        setShows={setShows}
      />
    );
  }
  if (filter === SHOWS_FILTER.past) {
    return (
      <ShowsList
        data={data.filter((show) => new Date(show.date) < new Date())}
        title={"Concerts passés"}
        noResultMessage={"Aucun concerts passés"}
        setShows={setShows}
      />
    );
  }
  if (filter === SHOWS_FILTER.all) {
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
