import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSetTitle from '../../hooks/useSetTitle';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, signIn, passwordReset } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState('');
  useSetTitle('Login');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || '/';
  console.log(from);

  const handleLogin = (data, e) => {
    e.preventDefault();

    console.log(data);
    const email = data.email;
    const password = data.password;

    //* Sign In
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Logged in successfully');

        setLoginUserEmail(email);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message.slice(22, -2));
      });
  };

  // console.log(userEmail);
  const handlePasswordReset = () => {
    console.log(loginUserEmail);
    passwordReset(loginUserEmail)
      .then(() => {
        toast.info('Please check your email to reset your password');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div className="login-page-container">
      <div className="container form-page">
        <div className="pt-5 form-container">
          <div className="text-center ">
            <h2>Sign In</h2>
            <p className=" text-white-50">Sign in to access your account</p>
          </div>
          <Form
            onSubmit={handleSubmit(handleLogin)}
            className=" d-flex flex-column p-4 "
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Email </Form.Label>
              <Form.Control
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="Enter email"
              />

              {errors.email && (
                <p className="text-danger mb-0">{errors.email?.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message:
                      'Password must be at least 6 characters (one special case, one digit, one lowercase letter)',
                  },
                  pattern: {
                    value: /(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      'Password must be one special case, one digit, one lowercase letter',
                  },
                })}
                type="password"
                placeholder="******"
              />

              {errors.password && (
                <p className="text-danger mb-0">{errors.password?.message}</p>
              )}
            </Form.Group>

            <Button
              className="d-block w-100 fw-semibold btn-sign-in"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <Form.Text>
              <Link onClick={handlePasswordReset} className="text-white-50">
                Forgot Password?
              </Link>
            </Form.Text>
          </Form>

          <p className="text-center py-2">
            <small className="text-white-50">
              Don't have an account? &nbsp;
              <Link to="/signup" className="text-white fw-semibold">
                Create an account
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
