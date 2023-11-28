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
    <div className="PaymentButtons">
      <div className="centered-content">
        <h1 className="payment-buttons-title">Feel Like Pressing Your Luck? Buy More Units!</h1>
        <div className="payment-buttons-container">
          <h2>Select a Payment Option:</h2>
          <div className="payment-buttons">
            {paymentOptions.map((option, index) => (
              <button
                key={index}
                className="payment-button"
                onClick={() => handlePayment(option.price, option.credits)}
              >
                {`Pay $${option.price} - ${option.credits} credits`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


