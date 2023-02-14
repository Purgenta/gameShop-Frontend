import axios from "axios";
const baseURL = "http://localhost:8080/";
const authenticatedAxios = axios.create({ baseURL });
export default axios.create({
  baseURL,
});
export { authenticatedAxios };
