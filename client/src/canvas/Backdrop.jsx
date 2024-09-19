import React from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      resolution={2048}
    >
      <RandomizedLight
        amount={5}
        radius={9}
        intensity={0.99}
        ambient={0.25}
        position={[1, 1, 1]}
      />
      <RandomizedLight
        amount={6}
        radius={5}
        intensity={0.99}
        ambient={0.25}
        position={[-2, 3, -5]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
