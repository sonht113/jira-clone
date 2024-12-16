import { redirect } from "next/navigation";
import { paths } from "@/constants";
import { getCurrent } from "@/features/auth/queries";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

const WorkspaceCreatePage = async () => {
  const user = await getCurrent();
  if (!user) redirect(paths.SIGN_IN);

  return (
    <div className="w-full lg:max-w-xl">
      <CreateWorkspaceForm />
    </div>
  );
};

export default WorkspaceCreatePage;
