import axios from "axios";

const instance = axios.create({
  baseURL: "https://leonardooluz.github.io/json-trato-tech/",
});

export default instance;