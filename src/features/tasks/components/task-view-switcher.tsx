"use client";

import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataFilters } from "@/components/data-filters";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { DataKanban } from "./data-kanban";
import { colums } from "./columns";

export const TaskViewSwitcher = () => {
  const [{ projectId, assigneeId, status, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const workspaceId = useWorkspaceId();
  const { open } = useCreateTaskModal();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  });
  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={colums} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
