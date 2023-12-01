import { Container, Content } from "./styles";
import { useState } from 'react';

import { Input } from "../Input";
import { Button } from "../Button";

import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/pix.svg';
import cardImg from '../../assets/CreditCard.svg';
import qrCode from '../../assets/qrcode.svg';
import clock from '../../assets/clock.svg';
import checkCircle from '../../assets/CheckCircle.svg';
import knife from '../../assets/knife.svg';
import cart from '../../assets/cart.svg';

import { useCart } from '../../hooks/cart';
import { useAuth } from "../../hooks/auth";

export function PaymentCard() { 
    const { handleResetCart} = useCart();
    const { user } = useAuth()

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

    const handlePix = () => {
        setIsPixVisible(true);
        setIsCreditVisible(false);
        setIsCartVisible(false);
        setPixActive(true);
        setCreditActive(false);
    };
    
    const handleCredit = () => {
        setIsCreditVisible(true);
        setIsPixVisible(false);
        setIsCartVisible(false);
        setCreditActive(true);
        setPixActive(false);
    };

    const [disabledButton, setDisabledButton] = useState(false);
    const btn = document.getElementById('finishPaymentButton');
    const disableButton = () => {
        setDisabledButton(true);

        setIsCreditVisible(false);
        setIsPixVisible(false);
        
        setIsClockActive(true);
        setIsApprovedActive(false);
        setTimeout(() => {    
            setIsClockActive(false);
            setIsApprovedActive(true);
    
        }, 5000);
    }

    return(
        <Container>

            <div className="buttons">
            
                <button className={pixActive === true ? 'active' : ''} id="pix" disabled={disabledButton} onClick={handlePix}><img src={logoPix} alt="Logo Pix"/>PIX</button>
                
                <button className={creditActive === true ? 'active' : ''} id="credit" disabled={disabledButton} onClick={handleCredit}><img src={cardImg} alt="Credit Card Logo" />Credit</button>

            </div>
            
            <Content>

                {isCartVisible &&
                    <div className="cart" id="cart">
                        <img src={cart} alt="Shopping cart image" />
                        <p>Select a payment method above!</p>
                    </div>
                }

                {isPixVisible &&
                    <div className="paymentPix" id="paymentPix">
                        <div className="qr">
                            <img src={qrCode} alt="QRCode Image" />
                        </div>

                        <Button
                            title='Finalize payment'
                            id="finishPaymentButton"
                            icon={BsReceipt}
                            style={ { height: 56 } }
                            className="finishPaymentButton"
                            onClick={()=>{disableButton(); handleResetCart(user.id)}}
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
                                    placeholder="04/25"
                                    type="text"
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
                                title='Finalize payment'
                                icon={BsReceipt}
                                style={ { height: 56 } }
                                className="finishPaymentButton"
                                onClick={disableButton}
                        /> 
                    </div>
                }

                {isClockActive &&
                    <div className="clock" id="clock">
                        <div className="clk">
                            <img src={clock} alt="QRCode Image" />
                        </div>
                        <p>Please wait: We are processing your payment</p>
                    </div>
                }

                {isApprovedActive &&
                    <div className="approved" id="approved">
                        <img src={checkCircle} alt="Imagem de pagamento aprovado" />
                        <p>Yay! Payment accept! We will deliver soon!</p>
                    </div>
                }

                <div className="delivered hide" id="delivered">
                    <img src={knife} alt="Image of a knife and fork" />
                    <p>The order was delivered!</p>
                </div>
            
            </Content>

        </Container>
    )
}