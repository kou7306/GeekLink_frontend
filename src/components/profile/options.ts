// src/app/components/profile/options.ts

export interface User {
  user_id: string;
  name: string;
  sex: string;
  age: string;
  place: string;
  top_tech: string;
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
  items?: string[];
  currentAvatar?: string;
}
export type FollowUser = Pick<User, "user_id" | "name" | "image_url">;

export const ages = [
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
];

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

export const areaPlaces = {
  "北海道・東北": [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
  ],
  関東: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
  ],
  "中部・甲信越": [
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
  ],
  "関西・近畿": [
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
  ],
  "中国・四国": [
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
  ],
  九州: [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
};

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
  "高校1年生",
  "高校2年生",
  "高校3年生",
  "高専1年生",
  "高専2年生",
  "高専3年生",
  "高専4年生",
  "高専5年生",
  "大学1年生",
  "大学2年生",
  "大学3年生",
  "大学4年生",
  "修士1年生",
  "修士2年生",
  "専門学校1年生",
  "専門学校2年生",
  "専門学校3年生",
  "専門学校4年生",
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
