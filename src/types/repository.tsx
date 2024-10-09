type Repository = {
  name: string;
  stargazerCount: number;
  commitCount: number;
  languages: Language[];
  updatedAt: string;
};

type Language = {
  name: string;
  size: number;
  percentage: number;
};
