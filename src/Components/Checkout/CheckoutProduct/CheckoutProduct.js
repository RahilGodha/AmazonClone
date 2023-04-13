import React from 'react'
import { useStateValue } from '../../StateProvider'
import "./CheckoutProduct.css"

const CheckoutProduct = (props) => {
// eslint-disable-next-line
  const [state, dispatch] = useStateValue();

  const removeFromBasket = () => {
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id : props.id,
      })
  }

  return (
    <div className='Checkout_Product'>
        <img className='Checkout_Product_img' src={props.image} alt="image1" />
        <div className='Checkout_Product_info'>
            <p className='Checkout_Product_title'>{props.title}</p>
            <p className='Checkout_Product_price'>
                <small>R </small>
                <strong>{props.price}</strong>
            </p>
            <div className='Checkout_Product_rating'>
                {Array(props.rating).fill().map(() => (<p>🌟</p>))}
            </div>
            <button onClick={removeFromBasket} >Remove from bakset</button>
        </div>
    </div>
  )
}

export default CheckoutProduct