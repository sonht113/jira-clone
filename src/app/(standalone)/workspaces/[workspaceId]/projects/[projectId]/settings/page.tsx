import { redirect } from "next/navigation";
import { toast } from "sonner";

import { paths } from "@/constants";
import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface ProjectSettingsPageProps {
  params: {
    projectId: string;
  };
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {
  const user = getCurrent();

  if (!user) {
    return redirect(paths.SIGN_IN);
  }

  const initialValues = await getProject({ projectId: params.projectId });

  if (!initialValues) {
    return toast.error("Project not found");
  }

  return (
    <div className="w-full lg:max-w-lg">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectSettingsPage;
