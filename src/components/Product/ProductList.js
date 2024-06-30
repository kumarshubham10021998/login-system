import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Headers from './Headers';
import CartModal from './CartModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product) => {
        const productId = product.id;
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
                newCart[productId].quantity += 1;
            } else {
                newCart[productId] = { ...product, quantity: 1 };
            }
            return newCart;
        });
    };

    const handleIncreaseQuantity = (productId) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            newCart[productId].quantity += 1;
            return newCart;
        });
    };

    const handleDecreaseQuantity = (productId) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[productId].quantity > 1) {
                newCart[productId].quantity -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const cartCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

    const toggleCartModal = () => {
        setIsCartModalOpen(!isCartModalOpen);
    };

    return (
        <div>
            <Headers cartCount={cartCount} toggleCartModal={toggleCartModal} />
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
                    ))}
                </div>
                <CartModal
                    isOpen={isCartModalOpen}
                    cart={cart}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    toggleCartModal={toggleCartModal}
                />
            </div>
        </div>
    );
};

export default ProductList;
