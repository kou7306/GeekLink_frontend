type Repository = {
  name: string;
  url: string;
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
