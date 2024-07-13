import { useEffect, useState } from 'react';
import './ProductList.css'; 

// Real laptop images from Unsplash
const images = [
  'https://images.unsplash.com/photo-1517430816045-df4b7de4a36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fGxhcHRvcHxlbnwwfHx8fDE2NTQ4MjM2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1516569421551-457827cb473d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fGxhcHRvcHxlbnwwfHx8fDE2NTQ4MjM2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1506748686214e9df14a4d2f2f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fGxhcHRvcHxlbnwwfHx8fDE2NTQ4MjM2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1517430816078-7a953f2b8e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fGxhcHRvcHxlbnwwfHx8fDE2NTQ4MjM2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
  'https://images.unsplash.com/photo-1506748686214-0eebf61b05cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzUyOXwwfDF8c2VhcmNofDJ8fGxhcHRvcHxlbnwwfHx8fDE2NTQ4MjM2NzQ&ixlib=rb-1.2.1&q=80&w=1080',
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/fetch-products'); // Use proxy route
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={getRandomImage()} alt={`Image of ${product.productName}`} className="product-image" />
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
