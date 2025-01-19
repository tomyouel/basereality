import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import {
  RoundedModule,
  FullFlexbox,
  HorizontalFlexbox,
  VerticalFlexbox,
  Hero,
  GlobalStyle,
  HeroVideo,
} from './App.styles';

import Showreel from '../assets/showreel.mp4';

type UIReelProps = {
  reel: string[];
  opacity: boolean;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <UI />
    </>
  );
}

const UI: FC = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [displayReel, setDisplayReel] = useState<boolean>(false);

  useEffect(() => {
    let timeout: number;
    if (videoLoaded) {
      timeout = setTimeout(() => setDisplayReel(true), 4000);
    }
    return () => clearTimeout(timeout);
  }, [videoLoaded]);
  return (
    <>
      <FullFlexbox>
        <HorizontalFlexbox>
          <RoundedModule>BASE REALITY</RoundedModule>
          <HorizontalFlexbox>
            <RoundedModule
              onClick={() =>
                window.open('https://github.com/tomyouel', '_blank')
              }
              style={{ cursor: 'pointer' }}
            >
              GitHub
            </RoundedModule>
            <RoundedModule
              onClick={() =>
                window.open('https://linkedin.com/in/tomyouel', '_blank')
              }
              style={{ cursor: 'pointer' }}
            >
              LinkedIn
            </RoundedModule>
          </HorizontalFlexbox>
        </HorizontalFlexbox>
        <VerticalFlexbox>
          <HorizontalFlexbox
            style={{ position: 'absolute', width: '100%', height: 'auto' }}
          >
            <UIReel
              reel={[
                'Creative Frontend',
                'TypeScript',
                'React',
                'Three.js',
                'Next.js',
                'Redux',
                'Web AR',
                '8th Wall',
                'AWS',
              ]}
              opacity={displayReel}
            />
          </HorizontalFlexbox>
          <VerticalFlexbox>
            <HorizontalFlexbox
              style={{ justifyContent: 'center', width: '100%' }}
            >
              <HeroVideo
                ref={heroVideoRef}
                src={Showreel}
                playsInline
                muted
                autoPlay
                style={{
                  opacity: videoLoaded ? 1 : 0,
                }}
                onLoadedMetadata={() => setVideoLoaded(true)}
                onEnded={() => {
                  setDisplayReel(false);
                  heroVideoRef.current!.currentTime = 0;
                  heroVideoRef.current!.play();
                  setTimeout(() => setDisplayReel(true), 4000);
                }}
              />
            </HorizontalFlexbox>
          </VerticalFlexbox>
        </VerticalFlexbox>
      </FullFlexbox>
    </>
  );
};

const UIReel: FC<UIReelProps> = ({ reel, opacity }) => {
  const [heroCopy, setHeroCopy] = useState<string>(reel[0]);

  useEffect(() => {
    if (!opacity) return;
    const interval = setInterval(() => {
      setHeroCopy((heroCopy) => {
        const index = reel.findIndex((value) => heroCopy === value);
        return reel[(index % (reel.length - 1)) + 1];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [opacity]);

  return <Hero style={{ opacity: opacity ? 1 : 0 }}>{heroCopy}</Hero>;
};

/*const THREEScene: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  return (
    <canvas
      ref={(ref: HTMLCanvasElement) => {
        if (!canvasRef.current) {
          canvasRef.current = ref;
          new HeroScene(canvasRef.current);
        }
      }}
    />
  );
};*/

export default App;
