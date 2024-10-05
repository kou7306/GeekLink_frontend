// src/types/event.ts
export type Event = {
  id: string;
  title: string;
  event_type: string;
  owner_id: string;
  max_participants: number;
  participant_ids: string[];
  purpose: string;
  requirements: string;
  deadline: string;
  techs: string[];
  created_at: string;
  updated_at: string | null;
};
