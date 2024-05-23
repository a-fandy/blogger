import { useEffect, useState } from 'react';

const HomePage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Simulate fetching data from an API
      setProducts([
        { id: 1, name: 'Product 1', description: 'Description of product 1', price: '$10', imageUrl: 'https://i.pinimg.com/564x/71/dd/0c/71dd0cb0f44253cfdab485f329d5b502.jpg' },
        { id: 2, name: 'Product 2', description: 'Description of product 2', price: '$20', imageUrl: 'https://example.com/image2.jpg' },
        { id: 3, name: 'Product 3', description: 'Description of product 3', price: '$30', imageUrl: 'https://cdna.lystit.com/400/500/tr/photos/yoox/2b2e4cd6/cos-Black-Shirt.jpeg' },
      ]);
    }, []);

    return (
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={product.imageUrl} alt={product.name} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <div className="card-actions">
                  <div className="badge badge-outline">{product.price}</div>
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default HomePage