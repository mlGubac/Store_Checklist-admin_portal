import axios from "axios";

const BASE_URL = "http://rdfsedar.com/api/data/employees";
const TOKEN = "9|u27KMjj3ogv0hUR8MMskyNmhDJ9Q8IwUJRg8KAZ4";

const SedarApi = axios.get(BASE_URL, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default SedarApi;
