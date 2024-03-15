import UserService from '../services/UserService';
import api_paths from './paths';

import config from "../config"

function getChatServicePaths (pathName) {
  return config.chatServiceUrl + api_paths["chatService"][pathName]
}

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

async function headerWithToken(headers = {}, includeDefaultHeader = true) {
  const loggedIn = await UserService.isLoggedIn()
  // Check if user is logged in and add token to headers if available
  if (loggedIn) {
    const token = UserService.getToken();
    if (includeDefaultHeader) {
      return { ...defaultHeaders, ...headers, 'Authorization': `Bearer ${token}` };
    } else {
      return { ...headers, 'Authorization': `Bearer ${token}` };
    }
  } else {
    await UserService._kc.login();
  }
}


async function postData(
  url, data = {}, headers = {}, 
  includeDefaultHeader = true
) {
  const reqHeaders = await headerWithToken(headers, includeDefaultHeader);
  const requestOptions = {
    method: 'POST',
    headers: reqHeaders,
    mode: "cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    body: new URLSearchParams(data) // Always use URLSearchParams for form data
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}


async function getData(url, headers = {}, includeDefaultHeader = true) {
  try {
    const reqHeaders = await headerWithToken(headers, includeDefaultHeader);
    const response = await fetch(url, {
      method: 'GET',
      headers: reqHeaders
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}


async function deleteData(url, headers = {}, includeDefaultHeader = true) {
  try {
    const reqHeaders = await headerWithToken(headers, includeDefaultHeader);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: reqHeaders
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}

export async function createThread(name = "New Thread") {
  try {
    const url = getChatServicePaths("createThread");
    const data = { name: name }; // Form data
    return await postData(url, data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}

export async function getChatThreads() {
  try {
    const url = getChatServicePaths("listThreads")
    const response = await getData(url);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteThread(threadID) {
  try {
    const url = getChatServicePaths("deleteThread");
    const finalUrl = `${url}/${threadID.toString()}`;
    const response = await deleteData(finalUrl);
    return response;
  } catch (error) {
    console.error('There was a problem with the delete operation:', error);
    throw error; // Propagate the error
  }
}

export async function getThreadMessages(threadID) {
  try {
    const url = getChatServicePaths("getMessages");
    const finalUrl = `${url}/${threadID.toString()}`;
    return await getData(finalUrl);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}


export async function createThreadMessages(threadID, userMessage, onDataReceived) {
  try {
    const url = getChatServicePaths("createMessage");
    const finalUrl = `${url}/${threadID.toString()}`;
    const data = { user_message: userMessage.toString() };
    const reqHeaders = await headerWithToken({}, true);
    const requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      mode: "cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
      body: new URLSearchParams(data) // Always use URLSearchParams for form data
    };

    const response = await fetch(finalUrl, requestOptions);

    const reader = response.body.getReader();
    let decoder = new TextDecoder();
    let iter = 1;
    let finalResponse = {
      "message": "",
      "firstByte": true
    }

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }
      
      finalResponse = {
        "message": finalResponse.message + decoder.decode(value),
        "firstByte": (iter === 1)
      };
      iter = iter + 1;
      onDataReceived(finalResponse); // Pass received data to the callback function
    }


  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}

