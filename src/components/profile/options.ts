// src/app/components/profile/options.ts

export interface User {
  user_id: string;
  name: string;
  sex: string;
  age: string;
  place: string;
  teches: string[];
  top_teches: string[];
  occupation: string;
  image_url: string;
  hobby?: string;
  editor?: string;
  affiliation?: string;
  qualification?: string[];
  message?: string;
  portfolio?: string;
  graduate?: string;
  desired_occupation?: string;
  faculty?: string;
  experience?: string[];
  github?: string;
  twitter?: string;
  zenn?: string;
  qiita?: string;
  atcoder?: string;
}

export const ages = Array.from({ length: 66 }, (_, i) => (i + 15).toString());

export const places = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
  "海外",
];

export const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Angular",
  "Node",
  "Next.js",
  "Nuxt.js",
  "jQuery",
  "Sass",
  "TailwindCSS",
  "Bootstrap",
  "PHP",
  "Laravel",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Java",
  "Spring-Boot",
  "Unity",
  "Kotlin",
  "Swift",
  "Flutter",
  "Dart",
  "Objective-C",
  "Ruby",
  "Ruby on Rails",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "scala",
  "Perl",
  "R",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "MongoDB",
  "Firebase",
  "Supabase",
  "DynamoDB",
  "Redis",
  "GitHub",
  "Docker",
  "AWS",
  "GCP",
  "Azure",
  "Heroku",
  "Vercel",
  "Netlify",
];

export const occupations = [
  "高校生１年生",
  "高校生２年生",
  "高校生３年生",
  "高専１年生",
  "高専２年生",
  "高専３年生",
  "高専４年生",
  "高専５年生",
  "大学生１年生",
  "大学生２年生",
  "大学生３年生",
  "大学生４年生",
  "専門学校１年生",
  "専門学校２年生",
  "IT企業エンジニア",
  "フリーランスエンジニア",
  "その他",
];

export const editors = [
  "VSCode",
  "Visual Studio",
  "Vim",
  "Emacs",
  "Sublime Text",
  "Atom",
  "InteliJ IDEA",
  "Android Studio",
  "Xcode",
  "Eclipse",
  "PyCharm",
  "WebStorm",
  "RubyMine",
  "PhpStorm",
  "Notepad++",
];

export const graduateOptions = [
  "25卒",
  "26卒",
  "27卒",
  "28卒",
  "29卒",
  "30卒以降",
];

export const desiredOccupationOptions = [
  "フロントエンドエンジニア",
  "バックエンドエンジニア",
  "フルスタックエンジニア",
  "インフラエンジニア",
  "スマホアプリエンジニア",
  "ゲームエンジニア",
  "データサイエンティスト",
  "AIエンジニア",
  "セキュリティエンジニア",
  "機械・電気系エンジニア",
  "UI/UXデザイナー",
  "Webデザイナー",
  "プロダクトマネージャー",
];

export const facultyOptions = [
  "情報学部",
  "文学部",
  "教育学部",
  "法学部",
  "経済学部",
  "商学部",
  "社会学部",
  "外国語学部",
  "人文学部",
  "理学部",
  "工学部",
  "農学部",
  "医学部",
  "歯学部",
  "薬学部",
  "看護学部",
  "スポーツ学部",
  "芸術学部",
  "デザイン学部",
  "建築学部",
  "総合政策学部",
  "環境学部",
  "国際学部",
  "グローバル学部",
  "その他",
];

export const experienceOptions = [
  "趣味で開発を行ったことがある",
  "実務で開発を行ったことがある",
  "半年以上の実務経験がある",
  "Webサービスをインターネットに公開したことがある",
  "スマホアプリをGoogle Play StoreまたはApp Storeに公開したことがある",
  "ゲームを制作したことがある",
  "OSSにコントリビュートしたことがある",
  "AtCoder茶",
  "AtCoder緑",
  "AtCoder水",
  "AtCoder青",
  "AtCoder黄",
  "AtCoder橙",
  "AtCoder赤",
  "テストコードを実装したことがある",
  "CI/CDを導入したことがある",
  "Dockerを利用したことがある",
];
