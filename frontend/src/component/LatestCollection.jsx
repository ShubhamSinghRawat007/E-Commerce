import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    const [latestProduct,setLatestProduct] = useState([])
    useEffect(()=>{
        setLatestProduct(products.slice(0,10))
    },[products])


    return (
        <div className='my-10' >
            <div className='text-center py-8 text-3xl' >
                <Title text1={'Latest'} text2={'Collection'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >
                    Introducing our latest collection: where timeless elegance meets modern trends.
                </p>
            </div>
            {/* rendering produce */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    latestProduct.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection