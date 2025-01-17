import styled from 'styled-components';
import Kanit from '../fonts/Kanit-SemiBold.ttf';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KanitSemiBold';
    src: url(${Kanit}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'KanitSemiBold', sans-serif;
  }
`;

const RoundedModule = styled.div`
  padding: 10px;
  margin: 10px;
  border-color: white;
  border-radius: 9px;
  border-style: solid;
  font-family: 'KanitSemiBold', sans-serif;
`;

const Copy = styled.span`
  font-family: 'KanitSemiBold';
`;

const Header = styled.span`
  font-size: 12px;
`;

const Hero = styled.div`
  padding: 10px;
  margin: 10px;
  font-size: 100px;
  width: 20%;
  line-height: 100%;
`;

const Logo = styled.div`
  width: fit-content;
  height: fit-content;
`;

const HorizontalFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VerticalFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const FullFlexbox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export {
  GlobalStyle,
  FullFlexbox,
  VerticalFlexbox,
  HorizontalFlexbox,
  Logo,
  Hero,
  Header,
  RoundedModule,
  Copy,
};
