import auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { useEffect, useState } from "react";
import { REMOVE_BET, REMOVE_ALL_BETS } from "../utils/mutations";
import Swal from "sweetalert2";

// import Swal from "sweetalert2";
export default function Profile() {
  const username = auth.getProfile().data.username;
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || {};
  console.log(user);
  const [removeAllBets] = useMutation(REMOVE_ALL_BETS);
  const [removeBet] = useMutation(REMOVE_BET);
const [betId, setBetId] = useState("");
  const getBetStatusClassName = (betStatus) => {
    switch (betStatus) {
      case "win":
        return "bg-green-200";
      case "loss":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  const handleRemoveBet = async (betId) => {
    try {
      const { data } = await removeBet({
        variables: { betId },
      });
      console.log(data);
      refetch();
    } catch (e) {
      console.error(e);
    }
  }
  const handleRemoveAllBets = async () => {
   Swal.fire({
      title: 'Delete All Bet History?',
      html: `This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#050e44',
      cancelButtonColor: '#BD6B57',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Bet History Deleted!',
          icon: 'success',
          confirmButtonColor: '#050e44',
        }).then(() => {
          removeAllBets();
          refetch();
        });
      }
    }
    )
  }

  return (
    <>
      <div className="flex flex-col  white-bg mx-5 mt-5 py-2 rounded-xl border-royalBlue  mb-8 justify-center">
        <h2 className="royalBlue text-3xl text-center">{`${username}'s Profile`}</h2>
        <h3 className="royalBlue text-3xl text-center">
          Balance: <span className="heading text-3xl">{user.units} units</span>{" "}
        </h3>
      </div>
      <div className="flex flex-col  white-bg mx-5   rounded-xl border-royalBlue justify-center">
        {user.activeBets?.length ? (
          <h3 className="heading text-3xl text-center py-2">Active Bets</h3>  
        ) : (
          <h3 className="heading text-3xl text-center py-2">
            No Current Active Bets
          </h3>
        )}
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center">
          {user.activeBets?.map((activeBet) => {
            return (
              <div key={activeBet.matchup} className="flex flex-col border-royalBlueTop  justify-center items-center mx-5 h-60 lg:w-5/12 ">
                <h3 className="heading text-xl font-bold text-center">
                  Matchup
                </h3>
                <p className="royalBlue font-bold">{activeBet.matchup}</p>
                <h3 className="heading text-xl font-bold text-center">
                  Bet Type
                </h3>
                {activeBet.betType === "spread" ? (
                  <>
                    <p className="royalBlue font-bold">
                      Spread {activeBet.spread}
                    </p>
                    <h3 className="heading text-xl font-bold text-center">
                      Predicted Winner
                    </h3>
                    <p className="royalBlue font-bold">{activeBet.winner}</p>
                  </>
                ) : activeBet.betType === "overTotal" ? (
                  <p className="royalBlue font-bold">Over Total</p>
                ) : (
                  <p className="royalBlue font-bold">Under Total</p>
                )}
                <h3 className="heading text-xl font-bold text-center">
                  Amount Bet
                </h3>
                <p className="royalBlue font-bold">{activeBet.units}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col  white-bg mx-5 mb-40 mt-4 rounded-xl border-royalBlue justify-center">
        {user.betHistory?.length ? (
          <h3 className="heading text-3xl text-center py-2">Bet History</h3>
        ) : (
          <h3 className="heading text-3xl text-center py-2">
            No Completed Bets
          </h3>
        )}
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center">
          {user.betHistory?.map((history) => {
            return (
              <div
                key={history.matchup}
                className={`flex flex-col border-royalBlueTop justify-cent/er items-center mx-5 cust-height w-full lg:w-5/12 ${getBetStatusClassName(
                  history.betStatus
                )}`}
              >
                <h3 className="heading text-xl font-bold text-center">
                  Matchup
                </h3>
                <p className="royalBlue font-bold">{history.matchup}</p>
                <h3 className="heading text-xl font-bold text-center">
                  Bet Type
                </h3>
                {history.betType === "spread" ? (
                  <>
                    <p className="royalBlue font-bold">
                      Spread {history.spread}
                    </p>
                    <h3 className="heading text-xl font-bold text-center">
                      Predicted Winner
                    </h3>
                    <p className="royalBlue font-bold">{history.winner}</p>
                  </>
                ) : history.betType === "overTotal" ? (
                  <p className="royalBlue font-bold">Over Total</p>
                ) : (
                  <p className="royalBlue font-bold">Under Total</p>
                )}

                <h3 className="heading text-xl font-bold text-center">
                  Payout
                </h3>
                <p className="royalBlue font-bold">
                  {history.betStatus === "loss"
                    ? 0
                    : history.betStatus === "push"
                    ? history.units : history.units*2}
                </p>
                <h3 className="heading text-xl font-bold text-center">
                  Result
                </h3>
                {history.betStatus === "win" ? (
                  <p className="royalBlue font-bold">Win</p>
                ) : history.betStatus === "loss" ? (
                  <p className="royalBlue font-bold">Loss</p>
                ) : (
                  <p className="royalBlue font-bold">Push</p>
                )}
                {history && (
                <button className="gold-bg py-2 mt-2  px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl" onClick={() => handleRemoveBet(history._id)}>Remove Bet</button> )}
              </div>
              
            );
            
          })}
        </div>
        <div className="flex items-center justify-center">
  {user.betHistory?.length > 0 && (
    <button className="gold-bg py-2 mt-2 px-4 rounded-xl royalBlue mybtn mb-7 font-bold text-xl shadow-xl w-80" onClick={() => handleRemoveAllBets()}>Remove All Bet History</button>
  )}
</div>
      </div>
      
    </>
  );
}
