import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import './index.css'



function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

const MIN_ITEMS = 1
const MAX_ITEMS = 5

useEffect(()  => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])  

//agregar cantidades al articulo
function addToCart (item) {
const itemExist = cart.findIndex(guitar => guitar.id === item.id)
if(itemExist >=0) { //existe en el carrito.
  if(cart[itemExist].quantity >= MAX_ITEMS) return
  const updatedCart = [...cart]
  updatedCart[itemExist].quantity++
  setCart(updatedCart)
} else {
  item.quantity = 1
  setCart([...cart, item])
}}

//para remover algun articulo
function removeFromCart(id) {
  setCart(prevCart => prevCart.filter (guitar => guitar.id !== id))
}

//agregar para decrementar cantidades
function decreaseQuantity(id) {
  //actualización
  const updatedCart = cart.map( item => {
    if(item.id === id && item.quantity > MIN_ITEMS ) {
      return {
        ...item,
        quantity: item.quantity -1
      }
    }
    return item
  })
  setCart(updatedCart)
}


//agregar para incrementar cantidades
function increaseQuantity(id) {
  const updatedCart = cart.map(item => {
    if (item.id === id && item.quantity < MAX_ITEMS) {
      return {
        ...item,
        quantity: item.quantity + 1
      };
    }
    return item;
  });
  setCart(updatedCart);
}

function clearCart(e) {
  setCart([])
}


  return (
    <>
    <Header 
    cart ={cart}
    removeFromCart={removeFromCart}
    decreaseQuantity={decreaseQuantity} 
    increaseQuantity={increaseQuantity} 
    clearCart={clearCart}
    />
   
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar 
                  key={guitar.id}
                  guitar={guitar}
                  cart={cart}
                  setCart={setCart}
                  addToCart={addToCart}
            />
          ))}
       
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl text-center">
          <p className="text-white fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>

          {/* AQUI EMPIEZAN BOTONES DE REDES SOCIALES */}
          <div className="social-buttons">
            <a
              href="https://wa.me/+529241771072"
              className="social-button whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="fa-icon" /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/ricaardoreyesc/"
              className="social-button instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="fa-icon" /> Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100004033394071"
              className="social-button facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
               <FontAwesomeIcon icon={faFacebook} className="fa-icon" /> Facebook
            </a>
          </div>
          {/* FIN DE BOTONES REDES SOCIALES */}
          <p className="text-white text-center fs-4 mt-4 m-md-0">Realizó: Luis Ricardo Reyes</p>
        </div>
      </footer>
    </>
  )
}

export default App;

