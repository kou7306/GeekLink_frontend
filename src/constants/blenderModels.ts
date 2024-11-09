export interface BlenderModel {
  id: string;
  name: string;
  itemPath: string;
  avatarPath: string;
  fee: number;
}

export const blenderModels = [
  {
    id: "1",
    name: "装備なし",
    itemPath: "",
    avatarPath: "/models/mii-only.glb",
    fee: 0,
  },
  {
    id: "2",
    name: "剣",
    itemPath: "/models/sword.glb",
    avatarPath: "/models/mii-sword.glb",
    fee: 150,
  },
  {
    id: "3",
    name: "盾",
    itemPath: "/models/shield.glb",
    avatarPath: "/models/mii-shield.glb",
    fee: 100,
  },
  {
    id: "4",
    name: "王冠",
    itemPath: "/models/crown.glb",
    avatarPath: "/models/mii-crown.glb",
    fee: 200,
  },
];
