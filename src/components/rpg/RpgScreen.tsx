"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Direction = "left" | "straight" | "right";

type Coordinate = {
  x: number;
  y: number;
  availableDirections: Direction[];
};

const selectCoordinates: Coordinate[] = [
  { x: 0, y: 0, availableDirections: ["straight"] },
  {
    x: 0,
    y: 3,
    availableDirections: ["left", "straight", "right"],
  },
  { x: -2, y: 3, availableDirections: ["straight"] },
  { x: -2, y: 6, availableDirections: ["left"] },
  { x: -4, y: 6, availableDirections: ["straight"] },
  { x: 0, y: 6, availableDirections: ["straight"] },
  { x: 0, y: 9, availableDirections: ["left", "straight"] },
  { x: -2, y: 9, availableDirections: ["straight"] },
  { x: 2, y: 3, availableDirections: ["straight"] },
  { x: 2, y: 6, availableDirections: ["straight", "right"] },
  { x: 4, y: 6, availableDirections: ["straight"] },
];

const items = [
  {
    x: -2,
    y: 3,
    name: "コイン",
    type: "coin",
    image: "coin.png",
    isCollected: false,
  },
  {
    x: 0,
    y: 6,
    name: "王冠",
    type: "costume",
    image: "crown.png",
    isCollected: true,
  },
  {
    x: 0,
    y: 9,
    name: "ライフ",
    type: "life",
    image: "life.png",
    isCollected: false,
  },
];

