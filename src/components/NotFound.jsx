import { useHistory } from 'react-router-dom';

import { Button } from './common/Button';

export function NotFound() {
  const history = useHistory();
  return (
    <div
      style={{ backgroundSize: '100% auto' }}
      className="flex flex-col pb-64 text-center bg-no-repeat bg-bottom relative items-center justify-center w-screen h-screen bg-not-found"
    >
      <span className="font-extrabold text-6xl mb-4 text-gray-300">404</span>
      <span className="font-extrabold text-4xl mb-4 text-gray-100">Error!</span>
      <span className="text-lg mb-12 text-gray-500">Sorry! The page you were looking for doesn&apos;t exist.</span>
      <Button color={Button.COLOR_PURPLE} rounded={true} width="w-40" onClick={() => history.push('/')}>
        Go back to home
      </Button>
    </div>
  );
}
