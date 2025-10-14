import { getProSessionCookie, getSessionCookie } from "@/utils/auth";
import ProPage from "./components/ProPage";
import ProLogin from "./components/ProLogin";
import Title from "@/components/title";

export default async function Page() {
  const proSession = await getProSessionCookie();
  const adminSession = await getSessionCookie();

  return (
    <div className="px-4">
      <Title
        title="Espace professionnels"
        description="Téléchargez les différents médias d'Okessapar"
      />
      {adminSession || proSession ? <ProPage /> : <ProLogin />}
    </div>
  );
}
