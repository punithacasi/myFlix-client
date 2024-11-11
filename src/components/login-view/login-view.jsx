import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ urlAPI, onLoggedIn }) => {
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
                console.log(data.user);
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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minlength="8"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minlength="8"
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
};