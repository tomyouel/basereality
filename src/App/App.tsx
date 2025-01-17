import { FC, useEffect, useRef, useState } from 'react';
import './App.css';
import {
  RoundedModule,
  FullFlexbox,
  HorizontalFlexbox,
  VerticalFlexbox,
  Hero,
  GlobalStyle,
} from './App.styles';

import HeroScene from '../Three/HeroScene/HeroScene';

type UIReelProps = {
  reel: string[];
};

function App() {
  return (
    <>
      <GlobalStyle />
      <UI />
      <THREEScene />
    </>
  );
}

const UI: FC = () => {
  return (
    <>
      <FullFlexbox>
        <HorizontalFlexbox>
          <RoundedModule>BASE REALITY</RoundedModule>
          <HorizontalFlexbox>
            <RoundedModule>Work</RoundedModule>
            <RoundedModule>GitHub</RoundedModule>
          </HorizontalFlexbox>
        </HorizontalFlexbox>
        <VerticalFlexbox>
          <HorizontalFlexbox>
            <UIReel
              reel={[
                'React',
                'Frontend',
                'Next.js',
                'TypeScript',
                'Three.js',
                'AWS',
                'Redux',
                'AR',
                'Pixel Streaming',
              ]}
            />
          </HorizontalFlexbox>
        </VerticalFlexbox>
      </FullFlexbox>
    </>
  );
};

const UIReel: FC<UIReelProps> = (props: UIReelProps) => {
  const { reel } = props;

  const [heroCopy, setHeroCopy] = useState<string>(props.reel[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCopy((heroCopy) => {
        const index = reel.findIndex((value) => heroCopy === value);
        return reel[(index % (reel.length - 1)) + 1];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <Hero>{heroCopy}</Hero>;
};

const THREEScene: FC = () => {
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
};

export default App;
