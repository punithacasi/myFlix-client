import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";


const UpdateUser = ({ urlAPI, user, token }) => {

    const [userData, setUser] = useState(user);
    console.log(userData.userName);

    const [username, setUsername] = useState(user.userName);
    const [password, setPassword] = useState(null);
    const [firstname, setFirstname] = useState(user.firstName);
    const [lastname, setLastname] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(new Date(user.birthDate).toISOString().split('T')[0]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            userName: username ? username : user.userName,
            password: password,
            email: email,
            firstName: firstname,
            lastName: lastname,
            birthDate: birthday
        };

        console.log(data);

        console.log(user.userName);

        fetch(urlAPI + "/users/" + user.userName, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                alert("Profile udpate successful");
                response.json().then((updatedUser) => {
                    //localStorage.setItem("user", JSON.stringify(updatedUser));
                    window.location.reload();  // Optionally reload the page
                });
            } else {
                alert("Profile udpate failed");
            }
        });
    };

    return (
        <>
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
                <Row>
                    <Col><Button variant="primary" type="submit">Update Profile</Button></Col>
                    <Col><Button variant="secondary" type="button" onClick={() => {
                        fetch(urlAPI + "/users/" + user.userName, {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            if (response.ok) {
                                alert("Profile deleted successful");
                                localStorage.clear();
                                window.location.reload();  // Optionally reload the page
                            } else {
                                alert("Profile udpate failed");
                            }
                        });
                    }}>Detele Account</Button></Col>
                </Row>
            </Form>
        </>
    );
};

export default UpdateUser;

