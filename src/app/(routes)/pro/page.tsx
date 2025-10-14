import { getProSessionCookie, getSessionCookie } from "@/utils/auth";
import ProPage from "./components/ProPage";
import ProLogin from "./components/ProLogin";

export default async function Page() {
  const proSession = await getProSessionCookie();
  const adminSession = await getSessionCookie();

  if (!adminSession && !proSession) {
    return <ProLogin />;
  }

  return <ProPage />;
}
