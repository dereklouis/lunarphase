import './App.css';
import './styles/earth.css';
import './styles/moon.css';
import sun from './images/sun.png';
import earth from './images/earth.png';
import moon from './images/moon.png';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function App() {
  const canvasRef = useRef(null);
  const scene = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Scene is the container that holds everything
    scene.current = new THREE.Scene();

    //There are many types of cameras, but perspective is most common.
    //It mimics the human eyeball
    //First argument is the field of view in degrees (out of 360)
    //Second argument is aspect ratio
    //Last two arguments are the 'view frustum' to determine what objects are
    //visible, relative to the camera itself
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 3, window.innerWidth / 3);

    camera.position.setZ(2);

    renderer.render(scene.current, camera);

    // PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
    const pointLight = new THREE.PointLight(0xffffff, 2);

    // pointLight.position.set(10, 0, 1);

    pointLight.position.set(-0.0040734640739035575, 0, 19.999999585172258);

    // AmbientLight( color : Integer, intensity : Float )
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);

    scene.current.add(pointLight, ambientLight);

    // scene.current.add(pointLight);

    //Blender

    const loader = new GLTFLoader();

    loader.load(
      '/moon.gltf',
      function (gltf) {
        scene.current.add(gltf.scene);
      },
      function (xhr) {
        if (xhr.currentTarget.response) {
          setLoading(false);
        }
      },
      function (error) {
        console.error(error);
      }
    );

    //Recursive infinite loop to keep rerendering the animation
    let t = 1.571;
    function animate() {
      requestAnimationFrame(animate);

      if (scene.current.children[2]) {
        t += 0.01;
        scene.current.children[0].position.x = String(20 * Math.cos(t) + 0);
        scene.current.children[0].position.z = String(20 * Math.sin(t) + 0);
      }

      renderer.render(scene.current, camera);
    }

    animate();
  }, []);

  return (
    <div id="appMaster">
      <canvas ref={canvasRef}></canvas>
      <div id="loadingScreen">
        <div id="loadingBar">
          <p>Loading</p>
          <div id="loadingBalls">
            <img src={sun} alt="sun" id="loadingSun" />
            <img src={earth} alt="earth" id="loadingEarth" />
            <img src={moon} alt="moon" id="loadingMoon" />
          </div>
        </div>
      </div>
      <div id="earthOrbit">
        <div id="lunarOrbit">
          <div id="moonBox">
            <div id="lunarShadow" />
            <img src={moon} alt="moon" id="moon" />
          </div>
        </div>
        <div id="earthBox">
          <div id="earthShadow" />
          <img src={earth} alt="earth" id="earth" />
        </div>
      </div>
      <img src={sun} alt="sun" id="sun" />
    </div>
  );
}

export default App;
