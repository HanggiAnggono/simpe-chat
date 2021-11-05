import axios from "axios";
import { RandomUserResponse } from "randomuser";

export function getRandomUser(count?: number) {
  let path = "https://randomuser.me/api/";
  if (count) path += `?results=${count}`;

  return axios.get<RandomUserResponse>(path);
}
