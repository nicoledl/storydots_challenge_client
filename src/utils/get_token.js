function getToken() {
  let token;

  if (typeof window !== 'undefined') {
      token = JSON.parse(localStorage.getItem('token'));
  }
  
  return token;
};
  
export {getToken};