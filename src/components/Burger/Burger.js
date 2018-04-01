import React from 'react'
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngedients/BurgerIngedients';
const Burger =  (props) => {
  // object to arry transformation
  let transformIngredient =  Object.keys( props.ingredients )
  .map( igKey => {
      return [...Array (props.ingredients[igKey])].map((_, i) =>{
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      })
  }).reduce((arr,el)=>{
    return arr.concat(el)
  },[])

  if(transformIngredient.length===0){
    transformIngredient = <p>Please Add Some Ingredients </p>
  }
  //console.log(transformIngredient)
  return (


      <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="meat" />
            <BurgerIngredient type="salad" /> */}
            {transformIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    
  )
}

export default Burger