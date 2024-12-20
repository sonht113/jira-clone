import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { paths } from "@/constants";

const TasksPage = async () => {
  const user = await getCurrent();

  if (!user) redirect(paths.SIGN_IN);

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher />
    </div>
  );
};

export default TasksPage;
