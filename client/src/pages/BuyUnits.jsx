import React from "react";
import "../index.css";
import Swal from "sweetalert2";
export default function BuyUnits() {
  const handlePayment = () => {
    Swal.fire({
      title: "Payment Failed",
      text: "Feature is not yet implemented. Come back soon!",
      icon: "error",
      confirmButtonColor: "#050e44",
    });
  };

  const paymentOptions = [
    { price: 5, credits: 250 },
    { price: 10, credits: 550 },
    { price: 20, credits: 1250 },
    { price: 30, credits: 2000 },
    { price: 40, credits: 2750 },
    { price: 50, credits: 3500 },
  ];

  return (
    <section className="flex flex-col  white-bg mx-5 mt-5 rounded-xl border-royalBlue mb-48 justify-center items-center">
      <h2 className="heading text-3xl text-center py-4">
        Feel Like Pressing Your Luck? Buy More Units!
      </h2>

      <form className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:flex-row">
          <div className="flex flex-col mx-4">
            <label className="royalBlue font-bold text-lg py-2">
              Name on Card:
            </label>

            <input
              className="border-inputGold border-2 rounded-xl p-2 mb-4"
              type="text"
              placeholder="Name on Card"
            />
          </div>
          <div className="flex flex-col mx-4">
            <label className="royalBlue font-bold text-lg py-2">
              Card Number:
            </label>
            <input
              className="border-inputGold border-2 rounded-xl p-2 mb-4"
              type="text"
              placeholder="Card Number"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:flex-row">
          <div className="flex flex-col mx-4">
            <label className="royalBlue font-bold text-lg py-2">
              Expiration Date:
            </label>
            <input
              className="border-inputGold border-2 rounded-xl p-2 mb-4"
              type="text"
              placeholder="Expiration Date"
            />
          </div>
          <div className="flex flex-col mx-4">
            <label className="royalBlue font-bold text-lg py-2">CVV:</label>
            <input
              className="border-inputGold border-2 rounded-xl p-2 mb-4"
              type="text"
              placeholder="CVV"
            />
          </div>
        </div>
      </form>

      <p className="royalBlue font-bold text-xl py-2">
        Select a Payment Option:
      </p>
      <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center">
        {paymentOptions.map((option, index) => (
          <button
            key={index}
            className="gold-bg py-2 mt-2  px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl mx-2 w-60 "
            onClick={handlePayment}
          >
            {`Pay $${option.price} - ${option.credits} Units`}
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="royalBlue text-xs text-center">
          Currently this function is under maintenance. uBetr is not a licensed
          casino or Sportsbook and cannot issue payments in exchange for virtual
          currency. Any payment is a microtransaction to extend the user’s uBetr
          experience. Any payments made upon this feature’s completion will go
          directly to the uBetr development team to support future development
          endeavors. Thank you for your support!
        </p>
      </div>
    </section>
  );
}
