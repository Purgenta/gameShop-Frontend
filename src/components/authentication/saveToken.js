const saveToken = (token) => {
  localStorage.setItem("refreshToken", token);
};
const getToken = () => localStorage.getItem("refreshToken");

export { saveToken, getToken };
