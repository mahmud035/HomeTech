import { useEffect, useState } from 'react';

const useToken = (email) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.accessToken2) {
            localStorage.setItem('accessToken2', data.accessToken2);
            setToken(data.accessToken2);
          }
        });
    }
  }, [email]);

  return [token];
};

export default useToken;
