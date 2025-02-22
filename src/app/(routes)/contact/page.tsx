import Title from "@/components/title";
import ContactForm from "./components/contact-form";
import MotionDiv from "@/components/motion-div";

export const metadata = () => {
  return {
    title: "Contact | Okessapar",
    description: "Une question ou un projet ? Remplissez le formulaire et nous vous répondrons rapidement.",
  };
};

const ContactPage = async () => {
  return (
    <MotionDiv className="min-h-[calc(100dvh-64px)] w-full flex flex-col items-center justify-between flex-grow">
      <Title title={"Contact"} />

      <ContactForm />
    </MotionDiv>
  );
};

export default ContactPage;
