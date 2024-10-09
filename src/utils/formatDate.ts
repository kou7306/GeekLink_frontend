// 何年何月何日の形にフォーマットする関数
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear(); // 年を取得
  const month = date.getMonth() + 1; // 月は0から始まるため1を足す
  const day = date.getDate(); // 日を取得

  return `${year}年${month}月${day}日`; // フォーマットされた文字列を返す
};
