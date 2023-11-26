export async function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/users',
      {
        method:'POST',
        body: JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      })
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export async function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      const email = loginInfo.email
      const password = loginInfo.password
      const response = await fetch('http://localhost:8080/users?email='+email)
      const data = await response.json();
      if (data.length) {
        const storedPassword = data[0].password;
  
        // Compare without logging
        if (password === storedPassword) {
          resolve({ data: data[0] });
        } else {
          reject({ message: "Wrong credentials" });
        }
      } else {
        reject({ message: "User not found" });
      }
    });
  }
  
  export async function updateUser(update) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/users/'+update.id,
      {
        method:'PATCH',
        body: JSON.stringify(update),
        headers:{'content-type':'application/json'}
      })
      const data = await response.json();
      resolve({ data });
    });
  }
  