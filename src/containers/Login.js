import { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import actions from '../redux/actions/message';
import { useAuth, useFormErrors } from '../api';
import { Button, Input, FlashMessage } from '../components';

export function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);

  const { error, login } = useAuth();
  const [errors] = useFormErrors(error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Display the error message when login fails
  useEffect(() => {
    if (error && error.message) {
      dispatch(actions.error('Authentication failed', error.message));
    }
  }, [error]);

  if (user.authenticated) {
    const { state } = history.location;
    const location = state && state.backTo ? state.backTo : '/';
    return <Redirect to={location} />;
  }

  return (
    <div
      className="relative flex flex-col justify-center items-center h-full w-full bg-login bg-cover"
      style={{ minHeight: 724 }}
    >
      <FlashMessage className="absolute top-0 mt-16" />
      <form className="bg-white shadow-md rounded-xl w-345 h-413">
        <div className="px-8 py-3">
          <div className="mb-6 text-lg text-gray-300">Sign in</div>
          <div className="mb-3">
            <label className="block text-xs text-gray-500" htmlFor="email">
              Email address
            </label>
            <Input id="email" placeholder="Email" error={errors.email} onChange={setEmail} />
          </div>
          <div className="h-20">
            <label className="block text-xs text-gray-500" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              error={errors.password}
              onChange={setPassword}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button color={Button.COLOR_PURPLE} width="w-full" onClick={() => login(email, password)}>
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
