"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Page = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  let roadX = 0;
  let roadY = 0;

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
    camera.position.set(0, -3, 2); // カメラの位置
    camera.lookAt(0, 0, 0); // カメラの注視点をシーンの中心に設定
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

    //まっすぐの道を作る関数
    function createNextRoadAndSquare(x: number, y: number) {
      // 円柱の作成
      const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32); // 半径0.2、高さ1、分割数32の円柱
      const cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.rotation.x = Math.PI / 2; // 円柱を横に寝かせる
      cylinder.position.set(x, y, 0); // 中心のマス

      //道の作成
      const planeGeometry = new THREE.PlaneGeometry(0.15, 3); //縦と横の幅を指定
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //両面を描画する
        transparent: true, //透明にする
        opacity: 0.3,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(x, y + 1.5, 0); // 道の位置を中心に

      group.add(cylinder);
      group.add(plane);
    }

    //右に曲がってますと道を作る
    function createRightBesideRoadAndSquare(x: number, y: number) {
      //道の作成
      const planeGeometry = new THREE.PlaneGeometry(0.15, 2); //縦と横の幅を指定
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //両面を描画する
        transparent: true, //透明にする
        opacity: 0.3,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.z = Math.PI / 2; // 90度回転
      plane.position.set(x + 1, y, 0);
      group.add(plane);
      createNextRoadAndSquare(x + 2, y);
    }

    //左に曲がってますと道を作る
    function createLeftBesideRoadAndSquare(x: number, y: number) {
      //道の作成
      const planeGeometry = new THREE.PlaneGeometry(0.15, 2); //縦と横の幅を指定
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide, //両面を描画する
        transparent: true, //透明にする
        opacity: 0.3,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.z = Math.PI / 2; // 90度回転
      plane.position.set(x - 1, y, 0);
      group.add(plane);
      createNextRoadAndSquare(x - 2, y);
    }

    camera.position.z = 3; //値を小さくすると拡大する

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
        const targetPositionX = camera.position.x + 2; // 1マス進む
        let hasUpdatedRoadX = false; // フラグを追加
        function step() {
          if (camera.position.x < targetPositionX) {
            camera.position.x += 0.02;
            requestAnimationFrame(step);
          } else {
            if (!hasUpdatedRoadX) {
              // まだ更新していない場合のみ実行
              roadX += 2;
              hasUpdatedRoadX = true;
            }
            resolve();
          }
          renderer.render(scene, camera);
        }
        step();
      });
    }

    //左に一マス歩く
    function runLeft() {
      return new Promise<void>((resolve) => {
        const targetPositionX = camera.position.x - 2; // 1マス進む
        let hasUpdatedRoadX = false; // フラグを追加
        function step() {
          if (camera.position.x > targetPositionX) {
            camera.position.x -= 0.02;
            requestAnimationFrame(step);
          } else {
            if (!hasUpdatedRoadX) {
              // まだ更新していない場合のみ実行
              roadX -= 2;
              hasUpdatedRoadX = true;
            }
            resolve();
          }
          renderer.render(scene, camera);
        }
        step();
      });
    }

    //選択画面を作成し、選択結果を返す
    function createSelectRoad(): Promise<string> {
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

        modal.appendChild(leftButton);

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

        modal.appendChild(straightButton);

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

        modal.appendChild(rightButton);

        // モーダルを表示
        document.body.appendChild(modal);
      });
    }

    async function createScene() {
      createRoadAndSquare();
      await createLeftBesideRoadAndSquare(0, 2);
      await createRightBesideRoadAndSquare(0, 2);
      await createNextRoadAndSquare(0, 2);
      await createNextRoadAndSquare(0, 5);
      await createRightBesideRoadAndSquare(2, 5);
      await createNextRoadAndSquare(2, 5);
      await createLeftBesideRoadAndSquare(-2, 5);
      await createNextRoadAndSquare(0, 8);
      await createLeftBesideRoadAndSquare(0, 8);
      await run();

      // モーダルで選択を待つ
      const direction = await createSelectRoad();

      // 選択結果に応じて処理を分岐
      if (direction === "left") {
        await runLeft();
      } else if (direction === "right") {
        await runRight();
      } else {
        await run();
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
