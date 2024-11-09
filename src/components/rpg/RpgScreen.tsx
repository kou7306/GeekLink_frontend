"use client";

import { Button } from "@mui/material";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, { useEffect, useRef } from "react";
import seedrandom from "seedrandom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type Direction = "left" | "straight" | "right";

type Coordinate = {
  x: number;
  y: number;
  availableDirections: Direction[];
  type: string;
};

type Item = {
  x: number;
  y: number;
  type: string;
  isCollected: boolean;
};

const selectCoordinates: Coordinate[] = [
  { x: 0, y: 0, availableDirections: ["straight"], type: "start" },
  {
    x: 0,
    y: 3,
    availableDirections: ["left", "straight", "right"],
    type: "coin",
  },
  { x: -2, y: 3, availableDirections: ["straight"], type: "coin" },
  { x: -2, y: 6, availableDirections: ["left"], type: "life" },
  { x: -4, y: 6, availableDirections: ["straight"], type: "coin" },
  { x: 0, y: 6, availableDirections: ["straight"], type: "costume" },
  { x: 0, y: 9, availableDirections: ["left", "straight"], type: "coin" },
  { x: -2, y: 9, availableDirections: ["straight"], type: "coin" },
  { x: 2, y: 3, availableDirections: ["straight"], type: "life" },
  { x: 2, y: 6, availableDirections: ["straight", "right"], type: "coin" },
  { x: 4, y: 6, availableDirections: ["straight"], type: "costume" },
  { x: 2, y: 9, availableDirections: ["straight"], type: "life" },
  { x: 2, y: 12, availableDirections: ["right"], type: "coin" },
  { x: 4, y: 9, availableDirections: ["straight"], type: "coin" },
  { x: 4, y: 12, availableDirections: ["right"], type: "costume" },
  { x: 6, y: 12, availableDirections: ["right"], type: "life" },
  { x: 0, y: 12, availableDirections: ["straight"], type: "coin" },
  { x: 0, y: 15, availableDirections: ["straight"], type: "coin" },
  { x: 0, y: 18, availableDirections: [], type: "costume" },
  { x: -4, y: 9, availableDirections: ["left"], type: "life" },
  { x: -6, y: 9, availableDirections: ["straight"], type: "coin" },
  { x: -6, y: 12, availableDirections: ["straight"], type: "coin" },
  { x: -6, y: 15, availableDirections: ["right"], type: "costume" },
  { x: -2, y: 12, availableDirections: ["left"], type: "life" },
  { x: -4, y: 12, availableDirections: ["straight"], type: "coin" },
  { x: -4, y: 15, availableDirections: ["straight"], type: "coin" },
  { x: -4, y: 18, availableDirections: [], type: "life" },
];

const roads = [
  { start: [0, 3], end: [2, 3] },
  { start: [0, 3], end: [0, 6] },
  { start: [0, 6], end: [0, 9] },
  { start: [0, 9], end: [0, 12] },
  { start: [0, 9], end: [-2, 9] },
  { start: [2, 3], end: [2, 6] },
  { start: [2, 6], end: [4, 6] },
  { start: [2, 6], end: [2, 9] },
  { start: [4, 6], end: [4, 9] },
  { start: [0, 3], end: [-2, 3] },
  { start: [-2, 3], end: [-2, 6] },
  { start: [-2, 6], end: [-4, 6] },
  { start: [-4, 6], end: [-4, 9] },
  { start: [-2, 9], end: [-2, 12] },
  { start: [2, 9], end: [2, 12] },
  { start: [2, 12], end: [4, 12] },
  { start: [4, 9], end: [4, 12] },
  { start: [4, 12], end: [6, 12] },
  { start: [0, 12], end: [0, 15] },
  { start: [0, 15], end: [0, 18] },
  { start: [-4, 9], end: [-6, 9] },
  { start: [-6, 9], end: [-6, 12] },
  { start: [-6, 12], end: [-6, 15] },
  { start: [-6, 15], end: [-4, 15] },
  { start: [-2, 12], end: [-4, 12] },
  { start: [-4, 12], end: [-4, 15] },
  { start: [-4, 15], end: [-4, 18] },
];

