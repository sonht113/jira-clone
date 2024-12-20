import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { paths } from "@/constants";
import { TaskIdClient } from "./client";

const TaskDetailPage = async () => {
  const user = await getCurrent();
  if (!user) redirect(paths.SIGN_IN);

  return <TaskIdClient />;
};

export default TaskDetailPage;
