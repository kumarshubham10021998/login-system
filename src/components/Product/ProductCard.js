import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const ProductCard = ({ product, handleAddToCart }) => {
    return (
        <div className="col-md-4">
            <div className="card">
                <img height={400} src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <button type="button" className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
