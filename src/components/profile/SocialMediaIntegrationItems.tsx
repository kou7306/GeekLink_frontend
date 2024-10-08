import React from "react";
import SocialMediaIntegrationItem from "./SocialMediaIntegrationItem";

const SocialMediaIntegrationItemas = () => {
  return (
    <>
      {/* GitHubとQiitaは実装済み、Twitter, AtCoder, Zennは未実装 */}
      {/* GitHubは動作確認済み、Qiitaはenvファイルの情報がなく動作未確認 */}
      <SocialMediaIntegrationItem socialMedia="Qiita" />
      <SocialMediaIntegrationItem socialMedia="GitHub" />
      <SocialMediaIntegrationItem socialMedia="Twitter" />
      <SocialMediaIntegrationItem socialMedia="AtCoder" />
      <SocialMediaIntegrationItem socialMedia="Zenn" />
    </>
  );
};

export default SocialMediaIntegrationItemas;
