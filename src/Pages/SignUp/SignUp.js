import React, { useContext, useEffect } from 'react';
import './SignUp.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import useSetTitle from '../../hooks/useSetTitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, updateUser, googleSignIn, githubSignIn } =
    useContext(AuthContext);

  const navigate = useNavigate();
  useSetTitle('Sign Up');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignUp = (data) => {
    // console.log(data);
    const image = data.image[0];
    // console.log(image);

    //* Image Upload to Imgbb Server
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;

    fetch(url, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((imageData) => {
        // console.log(imageData);
        if (imageData.success) {
          const imageURL = imageData?.data?.display_url;

          //* Create User
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              console.log(user);
              toast.success('Account Created Successfully');

              const userInfo = {
                displayName: data.name,
                photoURL: imageURL,
              };

              //* Update User Information / Profile
              updateUser(userInfo)
                .then(() => {
                  //* Save user information to database
                  saveUser(data.name, data.email);
                })
                .catch((error) => {
                  toast.error(error.message.slice(22, -2));
                });
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.message.slice(22, -2));
            });
        }

        if (imageData.error) {
          toast.info('Please upload .jpg /.jpeg /.png type image');
        }
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('SavedUser:', data);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Account Created successfully');

        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message.slice(22, -2));
      });
  };

  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Account Created successfully');

        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message.slice(22, -2));
      });
  };

  return (
    <div className="register-page-container">
      <div className="container form-page pt-5 pb-5">
        <div className="pt-5 px-4 form-container">
          <div className="text-center">
            <h2>Please Sign Up</h2>
            <p className="text-white-50">Create a new account</p>
          </div>
          <Form
            onSubmit={handleSubmit(handleSignUp)}
            className=" d-flex flex-column  py-3"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Full Name </Form.Label>
              <Form.Control
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Your name"
              />

              {errors.name && (
                <p className="text-danger mb-0">{errors.name?.message}</p>
              )}
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Photo</Form.Label>
              <Form.Control
                {...register('image', { required: 'Photo is required' })}
                type="file"
                accept="image/*"
              />

              {errors.image && (
                <p className="text-danger mb-0">{errors.image?.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <div className="d-flex">
                <Form.Check type="checkbox" label="" />
                <p style={{ fontSize: '14px' }}>
                  I agree to the &nbsp;
                  <Link className="text-decoration-none">Terms of service</Link>
                  &nbsp;and&nbsp;
                  <Link className="text-decoration-none">Privacy Policy.</Link>
                </p>
              </div>
            </Form.Group>
            <Button
              className="d-block w-100 fw-semibold btn-register"
              variant="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>

          <div className="d-flex gap-3 align-items-center social-accounts-sign-up">
            <p></p>
            <p className="text-center">
              <small className="fw-semibold">Or</small>
            </p>
            <p></p>
          </div>

          <div className="text-center py-3">
            <ButtonGroup vertical>
              <Button
                onClick={handleGoogleSignIn}
                className="mb-3 rounded text-white"
                variant="outline-info"
              >
                <FcGoogle size={20} className="me-3 mb-1 " />
                <span>Continue with Google</span>
              </Button>

              <Button
                onClick={handleGithubSignIn}
                className=" rounded text-white"
                variant="outline-dark"
              >
                <BsGithub size={20} className="me-3 mb-1" />
                <span>Continue with Github</span>
              </Button>
            </ButtonGroup>
          </div>

          <p className="text-center">
            <small className="text-white-50">
              Already have an account? &nbsp;
              <Link to="/login" className="text-white fw-semibold ">
                Log in
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
