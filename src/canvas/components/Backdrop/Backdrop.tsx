import { useRef } from "react";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useSnapshot } from "valtio";

import state from "../../../store";
const Backdrop = () => {
  const shadows = useRef<any>();
  const snap = useSnapshot(state);

  return (
    <AccumulativeShadows
      ref={shadows}
      position={[0, 0, -0.14]}
      temporal
      frames={60}
      alphaTest={snap.intro ? 0.15 : 0.8}
      scale={4}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
