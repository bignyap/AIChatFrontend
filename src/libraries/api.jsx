async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }


export async function login () {
    postData(
        "http://localhost:8001/auth/login", 
        { 
            username: 'llm', 
            password: 'llm' 
        }
    ).then((data) => {
        console.log(data);
    });
}
  
  
  