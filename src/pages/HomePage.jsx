// import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
// import gift from '../assets/images/001.png';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
`;

const Line1 = styled.p`
  font-size: 2em;
  
`;

const MainMessage = styled.h1`
  font-size: 4em;
  padding: 0.5em 0;
  position: relative;
`;

const Line2 = styled.p`
  font-size: 1em;
`;

const Image = styled.img`
  width:35em;
  position: absolute;
  top:-70%;
  left:50%;
`;

export default function HomePage() {
  return (
    <Container>
      <Image src="" />
      <Line1>
        무엇을 선물할 지  고민이라면
      </Line1>
      <MainMessage>
        특별한
        <br />
        아이템을 전하세요
      </MainMessage>
      <Line2>마카오 선물하기에서만 볼 수 있는 특별한 아이템</Line2>
    </Container>
  );
}
