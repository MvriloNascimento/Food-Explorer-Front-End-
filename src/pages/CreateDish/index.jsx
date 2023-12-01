import { Container, Content, Form } from "./styles.js";

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../styles/global'
import darkTheme from '../../styles/darkTheme';

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { IngredientsTag } from "../../components/IngredientsTag";
import { Textarea } from "../../components/Textarea";
import { PageError } from "../../components/PageError";

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiUpload } from "react-icons/fi";

export function CreateDish() {

    const { user } = useAuth()

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            return alert("Error: You are trying to enter an invalid ingredient name!");
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted) {
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    async function handleNewDish() {
        if (!image) {
            return alert("Error: You did not insert an image for the dish!");
        }

        if (!title) {
            return alert("Error: You did not enter the name of the dish!");
        }

        if (ingredients.length < 1) {
            return alert("Error: Add at least one ingredient!")
        }

        if (newIngredient) {
            return alert("Error: You left an ingredient in the field to add, but did not click add. Click the + sign to add!");
        }

        if (!category) {
            return alert("Error: You did not select the dish category!");
        }

        if (!price) {
            return alert("Error: You did not enter the price of the dish!");
        }

        if (!description) {
            return alert("Error: You did not provide a description for the dish!");
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);

        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))

        await api
            .post("/dishes", formData)
            .then(alert("Dish added successfully!"), navigate("/"))
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Error creating dish!");
                }
            });

        setLoading(false);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
            <Container>
                <Header />

                {
                    user.isAdmin ?

                        <Content>

                            <Form>
                                <header>
                                    <Link to="/">
                                        <ButtonText title="Back" icon={RiArrowLeftSLine} />
                                    </Link>
                                    <h1>Create dish</h1>
                                </header>

                                <div className="details">
                                    <div className="dishImage">
                                        <p>Image of the Dish</p>
                                        <label htmlFor="image">
                                            <FiUpload size={24} />
                                            Select image
                                        </label>
                                        <Input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={e => setImage(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="dish">
                                        <p>Name of the dish</p>
                                        <Input
                                            placeholder="Ex.: Caesar salad"
                                            type="text"
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="ingredientsTag">
                                    <div>
                                        <p>Ingredientes</p>
                                        <div className="ingredients">
                                            {
                                                ingredients.map((ingredient, index) => (
                                                    <IngredientsTag
                                                        key={String(index)}
                                                        value={ingredient}
                                                        onClick={() => handleRemoveIngredient(ingredient)}

                                                    />
                                                ))
                                            }

                                            <IngredientsTag
                                                isNew
                                                placeholder="Add"
                                                onChange={e => setNewIngredient(e.target.value)}
                                                value={newIngredient}
                                                onClick={handleAddIngredient}
                                            />
                                        </div>
                                    </div>

                                    <div className="dishCategory">
                                        <p>Category</p>

                                        <select defaultValue={'default'} onChange={e => setCategory(e.target.value)}>
                                            <option value="default" disabled>Select the category</option>
                                            <option value="dishes">Dishes</option>
                                            <option value="drinks">Drinks</option>
                                            <option value="dessert">Desserts</option>
                                        </select>
                                    </div>

                                    <div className="price">
                                        <p>Price</p>
                                        <Input
                                            placeholder="R$ 00,00"
                                            type="number"
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="textarea">
                                    <p>Descrição</p>
                                    <Textarea
                                        placeholder="Briefly talk about the dish, its ingredients and composition"
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>

                            </Form>

                            <div className="button">
                                <Button
                                    title={loading ? "Saving changes" : "Save editions"}
                                    onClick={handleNewDish}
                                    disabled={loading}
                                />
                            </div>

                        </Content>

                        :

                        <PageError />
                }

                <Footer />
            </Container>
        </ThemeProvider>
    );
}