import React, {useState, useEffect} from 'react'
import StarRating from '../star-rating'
import items from '../../json/products.json'
import {formatCurrency} from '../../functions/numbers'
import {FiGrid, FiMenu} from 'react-icons/fi'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Products = () => {
  const [grid, setGrid] = useState(true)
  const [productos, setProductos] = useState([]);
  const [isProd, setIsProd] = useState(false);

  const obtenerProductos = async () => {

   const datos = await axios.get('http://localhost:8000/api/productos/');
   setIsProd(true)
   setProductos(datos.data)
  }

  //obtenerProductos();
   useEffect(()=>{

      if(!isProd)
        obtenerProductos()
      
    }, [isProd])

  //obtenerProductos();

  return (
    <>
      <div className="flex flex-row w-full items-center justify-between h-16 mb-4">
        {<div className="font-normal">Total de productos: {productos.length}</div>}

        {/* <div className="flex flex-row items-center justify-center space-x-1">
          <button
            className="btn btn-circle bg-transparent text-grey-500"
            onClick={() => setGrid(true)}>
            <FiGrid className="stroke-current" size={20} />
          </button>
          <button
            className="btn btn-circle bg-transparent text-grey-500"
            onClick={() => setGrid(false)}>
            <FiMenu className="stroke-current" size={20} />
          </button>
        </div> */}
      </div>
      <div className={`${grid ? 'w-full flex flex-row flex-wrap' : 'hidden'}`}>
        {productos.map((item, i) => (
          <div className="w-1/4 p-2" key={i}>
            <div className="w-full flex flex-col items-start justify-around space-y-3">
              <div className="mx-auto w-24">
                <Link to={`ordenar/${item.id}`}><img
                  src={item.photo}
                  alt="media"
                  className={`h-24 w-full shadow-lg rounded-full shadow-lg`}
                />
                </Link>
              </div>
              <div className="text-sm font-bold">{item.nombre}</div>
              <div className="text-sm">{item.category}</div>
              {/* <span>
                <StarRating initialRating={item.stars} numberOfStars={5} />
              </span> */}
              <div className="text-xl font-bold">
                {formatCurrency(item.precio)}
              </div>
            </div>
          </div>
        ))}
      </div>

      { <div className={`${!grid ? 'w-full flex flex-col' : 'hidden'}`}>
        {items.map((item, i) => (
          <div
            className="flex items-center justify-start p-2 space-x-4 truncate"
            key={i}>
            <div className="flex-shrink-0 w-16">
              <img
                src={item.img}
                alt="media"
                className={`h-16 w-full shadow-lg rounded-full shadow-lg`}
              />
            </div>
            <div className="flex flex-col w-full min-w-0">
              <div className="text-sm font-bold">{item.nombre}</div>
              <div className="text-sm">{item.categoria}</div>
              <div className="text-sm truncate">{item.description}</div>
              <span>
                <StarRating initialRating={item.stars} numberOfStars={5} />
              </span>
            </div>
            <div className="flex-shrink-0">
              <div className="text-xl font-bold">
                {formatCurrency(item.precio)}
              </div>
            </div>
          </div>
        ))}
      </div> }
    </>
  )
}

export default Products
