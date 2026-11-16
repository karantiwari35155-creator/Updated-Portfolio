import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color={isDark ? "#3B82F6" : "#2563EB"} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function AuroraBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isDark 
            ? "radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.15), rgba(11, 17, 32, 0) 60%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1), rgba(11, 17, 32, 0) 50%)"
            : "radial-gradient(circle at 50% -20%, rgba(14, 165, 233, 0.1), rgba(248, 250, 252, 0) 60%), radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.05), rgba(248, 250, 252, 0) 50%)",
        }}
      />
      <Canvas camera={{ position: [0, 0, 40], fov: 75 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
