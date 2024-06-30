import React from 'react';

const Cart = ({ cart, handleIncreaseQuantity, handleDecreaseQuantity }) => {
    const cartItems = Object.values(cart);

    if (cartItems.length === 0) {
        return <div>Your cart is empty</div>;
    }

    return (
        <div className="mt-4">
            <h3>Cart</h3>
            <ul className="list-group">
                {cartItems.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{item.title}</h5>
                            <p>${item.price}</p>
                        </div>
                        <div>
                            <button className="btn btn-outline-secondary" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                            <span className="px-3">{item.quantity}</span>
                            <button className="btn btn-outline-secondary" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
