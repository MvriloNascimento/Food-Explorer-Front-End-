import { Container, Form, Logo } from "./styles";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/darkTheme';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn, loading } = useAuth();

    function handleSignIn() {
        signIn({ email, password });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Container>

                <Logo>
                    <div className="logo">
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C" />
                        </svg>
                        <h1>food explorer</h1>
                    </div>
                </Logo>

                <Form>
                    <h2>Log in</h2>

                    <div className="inputs">
                        <p>Email</p>
                        <Input
                            placeholder="Example: exemplo@exemplo.com.br"
                            type="text"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="inputs">
                        <p>Password</p>
                        <Input
                            placeholder="minimum 6 characters"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        title={loading ? "Entering" : "Enter"}
                        onClick={handleSignIn}
                        disabled={loading}
                    />

                    <Link to="/register">
                        Create an account
                    </Link>

                </Form>
            </Container>
        </ThemeProvider>
    );
}
