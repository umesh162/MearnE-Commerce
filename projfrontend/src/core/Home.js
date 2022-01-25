import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { useEffect, useState } from "react";
import { getProducts } from "./helper/coreapicalls";


const Home = () => {
  const [products, setProducts] = useState([]); //declaring product State to save the data from fetched API
 

  //preLoad which gets all the product info

  const preLoad = () => {
    getProducts().then((resp) => {
      setProducts(resp);
    });
  };

  //calling the preLoad in useEffect and setting it in state

  useEffect(() => {
    console.log(products);
    preLoad();
  }, []);

  return (
    <Base
      Title="Home Page"
      className="text-white"
      description="This is the HomePage"
    >
    
      <div className="row ">
        {products.map((prod, index) => (
          <div key={index} className="col-4 mb-4 mt-4">
            <Card
          product={prod}
            />
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Home;