// import React, { useState, useEffect } from "react";
// import AddToCart from "./components/AddToCart";
// import Cart from "./components/Cart";
// import Checkout from "./components/Checkout";
// import OrderConfirmation from "./components/OrderConfirmation";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [page, setPage] = useState("add");
//   const [order, setOrder] = useState(null);

//     useEffect(() => {
//     setTimeout(() => {
//       setProducts([
//         { id: 1, name: "Product A", price: 100, imageUrl: "https://placehold.co/100x100/ADD8E6/000000?text=ProdA" },
//         { id: 2, name: "Product B", price: 200, imageUrl: "https://placehold.co/100x100/FFD700/000000?text=ProdB" },
//         { id: 3, name: "Product C", price: 300, imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=ProdC" },
//       ]);
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="logo">ShopKart</div>
//         <div className="nav-links">
//           <button
//             className={page === "add" ? "active" : ""}
//             onClick={() => setPage("add")}
//           >
//             Add to Cart
//           </button>
//           <button
//             className={page === "cart" ? "active" : ""}
//             onClick={() => setPage("cart")}
//           >
//             Cart
//           </button>
//           <button
//             className={page === "checkout" ? "active" : ""}
//             onClick={() => setPage("checkout")}
//           >
//             Checkout
//           </button>
//         </div>
//       </nav>
//       <main>
//         {page === "add" && (
//           <AddToCart products={products} cart={cart} setCart={setCart} />
//         )}
//         {page === "cart" && <Cart cart={cart} setCart={setCart} />}
//         {page === "checkout" && (
//           <Checkout
//             cart={cart}
//             setCart={setCart}
//             setOrder={setOrder}
//             setPage={setPage}
//           />
//         )}
//         {page === "confirmation" && <OrderConfirmation order={order} />}
//       </main>
//     </div>
//   );
// }

// export default App;


//The commented App.jsx code uses fake data for frontend testing, 
// while the active code leverages an API call to your backend for real data.

import React, { useState, useEffect } from "react";
import AddToCart from "./components/AddToCart";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("add");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // We have to replace this with the actual URL, for the time being, i just put a random link        
        const response = await fetch("http://localhost:8080/api/products"); //

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts(); 
  }, []); 

  if (loading) {
    return <div className="container"><h2>Loading products...</h2></div>;
  }

  if (error) {
    return <div className="container"><h2>Error: {error}</h2><p>Could not fetch products. Please ensure your backend is running.</p></div>;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">ShopKart</div>
        <div className="nav-links">
          <button
            className={page === "add" ? "active" : ""}
            onClick={() => setPage("add")}
          >
            Add to Cart
          </button>
          <button
            className={page === "cart" ? "active" : ""}
            onClick={() => setPage("cart")}
          >
            Cart
          </button>
          <button
            className={page === "checkout" ? "active" : ""}
            onClick={() => setPage("checkout")}
          >
            Checkout
          </button>
        </div>
      </nav>
      <main>
        {page === "add" && (
          <AddToCart products={products} cart={cart} setCart={setCart} />
        )}
        {page === "cart" && <Cart cart={cart} setCart={setCart} />}
        {page === "checkout" && (
          <Checkout
            cart={cart}
            setCart={setCart}
            setOrder={setOrder}
            setPage={setPage}
          />
        )}
        {page === "confirmation" && <OrderConfirmation order={order} />}
      </main>
    </div>
  );
}

export default App;