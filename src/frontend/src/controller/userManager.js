import axios from "axios";
import { axiosConfig, check, config } from "./common";

export let lastUrl = null;

export function setLastUrl(url) {
  lastUrl = url;
}

/**
 * Check if the username is used.
 */
export async function checkUsername(username) {
  const urlStr = config.server + "/api/check/username/" + username;
  return await axios.get(urlStr, axiosConfig);
}

/**
 * Check if the user is registered by email.
 */
export async function checkEmail(email) {
  const urlStr = config.server + "/api/check/email/" + email;
  return await axios.get(urlStr, axiosConfig);
}

/**
 * Get all groups from database.
 */
export async function getAllGroups() {
  const urlStr = config.server + "/api/v2/groups";
  const result = await axios.get(urlStr);
  return result.data.groups;
}

export async function getAllOrganizations(groupNumber) {
  let urlStr = config.server + "/api/v2/organizations?mode=simplified";
  if (groupNumber) {
    urlStr += "&groupNumber=" + groupNumber;
  }
  try {
    const result = await axios.get(urlStr);
    return result.data.organizations;
  } catch (e) {
    throw e;
  }
}

export async function getAllRequestUsers() {
  let results = [];
  try {
    const users = await getAllUsers();
    results = users.filter((u) => u.validated === false);
  } catch (e) {
    throw e;
  }
  return results;
}

export async function switchUserActive(username, activeValue) {
  try {
    return await axios.put(
      config.server + "/api/users/active/" + username,
      { active: activeValue },
      axiosConfig
    );
  } catch (e) {
    return e;
  }
}

export async function switchUserValidate(user, validatedValue) {
  // change the status of validate
  try {
    let result = [];
    const url = config.server + "/api/users/validated/" + user.username;
    console.log(url);
    const resValidated = await axios.put(
      url,
      { validated: validatedValue },
      axiosConfig
    );
    result.push(resValidated);
    // add this user to the organization when validate is ture
    // subtract this user from the organization when validate is false
    if (user.organization) {
      const resOrganization = await axios.post(
        config.server +
          "/api/v2/organizations/" +
          user.organization +
          "/users/" +
          user._id,
        { validated: validatedValue },
        axiosConfig
      );
      result.push(resOrganization);
      return result;
    }
  } catch (e) {
    return e;
  }
}

/**
 * Check if the user is logged in, result will go to call back function.
 * Available to use right after the web page refreshes, to check if there is a user logged in.
 */
export async function isLoggedIn() {
  return (await axios.get(config.server + "/api/isloggedin", axiosConfig)).data
    .isLoggedIn;
}

export async function logout() {
  localStorage.removeItem("user");
  //   await axios.get(config.server + "/api/logout", axiosConfig);
  window.location.hash = "login";
}

/**
 *
 * @param username
 * @param password
 * @return {AxiosPromise<any>}
 */
export async function loginLocal(username, password) {
  try {
    const response = await axios.post(
      config.server + "/api/login/local",
      {
        username: username,
        password: password,
      },
      axiosConfig
    );
    console.log("Inside loginLocal method");
    console.log(response.data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function signUpLocal(
  setup,
  username,
  password,
  firstName,
  lastName,
  selectedOrganization,
  email,
  phoneNumber,
  selectedGroupNumber
) {
  const response = await axios.post(
    config.server + (setup ? "/api/setup" : "/api/signup/local"),
    {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      groupNumber: selectedGroupNumber,
      organization: selectedOrganization,
    },
    axiosConfig
  );

  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export async function sendPasswordResetEmail(email) {}

export async function updatePermission(username, permissions, active) {
  // console.log(username, permissions, active);
  const response = await axios.post(
    config.server + "/api/user/permission",
    {
      permissions: [
        {
          username,
          permissions,
          active,
        },
      ],
    },
    axiosConfig
  );
  if (check(response)) return response;
}

export async function getAllPermissions() {
  const response = await axios.get(
    config.server + "/api/permissions",
    axiosConfig
  );
  if (check(response)) return response.data.permissions;
}

export async function getAllUsers() {
  const response = await axios.get(
    config.server + "/api/user/details",
    axiosConfig
  );
  if (check(response)) return response.data.users;
}

export async function getProfile() {
  try {
    const response = await axios.get(
      config.server + "/api/profile",
      axiosConfig
    );
    if (check(response)) return response.data.profile;
  } catch (err) {
    console.log(err);
  }
}
