import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

        fetch(urlAPI + "/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.replace("/")
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>
                Username:
            </Form.Label>
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
            />
            <Form.Label>
                Password:
            </Form.Label>
            <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Form.Label>
                First Name:
            </Form.Label>
            <Form.Control
                type="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
            />
            <Form.Label>
                Last Name:
            </Form.Label>
            <Form.Control
                type="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
            />
            <Form.Label>
                Email:
            </Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Form.Label>
                Birthday:
            </Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
            />
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};