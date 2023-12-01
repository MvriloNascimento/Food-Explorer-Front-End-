import { Container, Form, Logo } from "./styles";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/darkTheme';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { api } from "../../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    function handleSignUp(){
        if (!name || !email || !password) {
            return alert("Fill in all fields!");
        }

        setLoading(true);

        api.post("/users", { name, email, password })
            .then(() => {
                alert("User registered successfully!");
                navigate(-1);
                setLoading(false);
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Unable to register");
                }

                setLoading(false)
            });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
                <Container>
                    
                    <Logo>
                        <div className="logo">
                            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C"/>
                            </svg>
                            <h1>food explorer</h1>
                        </div>
                    </Logo>
                    
                    <Form>
                        <h2>Create your account</h2>

                        <div className="inputs">
                            <p>Your name</p>
                            <Input
                                placeholder="Example: Jordan Terrell Carter"
                                type="text"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="inputs">
                            <p>Email</p>
                            <Input
                                placeholder="Example: example@exemplo.com.br"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="inputs">
                            <p>Senha</p>
                            <Input
                                placeholder="Minimum 6 characters"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <Button 
                            title={loading ? "Registering" : "Create account"}
                            onClick={handleSignUp} 
                            disabled={loading}
                        />

                        <Link onClick={handleBack}>
                             I already have an account
                        </Link>

                    </Form>
                </Container>
        </ThemeProvider>
    );
}
