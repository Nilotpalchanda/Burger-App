import React , {Component} from 'react'
import Aux from '../../hoc/_Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0

        },
        totalPrice: 4,
        purchasable: false,
        popUp:false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }


    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }
    deleteIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            //console.log('empty')
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }; 
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeletion;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }
    popupHandaler = () =>{
        this.setState({
            popUp:true
        })
    }
    closeModal =() =>{
        this.setState({
            popUp:false
        })
    }
    continuePurchase =() =>{
        alert('Thanks')
        this.setState({
            popUp:false
        })
    }
    render(){
        //Less Button Disable if Product O
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(

            <Aux>
                <Modal show={this.state.popUp} modalClosed={this.closeModal}>
                
                     <OrderSummery 
                     ingredients={this.state.ingredients} 
                     price={this.state.totalPrice.toFixed(2)}
                     purchaseCancelled={this.closeModal}
                     purchaseContinued={this.continuePurchase}
                     />
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} ingredientDeleted ={this.deleteIngredientHandler} 
                disabled={disabledInfo}
                price= {this.state.totalPrice}
                purchasable={this.state.purchasable}
                orderClicked ={this.popupHandaler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder


