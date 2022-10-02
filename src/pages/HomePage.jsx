// import { useNavigate } from 'react-router-dom';

import { userStore } from '../stores/userStore';

// import styled from 'styled-components';
// import { useLocalStorage } from 'usehooks-ts';

// import main from '../assets/main.png';

export default function HomePage() {
//   const [accessToken] = useLocalStorage('accessToken', '');

  //   const navigate = useNavigate();

  //   const handleClickToTransfer = () => {
  //     if (accessToken ? navigate('/transfer') : navigate('/login'));
  //   };

  //   const handleClickToTransaction = () => {
  //     if (accessToken ? navigate('/transactions') : navigate('/login'));
  //   };

  const handleLogin = () => {
    userStore.login({ userId: 'makaoKim', password: 'iammakaoKim92!' });
  };

  return (
    <div>
      <p>특별한 아이템을 전하세요</p>
      <button type="button" onClick={handleLogin}>로그인</button>
    </div>
  );
}
