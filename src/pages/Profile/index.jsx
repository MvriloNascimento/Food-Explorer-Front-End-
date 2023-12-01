import { Container, Content, Form, Avatar, Infos, Logo } from './styles';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/darkTheme';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useState } from 'react';
import { Link } from "react-router-dom";

import { FiUser, FiMail, FiLock, FiCamera, FiShoppingBag, FiPlus } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import logo from '../../assets/logo.svg';

export function Profile() {

    const { user, updateProfile, loading } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Container>
                <Header />
                <Content>

                    <div className='card'>
                        <Form>
                            <Avatar>
                                <img
                                    src={avatar}
                                    alt="User photo"
                                />

                                <label htmlFor="avatar">
                                    <FiCamera />

                                    <input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChangeAvatar}
                                    />
                                </label>
                            </Avatar>

                            <div className='inputs'>
                                <label>
                                    <FiUser size={20} />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </label>

                                <label>
                                    <FiMail size={20} />
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </label>

                                <label>
                                    <FiLock size={20} />
                                    <input
                                        type="password"
                                        placeholder="Current password"
                                        onChange={e => setPasswordOld(e.target.value)}
                                    />
                                </label>

                                <label>
                                    <FiLock size={20} />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        onChange={e => setPasswordNew(e.target.value)}
                                    />
                                </label>
                            </div>

                            <Button
                                title={loading ? "Saving" : "Save"}
                                onClick={handleUpdate}
                                disabled={loading}
                            />
                        </Form>

                        {
                            user.isAdmin ?

                                <Infos>
                                    <Logo>
                                        <div className="logo">
                                            <img src={logo} alt="" />
                                        </div>
                                    </Logo>

                                    <p>Hello <span>{name}</span>, access the desired option:</p>

                                    <Link to="/orders">
                                        <Button
                                            title="View orders"
                                            icon={FiShoppingBag}
                                        />
                                    </Link>

                                    <Link to="/createdish">
                                        <Button
                                            title="Create new Dish"
                                            icon={FiPlus}
                                        />
                                    </Link>
                                </Infos>

                                :

                                <Infos>
                                    <Logo>
                                        <div className="logo">
                                            <img src={logo} alt="" />
                                        </div>
                                    </Logo>

                                    <p>Hello <span>{name}</span>, access the desired option:</p>

                                    <Link to="/orders">
                                        <Button
                                            title="My requests"
                                            icon={FiShoppingBag}
                                        />
                                    </Link>

                                    <Button
                                        title="Contact by email"
                                        icon={FiMail}
                                        onClick={() => window.location = 'mailto:contato@foodexplorer.com'}
                                    />

                                    <Button
                                        title="WhatsApp"
                                        icon={BsWhatsapp}
                                        onClick={() => window.open("https://api.whatsapp.com/send?phone=+777777777777&text=Hi FoodExplorer folks! I would like to tell you about my order!", '_blank')}
                                    />
                                </Infos>
                        }
                    </div>
                </Content>
                <Footer />
            </Container>
        </ThemeProvider>
    );
}