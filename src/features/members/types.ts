import { Models } from "node-appwrite";

export enum WorkspaceRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Models.Document & {
  userId: string;
  name: string;
  role: MemberRole;
  workspaceId: string;
};
