import { axiosInstance } from "../libs/axios.instance";
import { IFetchUser, ILogin } from "../types";
import defaultPic from "../assets/icons/user.png";

export function fetchUser(token: string) {
  return axiosInstance<IFetchUser>({
    method: "get",
    url: "/user",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function sendLoginCredentials(username: string, password: string) {
  const axiosPayload = {
    username: username,
    password: password,
  };
  return axiosInstance<ILogin>({
    method: "post",
    url: "/user/login",
    data: axiosPayload,
  });
}

export function sendRegistrationCredentials(
  username: string,
  password: string,
  displayName: string,
) {
  const axiosPayload = {
    username: username,
    password: password,
    displayName: displayName,
  };
  return axiosInstance<string>({
    method: "post",
    url: "/user/register",
    data: axiosPayload,
  });
}

export function getUserPicByID(userID: string) {
  return defaultPic;
}
