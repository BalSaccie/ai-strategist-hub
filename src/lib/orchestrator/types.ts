export type SourceType = "vault" | "folder" | "email" | "code" | "cloud";

export interface MemorySource {
  id: string;
  name: string;
  type: SourceType;
  itemCount: number;
  lastSynced: string;
  enabled: boolean;
}

export interface UsedSource {
  id: string;
  label: string;
  primary?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  streaming?: boolean;
  sources?: UsedSource[];
  model?: string;
}

export type ActivityStatus = "pending" | "done" | "error";

export interface ActivityEntry {
  id: string;
  code: string;
  description: string;
  status: ActivityStatus;
  time: string;
}

export const SOURCE_CODE: Record<SourceType, string> = {
  vault: "VA",
  folder: "PR",
  email: "GM",
  code: "GH",
  cloud: "DL",
};
