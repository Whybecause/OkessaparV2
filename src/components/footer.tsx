import { getSessionCookie } from "@/utils/auth";
import LoginForm from "./login-form";

const Footer = async () => {
  const session = await getSessionCookie();

  const year = new Date().getFullYear();

  return (
    <footer className="flex w-full border-t border-gray-500 p-4">
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-300">© {year} Okessapar</p>
      </div>
      {!session && <LoginForm />}
    </footer>
  );
};

export default Footer;
