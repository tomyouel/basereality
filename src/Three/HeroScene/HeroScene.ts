import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  Mesh,
  PlaneGeometry,
  VideoTexture,
  SRGBColorSpace,
  LinearFilter,
  RGBAFormat,
  MeshBasicMaterial,
  sRGBEncoding,
  CanvasTexture,
} from 'three';

import Showreel from '../../assets/showreel.mp4';

class HeroScene {
  private canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.createScene();
  }

  private createScene = () => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.z = 1.7;

    scene.add(camera);

    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = SRGBColorSpace;

    document.body.appendChild(renderer.domElement);

    const renderAnimations: Array<() => void> = [];

    const ambientLight = new AmbientLight(new Color(0x009dff), 1);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(new Color(0xffffff), 1);
    scene.add(directionalLight);

    /*const createBox = () => {
      const geometry = new BoxGeometry();
      const material = new MeshStandardMaterial({
        color: new Color(0xffffff),
        roughness: 0.3,
        metalness: 1,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      //renderAnimations.push(() => (mesh.rotation.x += 0.01));
    };*/

    const createPlane = () => {
      const video = document.createElement('video');
      video.src = Showreel;
      video.loop = true;
      video.muted = true;
      video.autoplay = true;
      video.play();

      const resizeVideoToPowerOfTwo = (video: HTMLVideoElement) => {
        const canvas = document.createElement('canvas');

        const width = Math.pow(
          2,
          Math.floor(Math.log(video.videoWidth) / Math.log(2)),
        );
        const height = Math.pow(
          2,
          Math.floor(Math.log(video.videoHeight) / Math.log(2)),
        );

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        context?.drawImage(video, 0, 0, width, height);

        const texture = new CanvasTexture(canvas);
        texture.needsUpdate = true;

        return texture;
      };

      const geometry = new PlaneGeometry();
      const texture = new VideoTexture(video); //resizeVideoToPowerOfTwo(video);
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.format = RGBAFormat;
      texture.encoding = sRGBEncoding;

      const material = new MeshBasicMaterial({
        map: texture,
      });

      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      video.addEventListener('loadedmetadata', () => {
        const { videoWidth, videoHeight } = video;
        const scale = 0.0025;
        mesh.scale.set(videoWidth * scale, videoHeight * scale, 1);
      });
    };

    const render = () => {
      renderAnimations.forEach((animation) => animation());
      renderer.render(scene, camera);
      requestAnimationFrame(() => render());
    };

    //createBox();
    createPlane();
    render();

    window.onresize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
  };
}

export default HeroScene;
