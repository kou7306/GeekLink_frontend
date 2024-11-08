export interface User {
  user_id: string;
  created_at: Date;
  name: string;
  sex: string;
  age: string;
  place: string;
  top_tech: string;
  top_teches: string[];
  teches: string[];
  hobby?: string;
  occupation: string;
  affiliation?: string;
  qualification: string[];
  editor?: string;
  github?: string;
  twitter?: string;
  qiita?: string;
  zenn?: string;
  atcoder?: string;
  message?: string;
  updated_at?: Date;
  portfolio?: string;
  graduate?: string;
  desired_occupation?: string;
  faculty?: string;
  experience: string[];
  image_url?: string;
  qiita_access_token?: string;
  github_access_token?: string;
  github_username?: string;
  rank?: string;
  level?: string;
  next_level_points?: string;
  life?: string;
  coin?: string;
  items: string[];
  position_x?: string;
  position_y?: string;
  last_login_date?: Date;
  login_streak?: string;
  monthly_login_count?: string;
  total_login_count?: string;
  current_avatar?: string;
  online: boolean;
  motivation?: string;
  start_work_time?: Date;
}

export interface SuggestUsersResponse {
  samePlaceUsers: User[];
  sameAgeUsers: User[];
  sameGraduateYearUsers: User[];
  sameJobTypeUsers: User[];
  sameTopTechUsers: User[];
  sortedUsers: { user: User; score: number }[];
}

export interface Profile {
  user_id: string;
  created_at: Date;
  name: string;
  sex: string;
  age: string;
  place: string;
  top_tech: string;
  top_teches: string[];
  teches: string[];
  hobby?: string;
  occupation?: string;
  affiliation?: string;
  qualification: string[];
  editor?: string;
  github?: string;
  twitter?: string;
  qiita?: string;
  zenn?: string;
  atcoder?: string;
  message?: string;
  updated_at: Date;
  portfolio?: string;
  graduate?: string;
  desired_occupation?: string;
  faculty?: string;
  experience: string[];
  image_url?: string;
}
