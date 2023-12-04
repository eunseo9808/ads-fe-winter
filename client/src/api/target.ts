import axios from "axios";

const BASE_URL = "http://localhost:4989/";

export const getTargetGroup = async (gender: string, ages: string[]) => {
  const queryAges = ages.join(",");

  const response = await axios.get(
    BASE_URL + `target-count?ages=${queryAges}&gender=${gender}`
  );
  return response.data;
};
