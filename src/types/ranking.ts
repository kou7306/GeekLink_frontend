interface BaseUserRanking {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  rank: number;
  name: string;
  image: string;
}

interface UserRankingWithActivity extends BaseUserRanking {
  activity_score: number;
}

interface UserRankingWithContribution extends BaseUserRanking {
  contribution_count: number;
}

interface UserRankingWithStar extends BaseUserRanking {
  total_stars: number;
}

interface UserRankingWithQiita extends BaseUserRanking {
  score: number;
}

export type User =
  | UserRankingWithActivity
  | UserRankingWithContribution
  | UserRankingWithStar
  | UserRankingWithQiita;

export interface RankingData {
  activity: User[];
  contribution: User[];
  star: User[];
  qiita: User[];
}
