function getToken() {
  let token;

  if (typeof window !== 'undefined') {
      token = JSON.parse(localStorage.getItem('token'));
  }

  if (!token) {
      // console.error('No token found');
  }
  return token;
};
  
  export {getToken};