const items = [
  {
    x: -2,
    y: 3,
    type: "coin",
    isCollected: false,
  },
  {
    x: 0,
    y: 6,
    type: "costume",
    isCollected: false,
  },
  {
    x: 2,
    y: 3,
    type: "life",
    isCollected: false,
  },
  {
    x: 2,
    y: 6,
    type: "coin",
    isCollected: false,
  },
  {
    x: -2,
    y: 6,
    type: "life",
    isCollected: false,
  },
  {
    x: -4,
    y: 6,
    type: "coin",
    isCollected: false,
  },
  {
    x: 0,
    y: 9,
    type: "coin",
    isCollected: false,
  },
  {
    x: -2,
    y: 9,
    type: "coin",
    isCollected: false,
  },
  {
    x: 2,
    y: 3,
    type: "life ",
    isCollected: false,
  },
  {
    x: 2,
    y: 6,
    type: "coin",
    isCollected: false,
  },
  {
    x: 4,
    y: 6,
    type: "costume",
    isCollected: false,
  },
  {
    x: 2,
    y: 9,
    type: "life",
    isCollected: false,
  },
  {
    x: 2,
    y: 12,
    type: "coin",
    isCollected: false,
  },
  {
    x: 4,
    y: 9,
    type: "coin",
    isCollected: false,
  },
  {
    x: 4,
    y: 12,
    type: "costume",
    isCollected: false,
  },
  {
    x: 6,
    y: 12,
    type: "life",
    isCollected: false,
  },
  {
    x: 0,
    y: 12,
    type: "coin",
    isCollected: false,
  },
  {
    x: 0,
    y: 15,
    type: "coin",
    isCollected: false,
  },
  {
    x: 0,
    y: 18,
    type: "costume",
    isCollected: false,
  },
  {
    x: -4,
    y: 9,
    type: "life",
    isCollected: false,
  },
  {
    x: -6,
    y: 9,
    type: "coin",
    isCollected: false,
  },
  {
    x: -6,
    y: 12,
    type: "coin",
    isCollected: false,
  },
  {
    x: -6,
    y: 15,
    type: "costume",
    isCollected: false,
  },
  {
    x: -2,
    y: 12,
    type: "life",
    isCollected: false,
  },
  {
    x: -4,
    y: 12,
    type: "coin",
    isCollected: false,
  },
  {
    x: -4,
    y: 15,
    type: "coin",
    isCollected: false,
  },
  {
    x: -4,
    y: 18,
    type: "life",
    isCollected: false,
  },
];

type RpgScreenProps = {
  handleLifeUpdate: (change: number) => void;
  handlePositionUpdate: (x: number, y: number) => void;
  handleCoinUpdate: (coin: number) => void;
  handleAddItem: (item: string) => void;
  positionX: number;
  positionY: number;
  lives: number;
  modelPath: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  myItem: string[];
  changeScene: boolean;
  setChangeScene: (changeScene: boolean) => void;
};

