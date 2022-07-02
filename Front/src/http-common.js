import axios from "axios";
export default axios.create({
  baseURL: "https://localhost:44357/api/",
  headers: {
    "Content-type": "application/json"
  }
});