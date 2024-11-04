import AvatarViewer from "@/components/rpg/AvatarViewer";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>3D Avatar Viewer</h1>
      {/* アバターの表示サイズを指定 */}
      <AvatarViewer
        modelPath="/models/human.glb"
        size={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default HomePage;