const RpgScreen = ({
  handleLifeUpdate,
  handlePositionUpdate,
  handleCoinUpdate,
  handleAddItem,
  positionX,
  positionY,
  lives,
  modelPath,
  isModalOpen,
  setIsModalOpen,
  myItem,
  changeScene,
  setChangeScene,
}: RpgScreenProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // シーン、カメラ、レンダラーの設定
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, // カメラの視野角を狭くして、より立体的に見えるようにする
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, -2, 2); // カメラの位置
    camera.lookAt(0, 0, -0.25); // カメラの注視点をシーンの中心に設定
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアスを有効にして、より滑らかな描画を行う

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //星を作成する関数
    function createStarField() {
      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(50000 * 3);
      const rng = seedrandom("geeklink-stars"); // 固定のシード値を使用

      for (let i = 0; i < 50000; i++) {
        // 乱数生成器を使用して-1500から1500の範囲で座標を生成
        positions[i * 3] = 3000 * (rng() - 0.5); // x
        positions[i * 3 + 1] = 3000 * (rng() - 0.5); // y
        positions[i * 3 + 2] = 3000 * (rng() - 0.5); // z
      }

      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const starMate = new THREE.PointsMaterial({
        size: 2,
        color: 0xddddbb,
      });
      const starMesh = new THREE.Points(starGeo, starMate);
      scene.add(starMesh);
    }

    createStarField();

    // グローバルな参照の型を変更
    let avatar: THREE.Object3D | null = null;

    //modelPathを使ってアバターを作る関数
    function createAvatar() {
      const loader = new GLTFLoader();
      return new Promise<void>((resolve) => {
        loader.load(modelPath, (gltf) => {
          avatar = gltf.scene;
          avatar.scale.set(0.5, 0.5, 0.5); // スケールを調整
          avatar.position.set(0, -0.75, -1.5);
          avatar.rotation.y = Math.PI; // 180度回転
          camera.add(avatar);
          scene.add(camera); // カメラではなくシーンに直接追加

          // ライトを追加
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(0, 0, 3);
          scene.add(ambientLight);
          scene.add(directionalLight);

          resolve();
        });
      });
    }

    const group = new THREE.Group();

    //最初のますと道を作成する関数
    function createRoadAndSquare() {
      // 円柱の作成
      const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32); // 半径0.2、高さ1、分割数32の円柱
      const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.rotation.x = Math.PI / 2; // 円柱を横に寝かせる
      cylinder.position.set(0, -1, 0); // 中心のマス

      //道の作成
      const planeGeometry = new THREE.PlaneGeometry(0.15, 3); //縦と横の幅を指定
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //両面を描画する
        transparent: true, //透明にする
        opacity: 0.3,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(0, 0.5, 0); // 道の位置を中心に

      // グループ化して一括管理
      group.add(cylinder);

      group.add(plane);

      scene.add(group);
    }

    //座標からマスを作る関数
    function createSquare(x: number, y: number, type: string) {
      const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32); // 半径0.2、高さ1、分割数32の円柱

      // タイプに応じて色を設定
      let color;
      switch (type) {
        case "coin":
          color = 0xffff00; // 黄色
          break;
        case "life":
          color = 0x00ff00; // 緑
          break;
        case "costume":
          color = 0x0000ff; // 青
          break;
        default:
          color = 0x00ffff; // デフォルトの色（シアン）
      }

      const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: color,
      });

      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.rotation.x = Math.PI / 2; // 円柱を横に寝かせる
      cylinder.position.set(x, y - 1, 0); // 中心のマス
      group.add(cylinder);
    }

    //2点の座標ら道を作る関数()
    function createRoad(x1: number, y1: number, x2: number, y2: number) {
      if (x1 === x2) {
        const planeGeometry = new THREE.PlaneGeometry(0.25, 3); //縦と横の幅を指定
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          side: THREE.DoubleSide, //両面を描画する
          transparent: true, //透明にする
          opacity: 0.3,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(x1, y1 + 0.5, 0); // 道の位置を中心に
        group.add(plane);
      } else {
        const planeGeometry = new THREE.PlaneGeometry(0.25, 2); //縦と横の幅を指定
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          side: THREE.DoubleSide, //両面を描画する
          transparent: true, //透明にする
          opacity: 0.3,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.z = Math.PI / 2; // 90度回転
        plane.position.set((x2 + x1) / 2, y1 - 1, 0); // 道の位置を中心に
        group.add(plane);
      }
    }

    // アイテムのメッシュを追跡るためのマップを追加
    const itemMeshes = new Map<string, THREE.Mesh>();

    //モックのアイテムを作る関数
    function createItem(x: number, y: number) {
      //アイテムを作成
      const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(x, y - 1, 0.2);
      group.add(box);

      // メッシュをマップに保存
      itemMeshes.set(`${x},${y}`, box);
    }

    //アイテムが取得された時に呼び出される関数
    function collectItem(x: number, y: number) {
      const item = items.find((item) => item.x === x && item.y === y);

      setIsModalOpen(false);

      handleLifeUpdate(-1);

      if (item) {
        item.isCollected = true;

        itemMeshes.delete(`${x},${y}`);

        // ダイアログボックスを作成
        const dialog = document.createElement("div");
        dialog.style.position = "fixed";
        dialog.style.top = "70%";
        dialog.style.left = "50%";
        dialog.style.transform = "translate(-50%, -50%)";
        dialog.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        dialog.style.padding = "20px 40px";
        dialog.style.borderRadius = "10px";
        dialog.style.border = "3px solid #8B4513";
        dialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
        dialog.style.zIndex = "1000";
        dialog.style.width = "80%";
        dialog.style.maxWidth = "600px";
        dialog.style.minHeight = "100px";
        dialog.style.display = "flex";
        dialog.style.alignItems = "center";
        dialog.style.fontFamily =
          "'Hiragino Kaku Gothic Pro', 'メイリオ', sans-serif";
        dialog.style.fontSize = "18px";
        dialog.style.color = "#333";

        // テキストコンテナを作成
        const textContainer = document.createElement("div");
        textContainer.style.width = "100%";

        // アイテムタイプに応じてテキストを変更
        const displayText = (() => {
          switch (item?.type) {
            case "coin":
              return "コインマス！";
            case "life":
              return "ライフマス！";
            case "costume":
              return "着せ替えマス！";
            default:
              return "マス！";
          }
        })();

        textContainer.textContent = displayText;

        dialog.appendChild(textContainer);

        // 下向き三角形を追加
        const triangle = document.createElement("div");
        triangle.style.position = "absolute";
        triangle.style.bottom = "10px";
        triangle.style.right = "10px";
        triangle.style.width = "0";
        triangle.style.height = "0";
        triangle.style.borderLeft = "10px solid transparent";
        triangle.style.borderRight = "10px solid transparent";
        triangle.style.borderTop = "10px solid #666";

        dialog.appendChild(triangle);
        document.body.appendChild(dialog);

        // クリックで閉じられるようにする
        dialog.addEventListener("click", () => {
          document.body.removeChild(dialog);
          startRoulette(item, x, y);
        });
      }
    }

    // ルーレット機能を追加
    function startRoulette(item: Item, x: number, y: number) {
      const roulette = document.createElement("div");
      const baseStyles = {
        position: "fixed",
        top: "70%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: "20px 40px",
        borderRadius: "10px",
        border: "3px solid #8B4513",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        zIndex: "1000",
        width: "300px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Hiragino Kaku Gothic Pro', 'メイリオ', sans-serif",
        fontSize: "36px",
        color: "#333",
        cursor: "pointer",
        textAlign: "center",
        wordBreak: "keep-all",
        whiteSpace: "pre-line",
      };

      // 基本スタイルを適用
      Object.entries(baseStyles).forEach(([key, value]) => {
        roulette.style[key as any] = value;
      });

      // アイテムタイプに応じてスタイルをカスタマイズ
      switch (item?.type) {
        case "coin":
          roulette.style.backgroundColor = "rgba(255, 223, 0, 0.95)";
          roulette.style.border = "3px solid #DAA520";
          roulette.style.color = "#8B4513";
          roulette.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.5)";
          break;
        case "life":
          roulette.style.backgroundColor = "rgba(144, 238, 144, 0.95)";
          roulette.style.border = "3px solid #228B22";
          roulette.style.color = "#006400";
          roulette.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.3)";
          break;
        case "costume":
          roulette.style.backgroundColor = "rgba(135, 206, 235, 0.95)";
          roulette.style.border = "3px solid #4169E1";
          roulette.style.color = "#000080";
          roulette.style.boxShadow = "0 0 15px rgba(0, 0, 255, 0.3)";
          break;
        default:
          roulette.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
          roulette.style.border = "3px solid #8B4513";
          roulette.style.color = "#333";
      }

      document.body.appendChild(roulette);

      // アイテムタイプに応じて使用する配列を決定
      const numbers = [1, 2, 3, 4, 5, 6];
      const coinNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const lifeNumbers = [1, 2, 3];
      // myItemに含まれていないコスチュームのみをフィルタリング
      const costumeList = [
        "ぼうし",
        "剣",
        "盾",
        "ローブ",
        "マント",
        "ブーツ",
        "マスク",
        "靴",
      ].filter((costume) => !myItem.includes(costume));

      // 現在の位置のアイテムを取得
      const currentItem = items.find(
        (item) => item.x === positionX && item.y === positionY
      );

      // アイテム��イプに応じて表示する配列を選択
      const displayArray = (() => {
        switch (item?.type) {
          case "coin":
            return coinNumbers;
          case "life":
            return lifeNumbers;
          case "costume":
            return costumeList;
          default:
            return numbers;
        }
      })();

      let currentIndex = 0;
      let isSpinning = true;
      let animationId: number;
      let lastUpdateTime = Date.now();
      const updateInterval = 100;

      const updateNumber = () => {
        const currentTime = Date.now();

        if (!isSpinning) {
          cancelAnimationFrame(animationId);
          const resultDialog = document.createElement("div");

          // 基本スタイルを適用
          Object.entries(baseStyles).forEach(([key, value]) => {
            resultDialog.style[key as any] = value;
          });

          // アイテムタイプに応じてスタイルをカタマイズ
          switch (item?.type) {
            case "coin":
              resultDialog.style.backgroundColor = "rgba(255, 223, 0, 0.95)"; // 金色
              resultDialog.style.border = "3px solid #DAA520"; // ゴールデンロッド
              resultDialog.style.color = "#8B4513"; // サドルブラウン
              resultDialog.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.5)"; // 金色の光沢
              break;
            case "life":
              resultDialog.style.backgroundColor = "rgba(144, 238, 144, 0.95)"; // ライトグリーン
              resultDialog.style.border = "3px solid #228B22"; // フォレストグリーン
              resultDialog.style.color = "#006400"; // ダークグリーン
              resultDialog.style.boxShadow = "0 0 15px rgba(0, 255, 0, 0.3)"; // 緑の光沢
              break;
            case "costume":
              resultDialog.style.backgroundColor = "rgba(135, 206, 235, 0.95)"; // スカイブルー
              resultDialog.style.border = "3px solid #4169E1"; // ロイヤルブルー
              resultDialog.style.color = "#000080"; // ネイビー
              resultDialog.style.boxShadow = "0 0 15px rgba(0, 0, 255, 0.3)"; // 青の光沢
              break;
            default:
              resultDialog.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
              resultDialog.style.border = "3px solid #8B4513";
              resultDialog.style.color = "#333";
          }

          resultDialog.style.fontSize = "24px";
          resultDialog.style.fontWeight = "bold";
          resultDialog.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.2)";

          // アイテムタイプに応じてメッセージを変更
          const resultValue =
            displayArray[
              (currentIndex - 1 + displayArray.length) % displayArray.length
            ];
          const resultMessage = (() => {
            switch (item?.type) {
              case "coin":
                return `${resultValue}コインGet！`;
              case "life":
                return `ライフ${resultValue}回復！`;
              case "costume":
                return `${resultValue}を手に入れた！`;
              default:
                return `${resultValue}が出ました！`;
            }
          })();

          resultDialog.textContent = resultMessage;

          document.body.appendChild(resultDialog);
          document.body.removeChild(roulette);

          // アイテムタイプに応じた処理を実行
          if (item?.type === "coin") {
            handleCoinUpdate(Number(resultValue));
          } else if (item?.type === "life") {
            handleLifeUpdate(Number(resultValue) - 1);
          } else if (item?.type === "costume") {
            handleAddItem(resultValue as string);
          }

          resultDialog.addEventListener("click", () => {
            document.body.removeChild(resultDialog);
            setIsModalOpen(true);
            setChangeScene(!changeScene);
            handleMovement(x, y);
          });
          return;
        }

        if (currentTime - lastUpdateTime >= updateInterval) {
          roulette.textContent = displayArray[currentIndex].toString();
          currentIndex = (currentIndex + 1) % displayArray.length;
          lastUpdateTime = currentTime;
        }

        animationId = requestAnimationFrame(updateNumber);
      };

      roulette.addEventListener("click", () => {
        isSpinning = false;
      });

      updateNumber();
    }

    //最初の移動をしてカメラの位置を合わせる
    function firstRun() {
      return new Promise<void>((resolve) => {
        const targetPositionX = positionX;
        const targetPositionY = positionY - 2.0;
        let hasUpdatedRoadY = false; // フラグを追加
        function step() {
          if (targetPositionX >= 0) {
            if (camera.position.x < targetPositionX) {
              camera.position.x += 2;
              requestAnimationFrame(step);
            }
          } else {
            if (camera.position.x > targetPositionX) {
              camera.position.x -= 2;
              requestAnimationFrame(step);
            }
          }
          if (camera.position.y < targetPositionY) {
            camera.position.y += 3;
            requestAnimationFrame(step);
          } else {
            if (!hasUpdatedRoadY) {
              // まだ更新していない場合のみ実行
              hasUpdatedRoadY = true;
            }
            resolve();
          }
          renderer.render(scene, camera);
        }

        step();
      });
    }

    //一マス分歩く
    function run() {
      return new Promise<void>((resolve) => {
        const startPosition = camera.position.y;
        const targetPositionY = startPosition + 3;
        let hasUpdatedRoadY = false;
        let lastTime = performance.now();
        let bounceProgress = 0;

        function step(currentTime: number) {
          const deltaTime = (currentTime - lastTime) / 1000;
          lastTime = currentTime;

          if (camera.position.y < targetPositionY) {
            camera.position.y += 2 * deltaTime;

            if (avatar) {
              // バウンス処理
              bounceProgress += 0.1;
              avatar.position.y =
                -0.75 + Math.abs(Math.sin(bounceProgress)) * 0.05;
            }
            requestAnimationFrame(step);
          } else {
            if (!hasUpdatedRoadY) {
              handlePositionUpdate(0, 3);
              hasUpdatedRoadY = true;
            }
            if (avatar) {
              avatar.position.y = -0.75; // 移動終了時に位置を元に戻す
            }
            collectItem(positionX, positionY + 3);
            resolve();
          }
          renderer.render(scene, camera);
        }

        requestAnimationFrame(step);
      });
    }

    //右に一マス歩く
    function runRight() {
      return new Promise<void>((resolve) => {
        const targetPositionX = camera.position.x + 2;
        let hasUpdatedRoadX = false;
        let rotationProgress = Math.PI;
        const targetRotation = Math.PI / 2;
        let isMoving = true;
        let bounceProgress = 0;

        function step() {
          if (isMoving) {
            if (camera.position.x < targetPositionX) {
              camera.position.x += 0.02;

              if (avatar) {
                // 回転処理
                if (rotationProgress > targetRotation) {
                  rotationProgress -= 0.1;
                  avatar.rotation.y = rotationProgress;
                }

                // バウンス処理
                bounceProgress += 0.1;
                avatar.position.y =
                  -0.75 + Math.abs(Math.sin(bounceProgress)) * 0.05;
              }
              requestAnimationFrame(step);
            } else {
              if (!hasUpdatedRoadX) {
                handlePositionUpdate(2, 0);
                hasUpdatedRoadX = true;
              }
              isMoving = false;
              rotationProgress = targetRotation;
              if (avatar) avatar.position.y = -0.75;
              step();
            }
          } else {
            if (avatar && rotationProgress < Math.PI) {
              rotationProgress += 0.1;
              avatar.rotation.y = rotationProgress;
              requestAnimationFrame(step);
            } else {
              if (avatar) {
                avatar.rotation.y = Math.PI;
                avatar.position.y = -0.75; // 最終位置を確実に元に戻す
              }
              collectItem(positionX + 2, positionY);
              resolve();
            }
          }
          renderer.render(scene, camera);
        }
        step();
      });
    }

    //左に一マス歩く
    function runLeft() {
      return new Promise<void>((resolve) => {
        const targetPositionX = camera.position.x - 2;
        let hasUpdatedRoadX = false;
        let rotationProgress = Math.PI;
        const targetRotation = (3 * Math.PI) / 2;
        let isMoving = true;
        let bounceProgress = 0;

        function step() {
          if (isMoving) {
            if (camera.position.x > targetPositionX) {
              camera.position.x -= 0.02;

              if (avatar) {
                // 回転処理
                if (rotationProgress < targetRotation) {
                  rotationProgress += 0.1;
                  avatar.rotation.y = rotationProgress;
                }

                // バウンス処理を調整
                bounceProgress += 0.1;
                avatar.position.y =
                  -0.75 + Math.abs(Math.sin(bounceProgress)) * 0.05; // 振幅を0.05に減らし、下方向への移動を防ぐ
              }
              requestAnimationFrame(step);
            } else {
              if (!hasUpdatedRoadX) {
                handlePositionUpdate(-2, 0);
                hasUpdatedRoadX = true;
              }
              isMoving = false;
              rotationProgress = targetRotation;
              if (avatar) avatar.position.y = -0.75;
              step();
            }
          } else {
            if (avatar && rotationProgress > Math.PI) {
              rotationProgress -= 0.1;
              avatar.rotation.y = rotationProgress;
              requestAnimationFrame(step);
            } else {
              if (avatar) {
                avatar.rotation.y = Math.PI;
                avatar.position.y = -0.75; // 最終位置を確実に元に戻す
              }
              collectItem(positionX - 2, positionY);
              resolve();
            }
          }
          renderer.render(scene, camera);
        }
        step();
      });
    }

    //選択画面を作成し、選択結果を返す
    function createSelectRoad(
      availableDirections: Direction[]
    ): Promise<string> {
      return new Promise((resolve) => {
        // 既存のモーダルがあれば削除
        const existingModal = document.querySelector(".modal");
        if (existingModal) {
          document.body.removeChild(existingModal);
        }

        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "rgba(0, 0, 255, 0.5)"; // 背景色を青色にして半透明にする
        modal.style.padding = "20px";
        modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        modal.style.zIndex = "1000";

        let isModalClosed = false; // フラグを追加

        // メッセージを作成
        const message = document.createElement("p");
        message.textContent = "どちらに進みますか？";
        message.style.textAlign = "center";
        message.style.marginBottom = "20px";
        modal.appendChild(message);

        //右と左のボタンを作成

        const leftButton = document.createElement("button");
        leftButton.textContent = "左";
        leftButton.style.margin = "10px";
        leftButton.style.padding = "10px 20px";
        leftButton.style.backgroundColor = "#4CAF50";
        leftButton.style.color = "white";
        leftButton.style.border = "none";
        leftButton.style.borderRadius = "5px";
        leftButton.style.cursor = "pointer";
        if (lives === 0) {
          leftButton.disabled = true;
          leftButton.style.backgroundColor = "#808080";
        }
        leftButton.onmouseover = () => {
          lives !== 0
            ? (leftButton.style.backgroundColor = "#45a049")
            : (leftButton.style.backgroundColor = "#808080");
        };
        leftButton.onmouseout = () => {
          lives !== 0
            ? (leftButton.style.backgroundColor = "#4CAF50")
            : (leftButton.style.backgroundColor = "#808080");
        };
        leftButton.onclick = () => {
          if (isModalClosed) return; // 既にじている場合は何しない
          isModalClosed = true;

          document.body.removeChild(modal);
          resolve("left");
        };

        // 利用可能な方向のボタンのみを表示
        if (availableDirections.includes("left")) {
          modal.appendChild(leftButton);
        }

        //まっすぐ進むボタンを作成
        const straightButton = document.createElement("button");
        straightButton.textContent = "まっすぐ進む";
        straightButton.style.margin = "10px";
        straightButton.style.padding = "10px 20px";
        straightButton.style.backgroundColor = "#4CAF50";
        straightButton.style.color = "white";
        straightButton.style.border = "none";
        straightButton.style.borderRadius = "5px";
        straightButton.style.cursor = "pointer";
        if (lives === 0) {
          straightButton.disabled = true;
          straightButton.style.backgroundColor = "#808080";
        }
        straightButton.onmouseover = () => {
          lives !== 0
            ? (straightButton.style.backgroundColor = "#45a049")
            : (straightButton.style.backgroundColor = "#808080");
        };
        straightButton.onmouseout = () => {
          lives !== 0
            ? (straightButton.style.backgroundColor = "#4CAF50")
            : (straightButton.style.backgroundColor = "#808080");
        };
        straightButton.onclick = () => {
          if (isModalClosed) return; // 既に閉じている場合は何もしない
          isModalClosed = true;

          document.body.removeChild(modal);
          resolve("straight");
        };

        if (availableDirections.includes("straight")) {
          modal.appendChild(straightButton);
        }

        const rightButton = document.createElement("button");
        rightButton.textContent = "右";
        rightButton.style.margin = "10px";
        rightButton.style.padding = "10px 20px";
        rightButton.style.backgroundColor = "#4CAF50";
        rightButton.style.color = "white";
        rightButton.style.border = "none";
        rightButton.style.borderRadius = "5px";
        rightButton.style.cursor = "pointer";
        if (lives === 0) {
          rightButton.disabled = true;
          rightButton.style.backgroundColor = "#808080";
        }
        rightButton.onmouseover = () => {
          lives !== 0
            ? (rightButton.style.backgroundColor = "#45a049")
            : (rightButton.style.backgroundColor = "#808080");
        };
        rightButton.onmouseout = () => {
          lives !== 0
            ? (rightButton.style.backgroundColor = "#4CAF50")
            : (rightButton.style.backgroundColor = "#808080");
        };
        rightButton.onclick = () => {
          if (isModalClosed) return; // 既に閉じている場合は何もしない
          isModalClosed = true;

          document.body.removeChild(modal);
          resolve("right");
        };

        if (availableDirections.includes("right")) {
          modal.appendChild(rightButton);
        }
        const lifeMessage = document.createElement("p");
        lifeMessage.textContent = "ライフを1消費して進む";
        lifeMessage.style.textAlign = "center";
        lifeMessage.style.marginTop = "20px";
        modal.appendChild(lifeMessage);

        // モーダルを表示
        document.body.appendChild(modal);
      });
    }

    // 動の処理を行う関数
    async function handleMovement(x: number, y: number) {
      // 現在の座標に対応するCoordinateを取得
      const currentCoordinate = selectCoordinates.find(
        (coord) => coord.x === x && coord.y === y
      );

      // モーダルで選択待つ（利用可能な方向のみ表示）
      const direction = await createSelectRoad(
        currentCoordinate?.availableDirections || []
      );

      // 選択結果に応じて処理を分岐
      if (
        direction === "left" &&
        currentCoordinate?.availableDirections.includes("left")
      ) {
        await runLeft();
      } else if (
        direction === "right" &&
        currentCoordinate?.availableDirections.includes("right")
      ) {
        await runRight();
      } else if (
        direction === "straight" &&
        currentCoordinate?.availableDirections.includes("straight")
      ) {
        await run();
      }
    }

    async function createScene() {
      console.log(lives);
      await createAvatar();
      await createRoadAndSquare();
      console.log(positionX, positionY);

      // forEachをPromise.allとmapに変更
      await Promise.all(
        selectCoordinates.map(async (coordinate) => {
          await createSquare(coordinate.x, coordinate.y, coordinate.type);
        })
      );

      await Promise.all(
        roads.map(async (road) => {
          await createRoad(
            road.start[0],
            road.start[1],
            road.end[0],
            road.end[1]
          );
        })
      );

      await firstRun();
      isModalOpen && (await handleMovement(positionX, positionY));
    }

    createScene();

    // リーンップ関数の強化
    return () => {
      // すべてのジオメトリとマテリアルを適切に破棄
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [positionX, positionY, changeScene]);

  return (
    <>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      {/* <div className="absolute bottom-4 left-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleLifeUpdate(1)}
        >
          Increase Life
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleLifeUpdate(-1)}
        >
          Decrease Life
        </Button>
      </div> */}
    </>
  );
};

export default RpgScreen;