const Page = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  //この値をデータベースで保管して、再度アクセスした時に前回の位置から再開できるようにする
  let roadX = 0;
  let roadY = 0;

  // グローバルな参照を作成
  let mockAvatar: THREE.Mesh | null = null;

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
    camera.lookAt(0, 0, -0.6); // カメラの注視点をシーンの中心に設定
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアスを有効にして、より滑らかな描画を行う

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    //星を作成する関数
    function createStarField() {
      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(50000 * 3);

      for (let i = 0; i < 50000; i++) {
        positions[i * 3] = 3000 * (Math.random() - 0.5); // x
        positions[i * 3 + 1] = 3000 * (Math.random() - 0.5); // y
        positions[i * 3 + 2] = 3000 * (Math.random() - 0.5); // z
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

    //モックのアバターを作る関数
    function createMockAvatar() {
      const boxGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.1);
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff }),
      ];

      mockAvatar = new THREE.Mesh(boxGeometry, materials);
      mockAvatar.position.set(0, -0.75, -2);
      camera.add(mockAvatar);
      scene.add(camera);
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
    function createSquare(x: number, y: number) {
      const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32); // 半径0.2、高さ1、分割数32の円柱
      const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.rotation.x = Math.PI / 2; // 円柱を横に寝かせる
      cylinder.position.set(x, y - 1, 0); // 中心のマス
      group.add(cylinder);
    }

    //2点の座標から道を作る関数()
    function createRoad(x1: number, y1: number, x2: number, y2: number) {
      if (x1 === x2) {
        const planeGeometry = new THREE.PlaneGeometry(0.15, 3); //縦と横の幅を指定
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          side: THREE.DoubleSide, //両面を描画する
          transparent: true, //透明にする
          opacity: 0.3,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(x1, y1 + 0.5, 0); // 道の位置を中心に
        group.add(plane);
      } else {
        const planeGeometry = new THREE.PlaneGeometry(0.15, 2); //縦と横の幅を指定
        const planeMaterial = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
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

    // アイテムのメッシュを追跡するためのマップを追加
    const itemMeshes = new Map<string, THREE.Mesh>();

    //モックのアイテムを作る関数
    function createItem(x: number, y: number) {
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
      if (item) {
        item.isCollected = true;

        // シーンからアイテムを削除
        const mesh = itemMeshes.get(`${x},${y}`);
        if (mesh) {
          group.remove(mesh);
          mesh.geometry.dispose();
          mesh.material instanceof THREE.Material && mesh.material.dispose();
          itemMeshes.delete(`${x},${y}`);

          // スナックバーを作成
          const snackbar = document.createElement("div");
          snackbar.style.position = "fixed";
          snackbar.style.bottom = "20px";
          snackbar.style.left = "50%";
          snackbar.style.transform = "translateX(-50%)";
          snackbar.style.backgroundColor = "#333";
          snackbar.style.color = "white";
          snackbar.style.padding = "16px";
          snackbar.style.borderRadius = "4px";
          snackbar.style.zIndex = "1000";
          snackbar.textContent = `${item?.name}を獲得しました！`;

          document.body.appendChild(snackbar);

          // 3秒後にスナックバーを削除
          setTimeout(() => {
            document.body.removeChild(snackbar);
          }, 3000);
        }
      }
    }

    //最初の移動をしてカメラの位置を合わせる
    function firstRun() {
      return new Promise<void>((resolve) => {
        const targetPositionX = roadX;
        const targetPositionY = roadY - 2.0;
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
            camera.position.y += 2;
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
        const targetPositionY = camera.position.y + 3; // 1マス進む
        let hasUpdatedRoadY = false; // フラグを追加
        function step() {
          if (camera.position.y < targetPositionY) {
            camera.position.y += 0.02;
            requestAnimationFrame(step);
          } else {
            if (!hasUpdatedRoadY) {
              // まだ更新していない場合のみ実行
              roadY += 3;
              hasUpdatedRoadY = true;
            }
            collectItem(roadX, roadY);
            resolve();
          }
          renderer.render(scene, camera);
        }
        step();
      });
    }

    //右に一マス歩く
    function runRight() {
      return new Promise<void>((resolve) => {
        const targetPositionX = camera.position.x + 2;
        let hasUpdatedRoadX = false; //一回だけ実行するためのフラグ
        let rotationProgress = 0;
        const targetRotation = -Math.PI / 2; //-90度
        let isMoving = true; //動いているかどうかのフラグ

        function step() {
          if (isMoving) {
            if (camera.position.x < targetPositionX) {
              camera.position.x += 0.02; //1マス進む

              if (mockAvatar && rotationProgress > targetRotation) {
                rotationProgress -= 0.1; //-90度になるまで回転
                mockAvatar.rotation.y = rotationProgress;
              }
              requestAnimationFrame(step);
            } else {
              if (!hasUpdatedRoadX) {
                roadX += 2; //1マス右に
                hasUpdatedRoadX = true;
              }
              isMoving = false;
              // 回転を元に戻す処理を開始
              rotationProgress = targetRotation;
              step();
            }
          } else {
            // 回転を元に戻す
            if (mockAvatar && rotationProgress < 0) {
              rotationProgress += 0.1;
              mockAvatar.rotation.y = rotationProgress;
              requestAnimationFrame(step);
            } else {
              // 完全に元に戻ったら終了
              if (mockAvatar) mockAvatar.rotation.y = 0;
              collectItem(roadX, roadY);
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
        let rotationProgress = 0;
        const targetRotation = Math.PI / 2;
        let isMoving = true;

        function step() {
          if (isMoving) {
            if (camera.position.x > targetPositionX) {
              camera.position.x -= 0.02;

              if (mockAvatar && rotationProgress < targetRotation) {
                rotationProgress += 0.1;
                mockAvatar.rotation.y = rotationProgress;
              }
              requestAnimationFrame(step);
            } else {
              if (!hasUpdatedRoadX) {
                roadX -= 2;
                hasUpdatedRoadX = true;
              }
              isMoving = false;
              rotationProgress = targetRotation;
              step();
            }
          } else {
            // 回転を元に戻す
            if (mockAvatar && rotationProgress > 0) {
              rotationProgress -= 0.1;
              mockAvatar.rotation.y = rotationProgress;
              requestAnimationFrame(step);
            } else {
              if (mockAvatar) mockAvatar.rotation.y = 0;
              collectItem(roadX, roadY);
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
        leftButton.onmouseover = () => {
          leftButton.style.backgroundColor = "#45a049";
        };
        leftButton.onmouseout = () => {
          leftButton.style.backgroundColor = "#4CAF50";
        };
        leftButton.onclick = () => {
          if (isModalClosed) return; // 既に閉じている場合は何もしない
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
        straightButton.onmouseover = () => {
          straightButton.style.backgroundColor = "#45a049";
        };
        straightButton.onmouseout = () => {
          straightButton.style.backgroundColor = "#4CAF50";
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
        rightButton.onmouseover = () => {
          rightButton.style.backgroundColor = "#45a049";
        };
        rightButton.onmouseout = () => {
          rightButton.style.backgroundColor = "#4CAF50";
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

        // モーダルを表示
        document.body.appendChild(modal);
      });
    }

    async function createScene() {
      let exit = false;

      console.log(roadX, roadY);
      await createMockAvatar();
      createRoadAndSquare();
      //マスの作成
      selectCoordinates.forEach((coordinate) => {
        createSquare(coordinate.x, coordinate.y);
      });
      await createRoad(0, 3, 2, 3);
      await createRoad(0, 3, 0, 6);
      await createRoad(0, 6, 0, 9);
      await createRoad(0, 9, 0, 12);
      await createRoad(0, 9, -2, 9);
      await createRoad(2, 3, 2, 6);
      await createRoad(2, 6, 4, 6);
      await createRoad(2, 6, 2, 9);
      await createRoad(4, 6, 4, 9);
      await createRoad(0, 3, -2, 3);
      await createRoad(-2, 3, -2, 6);
      await createRoad(-2, 6, -4, 6);
      await createRoad(-4, 6, -4, 9);
      await createRoad(-2, 9, -2, 12);
      items.forEach((item) => {
        //アイテムがまだ取得されていない場合はアイテムを作成
        if (!item.isCollected) {
          createItem(item.x, item.y);
        }
      });
      // await run();
      await firstRun();
      while (!exit) {
        console.log(roadX, roadY);
        // 現在の座標に対応するCoordinateを取得
        const currentCoordinate = selectCoordinates.find(
          (coord) => coord.x === roadX && coord.y === roadY
        );

        // モーダルで選択を待つ（利用可能な方向のみ表示）
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
    }

    createScene();

    // // アニメーション関数
    // const animate = () => {
    //   requestAnimationFrame(animate);

    //   renderer.render(scene, camera);
    // };

    // animate();

    // クリーンアップ関数
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Page;