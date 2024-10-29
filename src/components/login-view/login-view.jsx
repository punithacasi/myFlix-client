import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    //const urlAPI = "http://localhost:8080";
    const urlAPI = "https://my-movie-api-8xod.onrender.com";
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password
        };
        console.log(data);

        fetch(urlAPI + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minlength="8"
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minlength="8"
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};