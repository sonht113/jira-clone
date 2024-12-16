import { redirect } from "next/navigation";
import { paths } from "@/constants";
import { getCurrent } from "@/features/auth/queries";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

const SignUpPage = async () => {
  const user = await getCurrent();

  if (user) redirect(paths.HOME);
  
  return (
    <SignUpCard />
  );
}

export default SignUpPage;