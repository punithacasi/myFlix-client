import React, { useState } from "react";

export const SignupView = () => {
    //const urlAPI = "http://localhost:8080";
    const urlAPI = "https://my-movie-api-8xod.onrender.com";
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            userName: username,
            password: password,
            email: email,
            firstName: firstname,
            lastName: lastname,
            birthDate: birthday
        };
        console.log(data);

        fetch(urlAPI + "/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
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
                    required
                    minLength="3"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                First Name:
                <input
                    type="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    type="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};