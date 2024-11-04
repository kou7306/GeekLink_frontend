"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface AvatarViewerProps {
  modelPath: string;
  size?: { width: number | string; height: number | string };
}

const AvatarViewer: React.FC<AvatarViewerProps> = ({
  modelPath,
  size = { width: "100%", height: "100%" }, // Default to 100% for responsive behavior
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0.5, 1.5);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    sceneRef.current.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        if (modelRef.current) {
          sceneRef.current.remove(modelRef.current);
        }
        modelRef.current = gltf.scene;
        gltf.scene.scale.set(0.35, 0.35, 0.35);
        gltf.scene.position.set(0, 0.5, 0);
        sceneRef.current.add(gltf.scene);

        // Render the scene once
        renderer.render(sceneRef.current, camera);
      },
      undefined,
      (error) => {
        console.error("Failed to load model:", error);
      }
    );

    // Handle resizing
    const resizeObserver = new ResizeObserver(() => {
      if (renderer && containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.render(sceneRef.current, camera); // Render on resize
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        resizeObserver.disconnect();
      }
    };
  }, [modelPath]);

  return (
    <div
      ref={containerRef}
      style={{
        width: typeof size.width === "string" ? size.width : `${size.width}px`,
        height:
          typeof size.height === "string" ? size.height : `${size.height}px`,
        display: "block",
      }}
    />
  );
};

export default AvatarViewer;
