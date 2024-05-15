// app/profile-initialization/options.ts

export const ages = Array.from({ length: 66 }, (_, i) => i + 15);

export const places = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県",
  "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
  "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", "海外"
];

export const technologies = [
  "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node", "Next.js", "Nuxt.js",
  "jQuery", "Sass", "TailwindCSS", "Bootstrap", "PHP", "Laravel", 
  "C", "C++", "C#", "Go", "Rust", "Java", "Spring-Boot", "Unity", "Kotlin", "Swift", "Flutter", "Dart", "Objective-C", "Ruby",
  "Ruby on Rails", "Python", "Django", "Flask", "FastAPI", "scala", "Perl", "R",
  "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Firebase", "Supabase", "DynamoDB", "Redis",
  "GitHub", "Docker", "AWS", "GCP", "Azure", "Heroku", "Vercel", "Netlify", 
];

export const occupations = [
  "高校１年生", "高校２年生", "高校３年生", "高専１年生", "高専２年生", "高専３年生",
  "高専４年生", "高専５年生", "学部１年生", "学部２年生", "学部３年生", "学部４年生",
  "修士１年生", "修士２年生", "専門学校１年生", "専門学校２年生", "IT企業エンジニア", "フリーランスエンジニア", "その他"
];
