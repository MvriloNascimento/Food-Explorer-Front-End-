import { Container, Content, PaymentCard } from "./styles.js";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/darkTheme';

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { OrderCard } from "../../components/OrderCard";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PageError } from "../../components/PageError";

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useCart } from '../../hooks/cart';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/pix.svg';
import cardImg from '../../assets/CreditCard.svg';
import qrCode from '../../assets/qrcode.svg';
import cartImg from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import checkCircle from '../../assets/CheckCircle.svg';

export function Cart() {

    const { user } = useAuth()

    const { cart, total, handleResetCart} = useCart();

    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    function handleCreatedCart(cart) {
        return {
          orderStatus: '🔴 Pendente',
          paymentMethod: pixActive ? 'pix': 'creditCard',
          totalPrice: total,
          cart: cart.map(item => (
            {
              id: item.id,
              title: item.title,
              quantity: item.quantity
            }
          ))
        }
    }

    async function handleFinishPayment(cart) {
            
        const newCart = handleCreatedCart(cart)

        if (cart.length < 1) {
            navigate(-1);
            return alert("Oops! Your shopping cart is empty. Add something before trying to pay.");
        }

        if (!pixActive && num.length < 16) {
            alert("Error: Incomplete card number!");
            return;
        }

        if (!pixActive && date.length < 4) {
            return alert("Error: Card validity incomplete!");
        }

        if (!pixActive && cvc.length < 3) {
            return alert("Error: Incomplete card CVC!");
        }

        setLoading(true);

        await api.post("/orders", newCart)
            .then(() => {
                disableButton();
                setTimeout(() => {    
                    // Elements that will be changed
                    alert("Order registered successfully!");
                    navigate(-1);
                    handleResetCart();

                    // Delay
                }, 7000);
            })
            .catch(error => {
                if(error.response){
                    alert(error.response.data.message);
                } else {
                    alert("Unable to register");
                }
            });

        setLoading(false);
    }

    const [num, setNum] = useState('');
    const [cvc, setCvc] = useState('');

    const handleNumChange = event => {
        const limit = 16;
        setNum(event.target.value.slice(0, limit));
    };

    const handleCvcChange = event => {
        const limit = 3;
        setCvc(event.target.value.slice(0, limit));
    };

    const [isPixVisible, setIsPixVisible] = useState(false);
    const [isCreditVisible, setIsCreditVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [pixActive, setPixActive] = useState(false);
    const [creditActive, setCreditActive] = useState(false);
    const [isClockActive, setIsClockActive] = useState(false);
    const [isApprovedActive, setIsApprovedActive] = useState(false);

    const handlePaymentPix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setIsCartVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };

    const handlePaymentCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setIsCartVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };

    const [disabledButton, setDisabledButton] = useState(false);

    const disableButton = () => {
        setDisabledButton(true);

        setIsCreditVisible(false);
        setIsPixVisible(false);
        
        setIsClockActive(true);
        setIsApprovedActive(false);
        setTimeout(() => {    
            setIsClockActive(false);
            setIsApprovedActive(true);
        }, 4000);
    }
    
    return(
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
                <Container>
                    <Header />

                        {
                            user.isAdmin ?

                            <PageError />

                        :

                            <Content>

                                <div className="card-wrapper">
                                
                                    <div className="order-wrapper">
                                        <h2>My request</h2>
                                        <div className="details">
                                            {
                                                cart && 
                                                    cart.map(item => (
                                                        <OrderCard 
                                                            key={String(item.id)} 
                                                            data={item}
                                                        />
                                                    ))
                                            }
                                        </div>

                                        <div className="total">
                                            <p>Total: R$<span>{total}</span></p>
                                        </div>
                                    </div>
                                
                                    <PaymentCard>
                                        <div className="paymentHeader">
                                            <h2>Payment</h2>
                                        
                                            <div className="buttons">
                                                <button className={pixActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentPix}>
                                                    <img src={logoPix} alt="Logo Pix"/>
                                                    PIX
                                                </button>
                                                
                                                <button className={creditActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentCredit}>
                                                    <img src={cardImg} alt="Credit Card Logo"/>
                                                    Credit
                                                </button>
                                            </div>
                                        </div>

                                        <div className="paymentBody">

                                            {isCartVisible &&
                                                <div className="cart" id="cart">
                                                    <img src={cartImg} alt="Shopping cart image" />
                                                    <p>Select a payment method above!</p>
                                                </div>
                                            }

                                            {isPixVisible &&
                                                <div className={pixActive === false ? 'active' : ''} id="paymentPix">
                                                    <div className="qr">
                                                        <img src={qrCode} alt="QRCode Image" />
                                                    </div>

                                                    <Button
                                                        title={loading ? "Finalizing payment" : "Finalize payment"}
                                                        disabled={loading}
                                                        icon={BsReceipt}
                                                        style={ { height: 56 } }
                                                        className="finishPaymentButton"
                                                        onClick={()=>{handleFinishPayment(cart)}}
                                                    /> 
                                                </div>
                                            }

                                            {isCreditVisible &&

                                                <div className="paymentCredit" id="paymentCredit">
                                                    <div className="inputs">
                                                        <p>Card number</p>
                                                        <Input
                                                            placeholder="0000 0000 0000 0000"
                                                            type="number"
                                                            id="num"
                                                            name="num"
                                                            value={num}
                                                            onChange={handleNumChange}
                                                        />
                                                    </div>

                                                    <div className="validTo">
                                                        <div>
                                                            <p>Validity</p>
                                                            <Input
                                                                placeholder="MM/AA"
                                                                type="text"
                                                                id="date"
                                                                name="date"
                                                                maxLength="5"
                                                            />
                                                        </div>

                                                        <div>
                                                            <p>CVC</p>
                                                            <Input
                                                                placeholder="***"
                                                                type="number"
                                                                id="cvc"
                                                                name="cvc"
                                                                value={cvc}
                                                                onChange={handleCvcChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <Button
                                                            title={loading ? "Finalizing payment" : "Finalize payment"}
                                                            disabled={loading}
                                                            icon={BsReceipt}
                                                            style={ { height: 56 } }
                                                            className="finishPaymentButton"
                                                            onClick={()=>{handleFinishPayment(cart)}}
                                                    /> 
                                                </div>
                                            }

                                            {isClockActive &&

                                                <div className="clock" id="clock">
                                                    <img src={clock} alt="QRCode Image" />
                                                    <p>Please wait: We are processing your payment</p>
                                                </div>
                                            }

                                            {isApprovedActive &&

                                                <div className="approved" id="approved">
                                                    <img src={checkCircle} alt="Approved payment image" />
                                                    <p>Yay! Payment accept! We will be delivering soon!</p>
                                                </div>
                                            }
                                        </div>
                                    </PaymentCard>
                                </div>
                            </Content>
                        }
                    <Footer />
                </Container>
    </ThemeProvider>
  );
}