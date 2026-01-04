//lanyard component from reactbits.dev with my prefered modifications
//showing some errors but works fine. Definitely an issue with Three js Might revisit later!
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
//====================
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../redux/actions/projectActions';
//============================



// replaced with my own imports
const CARD_GLB_URL = '/card.glb';
const CARD_IMAGE_URL = '/lanyard.png';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
//=========================================
    const dispatch = useDispatch();
    const { projects } = useSelector((state) => state.projectList);  
    useEffect(() => {
      dispatch(listProjects());
    }, [dispatch]);
//=============================================
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return (
  <div className="lanyard-wrapper h-[60vh] lg:h-[80vh] flex flex-col
    relative overflow-visible p-6 rounded-lg border border-terminal-text/20
    bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),rgba(0,0,0,0.85),#000)]" style={{ touchAction: 'none' }}>

    <div className="absolute right-3 top-2 text-terminal-prompt flex justify-end items-center gap-3 "><div className="text-xs">Status: Available</div> <div className="w-2 h-2 rounded-full bg-green-500"></div></div>

    {/*3D Canvas Layer */}
    <div className="absolute inset-0 overflow-visible z-99999 pointer-events-auto">
      
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.2 : 1.5]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 45}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={8}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>

    {/*my normal content */}
    <div className="flex flex-col items-center text-center space-y-4 relative top-[35%] z-10">
      <h2 className="text-2xl font-bold text-terminal-text mb-1">Lonnex Njenga</h2>
      <p className="text-terminal-prompt text-sm">Full Stack Developer</p>

      <p className="text-terminal-text/70 text-sm leading-relaxed">
        Building innovative solutions with modern technologies...
      </p>

      <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-terminal-text/20">
          <div>
            <p className="text-terminal-prompt font-bold text-lg">{projects?.length + 5 || 0}+</p>
            <p className="text-terminal-text/60 text-xs">Projects</p>
          </div>
          <div>
            <p className="text-terminal-prompt font-bold text-lg">2+</p>
            <p className="text-terminal-text/60 text-xs">Years</p>
          </div>
          <div>
            <p className="text-terminal-prompt font-bold text-lg">70+</p>
            <p className="text-terminal-text/60 text-xs">Commits</p>
          </div>
        </div>
    </div>

  </div>
);
    

}
function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
//================================================
  // ----ASSET LOADING USING PUBLIC URLS---
  const { nodes, materials } = useGLTF(CARD_GLB_URL);
  const cardTexture = useTexture(CARD_IMAGE_URL);
  const bandTexture = useTexture(CARD_IMAGE_URL);


  //issue fix: Applying texture settings immediately after loading ***
  useEffect(() => {
    cardTexture.flipY = false;
    cardTexture.needsUpdate = true;
     cardTexture.repeat.set(1, 1.2);
    // cardTexture.offset.set(0.05, 0.05);

     bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

    //Here, add a cleanup function to dispose of textures when the component unmounts.
    //a good practice for memory management in Three.js.
    return () => {
        cardTexture.dispose();
        bandTexture.dispose();
    };

  }, [cardTexture, bandTexture]);

//==========================================


  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 8 : 16));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 7, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={4.25}
            position={[0, -3.7, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => {
              //======================================================================
              //essential fix for preventing mobile scrolling/zooming during drag. This gave me a hard time!
              if (isMobile && e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
                  e.nativeEvent.preventDefault(); 
                  e.stopPropagation();
              }
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
            //======================================================================
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
