export type Wellbeing = "good" | "normal" | "bad";

export interface Stream {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  expert_id?: string;
  invite_code: string;
  created_at?: string;
}

export interface Participant {
  id: string;
  full_name: string;
  phone: string;
  consent_given: boolean;
  consent_at?: string | null;
  created_at?: string;
}

export interface StreamParticipation {
  id: string;
  stream_id: string;
  participant_id: string;
  joined_at?: string;
  participation_status: "active" | "completed" | "dropped";
}

export interface DailyReport {
  id: string;
  stream_participation_id: string;
  report_date: string;
  weight?: number | null;
  measurements?: string | null;
  wellbeing?: Wellbeing | null;
  task_completed: boolean;
  notes?: string | null;
  photo_url?: string | null;
  created_at?: string;
}