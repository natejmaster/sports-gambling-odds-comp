import '../index.css';
export default function BuyUnits() {
    const paymentOptions = [
        { price: 5, credits: 250 },
        { price: 10, credits: 550 },
        { price: 20, credits: 1250 },
        // Add more payment options as needed
      ];
    
      return (
        <div id="parent-title">
          <h1 id="buy-units-title">Feel Like Pressing Your Luck? Buy More Units!</h1>
          <div>
      <h2>Select a Payment Option:</h2>
      <div>
        {paymentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handlePayment(option.price, option.credits)}
          >
            {`Pay $${option.price} - ${option.credits} credits`}
          </button>
        ))}
      </div>
    </div>
        </div>
      );
}