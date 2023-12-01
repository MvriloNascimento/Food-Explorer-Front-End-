import { Container } from "./styles";

import imagePlaceholder from '../../assets/image-not-found-icon.svg';

import brandy from '../../assets/brandy.png'
import lettuce from '../../assets/lettuce.png'
import plum from '../../assets/plum.png'
import almonds from '../../assets/almonds.png'
import aniz from '../../assets/aniz.png'
import asparagus from '../../assets/asparagus.png'
import bacon from '../../assets/bacon.png'
import potato from '../../assets/potato.png'
import coffee from '../../assets/coffee.png'
import shrimp from '../../assets/shrimp.png'
import cinnamon from '../../assets/cinnamon.png'
import onion from '../../assets//onion.png'
import glair from '../../assets/glair.png'
import coke from '../../assets/coke.png'
import damascus from '../../assets/damascus.png'
import flour from '../../assets/flour.png'
import filet from '../../assets/filet.png'
import lemon from '../../assets/lemon.png'
import apple from '../../assets/Apple.png'
import basil from '../../assets/basil.png'
import passionfruit from '../../assets/passionfruit.png'
import pasta from '../../assets/pasta.png'
import strawberry from '../../assets/strawberry.png'
import negroni from '../../assets/negroni.png'
import naanbread from '../../assets/NaanBread.png'
import bread from '../../assets/bread.png'
import cucumber from '../../assets/cucumber.png'
import peach from '../../assets/peach.png'
import pesto from '../../assets/pesto.png'
import ham from '../../assets/ham.png'
import cheese from '../../assets/cheese.png'
import radish from '../../assets/radish.png'
import arugula from '../../assets/arugula.png'
import icecream from '../../assets/icecream.png'
import tomato from '../../assets/tomato.png'
import whiskey from '../../assets/whiskey.png'

export function Ingredients({ ingredient }) {

    function fetchImageIngredient(name) {
        let ingredient = name.toLowerCase().trim()

        let ingredientImage;

        if (ingredient == "brandy") {
            return ingredientImage = brandy

        } else if (ingredient == "lettuce") {
            return ingredientImage = lettuce

        } else if (ingredient == "asparagus") {
            return ingredientImage = asparagus

        } else if (ingredient == "plum") {
            return ingredientImage = plum

        } else if (ingredient == "almonds") {
            return ingredientImage = almonds

        } else if (ingredient == "aniz") {
            return ingredientImage = aniz

        } else if (ingredient == "bacon") {
            return ingredientImage = bacon

        } else if (ingredient == "potato") {
            return ingredientImage = potato

        } else if (ingredient == "coffee") {
            return ingredientImage = coffee

        } else if (ingredient == "shrimp") {
            return ingredientImage = shrimp

        } else if (ingredient == "cinnamon") {
            return ingredientImage = cinnamon

        } else if (ingredient == "onion") {
            return ingredientImage = onion

        } else if (ingredient == "glair") {
            return ingredientImage = glair

        } else if (ingredient == "coke") {
            return ingredientImage = coke

        } else if (ingredient == "damascus") {
            return ingredientImage = damascus

        } else if (ingredient == "flour") {
            return ingredientImage = flour

        } else if (ingredient == "filet") {
            return ingredientImage = filet

        } else if (ingredient == "lemon") {
            return ingredientImage = lemon

        } else if (ingredient == "apple") {
            return ingredientImage = apple

        } else if (ingredient == "basil") {
            return ingredientImage = basil

        } else if (ingredient == "passionfruit") {
            return ingredientImage = passionfruit

        } else if (ingredient == "pasta") {
            return ingredientImage = pasta

        } else if (ingredient == "strawberry") {
            return ingredientImage = strawberry

        } else if (ingredient == "negroni") {
            return ingredientImage = negroni

        } else if (ingredient == "bread") {
            return ingredientImage = bread

        } else if (ingredient == "naan bread") {
            return ingredientImage = naanbread

        } else if (ingredient == "cucumber") {
            return ingredientImage = cucumber

        } else if (ingredient == "peach") {
            return ingredientImage = peach

        } else if (ingredient == "pesto") {
            return ingredientImage = pesto

        } else if (ingredient == "ham") {
            return ingredientImage = ham

        } else if (ingredient == "cheese") {
            return ingredientImage = cheese

        } else if (ingredient == "radish") {
            return ingredientImage = radish

        } else if (ingredient == "arugula") {
            return ingredientImage = arugula

        } else if (ingredient == "icecream") {
            return ingredientImage = icecream

        } else if (ingredient == "tomato") {
            return ingredientImage = tomato

        } else if (ingredient == "whiskey") {
            return ingredientImage = whiskey

        } else {
            return ingredientImage = imagePlaceholder
        }
    }

    let ingredientImage = fetchImageIngredient(ingredient)

    return (
        <Container>
            <div className="ingredients">
                <div>
                    <img src={ingredientImage} alt="Imagem do ingrediente" />
                    <p>{ingredient}</p>
                </div>
            </div>
        </Container>
    );
}