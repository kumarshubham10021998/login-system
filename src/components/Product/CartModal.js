import React from 'react';
import './CartModal.css'; // Create a CSS file for modal styles

const CartModal = ({ isOpen, cart, handleIncreaseQuantity, handleDecreaseQuantity, toggleCartModal }) => {
    if (!isOpen) {
        return null;
    }

    const cartItems = Object.values(cart);
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Cart</h5>
                    <button type="button" className="close-button" onClick={toggleCartModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {cartItems.length === 0 ? (
                        <div>Your cart is empty</div>
                    ) : (
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-item-image" />
                                    <div className="item-details">
                                        <h5>{item.title}</h5>
                                        <p>${item.price}</p>
                                    </div>
                                    <div className="item-quantity">
                                        <button className="quantity-button" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="quantity-button" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="modal-footer">
                    <h5>Total: ${totalAmount.toFixed(2)}</h5>
                    <button type="button" className="close-modal-button" onClick={toggleCartModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
