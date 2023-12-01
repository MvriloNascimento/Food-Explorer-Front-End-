import { Container, Content, Logo, Search, Button, ButtonMenu, Profile } from "./styles";
import { useAuth } from '../../hooks/auth';

import { Link } from "react-router-dom";

import { FiSearch, FiUser, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { BsReceipt } from 'react-icons/bs';

import logo from '../../assets/logo.svg';

import { useCart } from '../../hooks/cart';

export function Header({ search, favoritesFilter }) {
    const { user } = useAuth()
    const { signOut } = useAuth();

    const { cart, orders } = useCart();

    function mobileMenu() {
        document.getElementById('hamburger').classList.toggle('active')
        document.getElementById('nav-menu').classList.toggle('active')
    }

    function userMenu() {
        document.getElementById('user-menu').classList.toggle('active')
    }

    return (
        <Container>
            <Content>
                <Logo>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                            <h1>food explorer</h1>
                        </Link>
                    </div>
                </Logo>
                <div className="hamburger" id="hamburger" onClick={mobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className="nav-menu" id="nav-menu">

                    <Search>
                        <label>
                            <FiSearch size={24} />
                            <input
                                type="text"
                                placeholder="Search for dish options"
                                onChange={(e) => { search(e.target.value) }}
                            />
                        </label>
                    </Search>


                    {
                        user.isAdmin ?

                            <Link to="/orders">
                                <Button
                                    type='button'
                                >
                                    <BsReceipt size={24} />
                                    View orders <span>({orders.length})</span>
                                </Button>
                            </Link>

                            :

                            <Link to="/cart">
                                <Button
                                    type='button'
                                >
                                    <BsReceipt size={24} />
                                    Cart <span>({cart.length})</span>
                                </Button>
                            </Link>
                    }

                    {
                        user.isAdmin ?

                            <Profile onClick={userMenu}>
                                <FiUser />
                                <div className="user-menu" id="user-menu">
                                    <Link to="/profile">
                                        <ButtonMenu>
                                            <FiShoppingBag size={24} />
                                            Profile
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/orders">
                                        <ButtonMenu onClick={favoritesFilter}>
                                            <FiHeart size={24} />
                                            View orders
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/createdish">
                                        <ButtonMenu>
                                            <FiUser size={24} />
                                            New Dish
                                        </ButtonMenu>
                                    </Link>
                                    <Link to="/" onClick={signOut}>
                                        <ButtonMenu>
                                            <FiUser size={24} />
                                            Leave
                                        </ButtonMenu>
                                    </Link>
                                </div>
                            </Profile>


                            :

                            <Profile onClick={userMenu}>
                                <FiUser />
                                <div className="user-menu" id="user-menu">
                                    <Link to="/orders">
                                        <ButtonMenu>
                                            <FiShoppingBag size={24} />
                                            My requests
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/">
                                        <ButtonMenu onClick={favoritesFilter}>
                                            <FiHeart size={24} />
                                            My favorites
                                        </ButtonMenu>
                                    </Link>

                                    <Link to="/profile">
                                        <ButtonMenu>
                                            <FiUser size={24} />
                                            My profile
                                        </ButtonMenu>
                                    </Link>
                                    <Link to="/" onClick={signOut}>
                                        <ButtonMenu>
                                            <FiUser size={24} />
                                            Leave
                                        </ButtonMenu>
                                    </Link>
                                </div>
                            </Profile>
                    }
                </div>

            </Content>
        </Container>
    );
}
