import { Container } from "./styles";

import { FiPlus, FiX } from "react-icons/fi";

export function IngredientsTag({ isNew, value, onClick, ...rest }) {
    return (
        <Container isNew={isNew}>
            <input
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
                list="ingredientName"
            />

            <datalist id="ingredientName">
                <option value="Brandy">Brandy</option>
                <option value="Lettuce">Lettuce</option>
                <option value="Plum">Plum</option>
                <option value="Almonds">Almonds</option>
                <option value="Aniz">Aniz</option>
                <option value="Asparagus">Asparagus</option>
                <option value="Potato">Potato</option>
                <option value="Bacon">Bacon</option>
                <option value="Coffee">Coffee</option>
                <option value="Shrimp">Shrimp</option>
                <option value="Cinnamon">Cinnamon</option>
                <option value="Onion">Onion</option>
                <option value="Glair">Glair</option>
                <option value="Coke">Coke</option>
                <option value="Damascus">Damascus</option>
                <option value="Flour">Flour</option>
                <option value="Filet">Filet</option>
                <option value="Lemon">Lemon</option>
                <option value="Apple">Apple</option>
                <option value="Basil">Basil</option>
                <option value="Passion fruit">Passion fruit</option>
                <option value="Pasta">Pasta</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Negroni">Negroni</option>
                <option value="Naan Bread">Naan Bread</option>
                <option value="Bread">Bread</option>
                <option value="Cucumber">Cucumber</option>
                <option value="Peach">Peach</option>
                <option value="Pesto">Pesto</option>
                <option value="Ham">Ham</option>
                <option value="Cheese">Cheese</option>
                <option value="Radish">Radish</option>
                <option value="Arugula">Arugula</option>
                <option value="Ice Cream">Ice Cream</option>
                <option value="Tomato">Tomato</option>
                <option value="Whiskey">Whiskey</option>
            </datalist>

            <button
                type="button"
                onClick={onClick}
                className={isNew ? "button-add" : "button-delete"}
            >
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    );
}
