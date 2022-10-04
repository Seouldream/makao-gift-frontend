// import LoginForm from '../components/LoginForm';
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <img src="../assets/juiceMaker.jpeg" alt="productImg" />
      <h2>
        제품번호:
        {' '}
        {params.productId}
      </h2>
    </>
  );
}
