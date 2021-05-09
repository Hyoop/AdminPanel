import { useState, useContext } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

import env from "react-dotenv";
import "./CardSubscription.css";
const UpdateSubscription = async (collect:boolean,sendRequest:any,auth:any,_id:string) => {

    try {
        const bodydata = {"collect": collect}

        const responseData = await sendRequest(
          "" + env.apiURL + "/api/subscription/" + _id,
          "PUT",
          JSON.stringify(bodydata),
      {
        "Content-Type" : "application/json",
        Authorization: "Bearer " + auth.token
      }
        );
        console.log(responseData)
      } catch (err) {console.log(err)}
    };

const CardSubscription = (props: {
  user: string,
  _id: string,
  orderid: string,
  typesubscription: string,
  startsubscription: string,
  endsubscription: string,
  expired: boolean,
  collect: boolean,
  quantity: number,

}) => {
    
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const [_id]=useState<string>(props._id)

    const startsubscription = new Date(props.startsubscription)
    const [collect,SetCollect] = useState<boolean>(props.collect)

    const betterdate = (time: Date, schema:Array<any>, separator:string) => {
        function format(m:any) {
            let f = new Intl.DateTimeFormat('en', m);
            return f.format(time);
         }
         return schema.map(format).join(separator);
    }
    const schemaDate = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}]
    const schemaDatetime = [{hour: '2-digit', minute: '2-digit'}]
    const start = betterdate(startsubscription, schemaDate, "-") + " " + betterdate(startsubscription, schemaDatetime, ":")
    
    const onClickCollect = (newCollect:boolean) => {
        SetCollect(newCollect)
        UpdateSubscription(newCollect,sendRequest,auth,_id)
    }

    return(
        <tr className="">
            <th>{start}</th>
            <th>{props.orderid.substring(0,7)}</th>
            <th>{props.user}</th>
            <th className="column4">{props.typesubscription}</th>
            <th className="column5">{props.quantity}</th>
            <th className="column6 subscription__check">
                <td>
                    <input id={_id} type="checkbox" checked={collect} onClick={(event) => onClickCollect(!collect)}/>
                </td>
            </th> 
            <th className="column7">{props.expired ? "true" : "false"}</th>
        </tr>
)};

export default CardSubscription;
