const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

async function postData(
  url = "", data = {}, 
  headers = {}
) {
  const finalHeader = { ...defaultHeaders, ...headers };
  const requestOptions = {
    method: 'POST', 
    headers: finalHeader,
    mode: "cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
  };

  Object.keys(data).length > 0 ? requestOptions.body = new URLSearchParams(data): requestOptions.body = ""
  
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

async function getData(url = "") {
  try {
    const token = await userLogin();

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


async function deleteData(url = "") {
  try {
    const token = await userLogin();

    const response = await fetch(url, {
      method: 'DELETE',
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

export async function userLogin() {
  try {
    const data = await postData(
      "http://localhost:8001/auth/login",
      {
        'username': 'llm',
        'password': 'llm'
      },
      {}
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createThread(name = "New Thread") {
  try {
    const token = await userLogin();

    const baseUrl = "http://localhost:8003/thread/create_chat_thread"

    const params = new URLSearchParams();
    params.append('name', name)

    const finalUrl = `${baseUrl}?${params.toString()}`

    return await postData(finalUrl, {},
      {
        'Authorization': 'Bearer ' + token.access_token
      }
    )
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}

export async function getChatThreads() {
  try {
    const response = await getData('http://localhost:8003/thread/list_chat_thread');
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteThread(threadID) {

  const baseUrl = "http://localhost:8003/thread/delete_chat_thread"
  const params = new URLSearchParams();
  params.append('thread_id', threadID.toString())
  const finalUrl = `${baseUrl}?${params.toString()}`

  try {
    const response = await deleteData(finalUrl);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getThreadMessages(threadID) {
  try {
    const token = await userLogin();

    const baseUrl = "http://localhost:8003/chat/get_chat_messages"
    const params = new URLSearchParams();
    params.append('thread_id', threadID.toString())
    const finalUrl = `${baseUrl}?${params.toString()}`

    return await postData(finalUrl, {},
      {
        'Authorization': 'Bearer ' + token.access_token
      }
    )
  } catch (error) {
    throw error;
  }
}

export async function createThreadMessages(threadID, userMessage) {
  try {
    const token = await userLogin();

    const baseUrl = "http://localhost:8003/chat/create_chat_message"
    const params = new URLSearchParams();
    params.append('thread_id', threadID.toString())
    params.append('user_message', userMessage.toString())
    const finalUrl = `${baseUrl}?${params.toString()}`

    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + token.access_token
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.text();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Propagate the error
  }
}