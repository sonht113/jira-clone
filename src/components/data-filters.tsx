import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { DatePicker } from "@/components/date-picker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";
import { TaskStatus } from "@/features/tasks/types";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
}

export const DataFilters: React.FC<DataFiltersProps> = ({
  hideProjectFilter,
}) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.documents.map((project) => ({
    label: project.name,
    value: project.$id,
  }));

  const memberOptions = members?.documents.map((member) => ({
    label: member.name,
    value: member.$id,
  }));

  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : value });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : value });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          <SelectItem
            value={TaskStatus.BACKLOG}
            className="cursor-pointer font-medium"
          >
            Backlog
          </SelectItem>
          <SelectItem
            value={TaskStatus.TODO}
            className="cursor-pointer font-medium"
          >
            To Do
          </SelectItem>
          <SelectItem
            value={TaskStatus.IN_PROGRESS}
            className="cursor-pointer font-medium"
          >
            In Progress
          </SelectItem>
          <SelectItem
            value={TaskStatus.IN_REVIEW}
            className="cursor-pointer font-medium"
          >
            In Review
          </SelectItem>
          <SelectItem
            value={TaskStatus.DONE}
            className="cursor-pointer font-medium"
          >
            Done
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer">
            All assignees
          </SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem
              key={member.value}
              value={member.value}
              className="cursor-pointer font-medium"
            >
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectChange(value)}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All projects
            </SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem
                key={project.value}
                value={project.value}
                className="cursor-pointer font-medium"
              >
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        placeholder="Due date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
};
