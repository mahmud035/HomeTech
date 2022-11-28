export const setSocialLoginToken = (user) => {
  const currentUser = {
    email: user?.email,
  };

  fetch('https://hometech-server-side.vercel.app/jwt', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('accessToken2', data.accessToken2);
    });
};
