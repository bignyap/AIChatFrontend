async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'username': data.username,
        'password': data.password,
      }),
      mode: "cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
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

export async function userLogin() {
  try {
    const data = await postData(
      "http://localhost:8001/auth/login",
      {
        username: 'llm',
        password: 'llm'
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}


async function getData(url = "") {
  try {
    const token = await userLogin();
    console.log(token);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      }
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



export async function getChatThreads() {
  try {
    const response = await getData('http://localhost:8003/thread/list_chat_thread?dictionary=false');
    return response;
  } catch (error) {
    throw error;
  }
}