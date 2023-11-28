import React from 'react';
import '../index.css';

export default function BuyUnits() {
  const handlePayment = (price, credits) => {
    console.log(`Payment of $${price} made. Received ${credits} credits.`);
  };

  const paymentOptions = [
    { price: 5, credits: 250 },
    { price: 10, credits: 550 },
    { price: 20, credits: 1250 },
    { price: 30, credits: 2000},
    { price: 40, credits: 2750},
    { price: 50, credits: 3500}
  ];

  return (
    <div className="flex flex-col  white-bg mx-5 mt-5 rounded-xl border-royalBlue mb-48 justify-center items-center">
      
        <h2 className="heading text-3xl text-center py-4">Feel Like Pressing Your Luck? Buy More Units!</h2>
    
          <p className='royalBlue font-bold text-xl py-2'>Select a Payment Option:</p>
          <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center">
            {paymentOptions.map((option, index) => (
              
              <button
                key={index}
                className="gold-bg py-2 mt-2  px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl mx-2 w-60 "
                onClick={() => handlePayment(option.price, option.credits)}
              >
                {`Pay $${option.price} - ${option.credits} Units`}
              </button>
            ))}
          </div>
        
      </div>

  );
}


