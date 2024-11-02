"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface AvatarViewerProps {
  modelPath: string; // GLTFまたはGLBのパス
  size?: { width: number; height: number }; // 表示サイズ
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({
  modelPath,
  size = { width: 300, height: 300 }, // デフォルトサイズ
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null); // アニメーション用の参照
  const mixerRef = useRef<THREE.AnimationMixer | null>(null); // アニメーションミキサーの参照

  useEffect(() => {
    if (!containerRef.current) return;

    // レンダラーのセットアップ
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(size.width, size.height); // サイズを指定
    renderer.setClearColor(0x000000, 0); // 背景を透明に設定
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // カメラのセットアップ
    const camera = new THREE.PerspectiveCamera(
      45,
      size.width / size.height, // アスペクト比を指定
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 1.5); // カメラの位置を調整（より近づける）
    camera.lookAt(0, 0.5, 0); // モデルの中心を向くように設定
    cameraRef.current = camera;

    // 照明の追加
    const ambientLight = new THREE.AmbientLight(0x404040); // ソフトな白色光
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    sceneRef.current.add(directionalLight);

    // モデルを読み込み
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        gltf.scene.scale.set(0.25, 0.25, 0.25); // モデルをさらに小さくスケーリング
        gltf.scene.position.set(0, 0, 0); // モデルの位置を調整
        sceneRef.current.add(gltf.scene);

        // アニメーションがあればミキサーを作成
        if (gltf.animations && gltf.animations.length) {
          mixerRef.current = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixerRef.current?.clipAction(clip).play();
          });
        }

        animate(); // アニメーション開始
      },
      undefined,
      (error) => {
        console.error("モデルの読み込みに失敗しました:", error);
      }
    );

    const animate = () => {
      // アニメーションの更新
      if (mixerRef.current) {
        const delta = 0.016; // 毎フレームのデルタ時間（約60fps）
        mixerRef.current.update(delta);
      }
      // 毎フレームのレンダリング
      renderer.render(sceneRef.current, cameraRef.current!);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // 初回レンダリングを行う
    renderer.render(sceneRef.current, camera);

    return () => {
      // コンポーネントがアンマウントされる際のクリーンアップ
      if (renderer) {
        renderer.dispose();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, size]); // sizeを依存配列に追加

  return (
    <div
      ref={containerRef}
      style={{
        width: size.width,
        height: size.height,
        display: "block", // display: blockを適用
      }}
    />
  );
};

export default AvatarViewer;
