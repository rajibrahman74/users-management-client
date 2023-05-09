import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const newUser = [...users, data]
        setUsers(newUser)
        form.reset()
      });
  };

  return (
    <>
      <h3>Users Management system</h3>
      <h4>Number of user: {users.length}</h4>
      <form onSubmit={handleUserSubmit}>
        <input type="text" name="name" id="" placeholder="name" />
        <br />
        <input type="email" name="email" id="" placeholder="email" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user ? user.id : "id is not found"},{" "}
            {user ? user.name : "user name is not found"}, age:{" "}
            {user ? user.age : "user age is not found"}, weight:{" "}
            {user ? user.weight : "user weight is zerooo!!"}, email:{" "}
            {user ? user.email : "use email is not found"}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;