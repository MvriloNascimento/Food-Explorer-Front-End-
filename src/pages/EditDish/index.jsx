import { Container, Content, Form, Image } from "./styles.js";

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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiCamera } from "react-icons/fi";

export function EditDish() {
    const navigate = useNavigate();
    
    const { user } = useAuth()
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");
    
    const [data, setData] = useState(null);
    
    const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`;
    const [image, setImage] = useState();
    const [imageFile, setImageFile] = useState(null)

    function handleChangeImage(event) {
        const file = event.target.files[0];
        setImageFile(file);

        const imagePreview = URL.createObjectURL(file);
        setImage(imagePreview);
    }

    function handleAddIngredient() {
        if (newIngredient.length < 3) {
            return alert("Error: You are trying to enter an invalid ingredient name!");
        } else {
            setIngredients(prevState => [...prevState, newIngredient]);
            setNewIngredient("");
        }
    }

    function handleRemoveIngredient(deleted){
        setIngredients(prevState => prevState.filter(ingredient => ingredient !== deleted));
    }

    async function handleUpdateDish() {
        if (!image) {
            return alert("Error: You did not upload the new dish image!");
        }
        
        if (!title) {
            return alert("Error: You didn't enter the name of the dish!");
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
            return alert("Error: You did not inform the price of the dish!");
        }

        if (!description) {
            return alert("Error: You did not provide a description for the dish!");
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        
        ingredients.map(ingredient => (
            formData.append("ingredients", ingredient)
        ))

        await api
            .put(`/dishes/${params.id}`, formData)
            .then(alert("Dish updated successfully!"), navigate("/"))
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Error updating dish!");
                }
            });  
        
        setLoading(false);
    }

    useEffect(() => {
        async function fetchDish() {
            const response = await api.get(`/dishes/${params.id}`);
            setData(response.data);
            
            const { title, description, category, price, ingredients } = response.data;
            setTitle(title);
            setDescription(description);
            setCategory(category);
            setPrice(price);
            setIngredients(ingredients.map(ingredient => ingredient.name));
        }
    
        fetchDish();
    }, [])

    async function handleRemoveDish() {
        setLoadingDelete(true);
        const isConfirm = confirm("Are you sure you want to remove this item?");
    
        if(isConfirm) {
            await api.delete(`/dishes/${params.id}`)
            .then(() => {
                alert("Item removed successfully!");
                navigate("/");
                setLoadingDelete(false);
            })
        } else {
            return
        }
    }
      
    return(
        <ThemeProvider theme={darkTheme}>
            <GlobalStyles />
                <Container>
                    <Header />

                    {
                        user.isAdmin ?

                            <Content>

                            {
                                data &&

                                <Form>
                                    <header>
                                        <Link to="/">
                                            <ButtonText title="Voltar" icon={RiArrowLeftSLine}/>
                                        </Link>
                                        <h1>Edit dish</h1>
                                    </header>

                                    <div className="details">
                                        <div className="dishImage">
                                            <p>Image of the Dish</p>

                                            <Image>
                                                <img 
                                                    src={image ? image : imageURL} 
                                                    alt="Photo of the dish" 
                                                />

                                                <label htmlFor="image">
                                                    <FiCamera />

                                                    <input
                                                        id="image"
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={handleChangeImage}
                                                    />
                                                </label>
                                            </Image>
                                        </div>

                                        <div className="dishDetails">
                                            <div className="dishName">
                                                <div className="dish">
                                                    <p>Name of the dish</p>
                                                    <Input
                                                        placeholder="Ex.: Caesar salad"
                                                        type="text"
                                                        value={title}
                                                        onChange={e => setTitle(e.target.value)}
                                                    />
                                                </div>

                                                <div className="dishCategory">
                                                    <p>Category</p>

                                                    <select value={category} onChange={e => setCategory(e.target.value)}>
                                                        <option value="default" disabled>Select the category</option>
                                                        <option value="dishes">Dishes</option>
                                                        <option value="drinks">Drinks</option>
                                                        <option value="dessert">Desserts</option>
                                                    </select> 
                                                </div>
                                            </div>

                                            <div className="dishIngredients">
                                                <div className="ingredientsTag">
                                                    <div>
                                                        <p>Ingredients</p>
                                                        <div className="ingredients">
                                                            {
                                                                ingredients.map((ingredient, index) => (
                                                                    <IngredientsTag 
                                                                        key={String(index)} 
                                                                        value={ingredient} 
                                                                        onClick={() => handleRemoveIngredient(ingredient) }
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
                                                </div>

                                                <div className="price">
                                                    <p>Preço</p>
                                                    <Input
                                                        placeholder="R$ 00,00"
                                                        type="number"
                                                        value={price} 
                                                        onChange={e => setPrice(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="textarea">
                                        <p>Descrição</p>
                                        <Textarea 
                                            placeholder="Briefly talk about the dish, its ingredients and composition"
                                            defaultValue={description} 
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </div>

                                </Form>
                                }

                            <div className="button">
                                <Button 
                                    className="deleteButton"
                                    title={loadingDelete ? "Deleting dish" : "Delete dish"}
                                    onClick={handleRemoveDish}
                                    disabled={loadingDelete} 
                                />
                                <Button 
                                    title={loading ? "Saving changes" : "Save changes"}
                                    onClick={handleUpdateDish}
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