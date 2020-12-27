import axios from "axios";

const instance = axios.create({
  baseURL: "https://slack-chatapp-mern.herokuapp.com",
});

export default instance;
