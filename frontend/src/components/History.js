import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const History = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { // fetch the datas from mongodb
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/history');
                setProducts(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <p className='text-red-500 mt-3 mx-5'>Error: {error}</p>;

    return (
        <div>
            <h1 className='text-lg mt-3 font-bold mx-5'>Product History</h1>
            <div className='mx-5'>
                {products.map((product) => (
                    <div key={product._id} className='flex gap-3 mt-3 border-2 p-3'>
                        <div>
                        <img src={product.productImage} alt={product.productName} width="100" />
                        
                        </div>

                        <div className='flex justify-around flex-col'>
                        <h2 className=' '>{product.productName}</h2>
                        <p className='text-sm font-medium capitalize'>Category : {product.category}</p>
                        <p className='font-bold'>Price: ₹{product.productPrice}</p>                     
                        <p className='text-green-500 font-bold'>Discounted Price: ₹{product.productDiscountPrice}</p>                        
                        </div>                                          
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
