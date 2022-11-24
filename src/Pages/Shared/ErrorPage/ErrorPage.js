import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import notFound from '../../../assets/images/notFound.png';
import { Button, Image } from 'react-bootstrap';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      {error && (
        <div className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
          <Image
            roundedCirc
            src={notFound}
            style={{ width: '350px', height: '350px' }}
          ></Image>
          <Link to="/">
            <Button variant="info" className="fw-semibold">
              Back to Home
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
