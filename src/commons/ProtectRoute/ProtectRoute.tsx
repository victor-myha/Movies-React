import { Navigate } from 'react-router-dom';
import { useUser } from '../../utils/hooks';

type PropsT = {
  isSecured?: boolean;
  children: JSX.Element;
};

export default ({ isSecured = true, children }: PropsT) => {
  const { isAuthorized } = useUser();

  if (isSecured && !isAuthorized) return <Navigate to='/sign-in' />;
  if (!isSecured && isAuthorized) return <Navigate to='/' />;
  return children;
};
