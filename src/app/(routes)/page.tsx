import HomePage from "../home-page";

export const revalidate = Infinity; // Pour que cette page ne soit jamais regénérée côté serveur vu que data change pas -> + rapide

export default function Home() {
  return <HomePage />;
}
