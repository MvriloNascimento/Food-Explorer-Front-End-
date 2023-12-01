import { Container } from "./styles";

import { ButtonText } from "../ButtonText";

import { useCart } from '../../hooks/cart';

export function OrderCard({data}) { 
    const { handleRemoveDishFromCart, paymentAccept } = useCart();

    return(
        <Container>
            <div className="card">

                <img src={data.image} alt="Image of the Dish" />
                
                <div>
                    <p><strong>{data.quantity} x </strong>{data.title} <span>R${data.price}</span></p>
                    <ButtonText 
                        title="Delete"
                        onClick={() => handleRemoveDishFromCart(data.id)}
                    />
                </div>
                
            </div>
        </Container>
    )
}