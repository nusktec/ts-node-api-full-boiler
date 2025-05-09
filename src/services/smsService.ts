/**
 /Author: Revelation A.F
 /Git: nusktec
 **/
import axios from "axios";
import process from "process";

/**
 * Send sms using termii netork
 * @param to
 * @param body
 */
export const smsService = async (to: string, body: string) => {
    //call network
    const postData = {
        "to": to,
        "from": "AXTRON",
        "sms": body,
        "type": "plain",
        "api_key": process.env.TERMII_KEY,
        "channel": "generic"
    }

    axios.post("https://v3.api.termii.com/api/sms/send", postData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("SMS Sent", response.data);
        })
        .catch((error) => {
            console.error("Failed Sending SMS", error.message);
        });

}