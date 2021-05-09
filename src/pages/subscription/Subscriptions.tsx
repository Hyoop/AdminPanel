import {useState, useEffect, useContext} from "react";
import "./Subscriptions.css";

import MainHeader from "../../shared/components/Navigation/MainHeader";
import CardSubscriptions from "./components/CardSubscription"
import { useHttpClient } from "../../shared/hooks/http-hook";
import env from "react-dotenv";
import { AuthContext } from "../../shared/context/auth-context";


const Subscriptions = () => {
    const auth = useContext(AuthContext);
    const [subscriptions, SetSubscriptions] = useState([])
    const {isLoading, sendRequest} = useHttpClient();

    useEffect(() => {
        const fetchSubscriptions = async () => {
          try {
            const responseData = await sendRequest(
              "" + env.apiURL + "/api/subscription/all",
              "GET",
          null,
          {
            "Content-Type" : "application/json",
            Authorization: "Bearer " + auth.token
          }
            );
            SetSubscriptions(responseData.subscriptions);
          } catch (err) {}
        };
        fetchSubscriptions();
      }, [sendRequest]);

    

    return(
        <div>
            <section className="subscriptions__header">
            <MainHeader>
                <h1>Subscriptions</h1>
            </MainHeader>
            </section>
            <section className="subscriptions__component">
                <div className="subscription__search">
                    Search bar...
                </div>
                <table className="subscription__list">
                <thead>
                    <tr>
                        <th>Start Date</th>
                        <th>Order ID</th>
                        <th>User</th>
                        <th className="column4">Type</th>
                        <th className="column5">Quantity</th>
                        <th className="column6">Collect</th>
                        <th className="column7">Expired</th>
                    </tr>
                </thead>
                <tbody>
                {!isLoading && 
                subscriptions.map((subscription:any) => (<CardSubscriptions 
                    user={subscription.email}
                    _id={subscription._id}
                    orderid={subscription.request_id || subscription.request_uuid}
                    typesubscription={subscription.typeSubscription}
                    startsubscription={subscription.StartSubscription}
                    endsubscription={subscription.EndSubscription}
                    expired={subscription.expired}
                    collect={subscription.collect}
                    quantity={subscription.quantity}
                    />)) }
                </tbody>
                </table>
            </section>

        </div>


    )

}
export default Subscriptions;