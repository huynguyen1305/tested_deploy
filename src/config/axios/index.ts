import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://3.1.107.165:4000";
axios.defaults.baseURL = BASE_URL;
