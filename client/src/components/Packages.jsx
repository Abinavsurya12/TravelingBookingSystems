import React from 'react';
import { Link } from 'react-router-dom';



const Packages = ({tripData}) => {
  return (
   
    <div  className="cardtrips">
  <div className="package-card">
              <img src={tripData.img}       alt={tripData.name} /><br />
              <h1>{tripData.name}</h1>
                <p>{tripData.duration}{tripData.location}</p>
          <p>{tripData.price}</p>
          {tripData.reviews && (
        <p> {tripData.reviews} / 5</p>
      )}
              

                    </div>
                     <button className="btn-explore "
            // onClick={() => addToCart(tripData)}
               onClick={() => window.location.href = (tripData.paymentlink)}

          >
            Book Now
          </button> </div>)}

          export default Packages;