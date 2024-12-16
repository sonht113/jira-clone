import { paths } from "@/constants";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const WorkspaceDetalPage = async () => {
  const user = await getCurrent();
  if (!user) redirect(paths.SIGN_IN);
  
  return <div>WorkspaceDetalPage</div>;
};

export default WorkspaceDetalPage;
