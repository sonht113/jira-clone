"use server";

import { redirect } from "next/navigation";
import { toast } from "sonner";

import { paths } from "@/constants";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";

interface WorkspaceIdSettingsPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdSettingsPage = async ({ params }: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();

  if (!user) redirect(paths.SIGN_IN);

  const initialValues = await getWorkspace({
    workspaceId: params.workspaceId,
  })

  if (!initialValues) {
    return toast.error("Workspace not found");
    // redirect(`/workspaces/${params.workspaceId}`)
  };

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
