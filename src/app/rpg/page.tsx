"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Page = () => {
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
    camera.position.set(0, -3, 2); // カメラの位置を上方に移動し、右方向に2単位移動
    camera.lookAt(0, 0, 0); // カメラの注視点をシーンの中心に設定
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // アンチエイリアスを有効にして、より滑らかな描画を行う

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // // キューブの作成
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //planegeometryの作成
    const planeGeometry = new THREE.PlaneGeometry(0.15, 2); //縦と横の幅を指定
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide, //両面を描画する
      transparent: true, //透明にする
      opacity: 0.7,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 1, 0); //x,y,zの位置を指定
    scene.add(plane);

    // 円柱の作成
    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32); // 半径0.2、高さ1、分割数32の円柱
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.rotation.x = Math.PI / 2; // 円柱を横に寝かせる
    scene.add(cylinder);

    const group = new THREE.Group();
    group.add(plane);
    group.add(cylinder);

    scene.add(group);

    camera.position.z = 2; //値を小さくすると拡大する

    // アニメーション関数
    const animate = () => {
      requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // plane.rotation.x += 0.01;
      // plane.rotation.y += 0.01;
      // capsule.rotation.x += 0.01;
      // capsule.rotation.y += 0.01;
      // circle.rotation.y += 0.01;
      // circle.rotation.x += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ関数
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Page;
