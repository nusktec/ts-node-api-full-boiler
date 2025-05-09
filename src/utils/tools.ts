/**
 Author: Revelation.AF
 Git: nusktec
 **/
import countries from "../constants/countries";
import process from "process";

//generate random characters
export const RandomAscii = (length: number) => {
    //populate and store ascii codes
    let charArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let code = [];
    //for (let i = 30; i <= 39; i++) charArray.push(String.fromCharCode(i));
    //do range random here
    for (let i = 0; i <= length - 1; i++) {
        code.push(charArray[Math.floor(Math.random() * charArray.length - 1)]);
    }
    return code.join("");
}

//generate A-Z rand()
export const RandomAsciiAZ = function generateChar(length: number) {
    //populate and store ascii codes
    let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    let code = [];
    //for (let i = 30; i <= 39; i++) charArray.push(String.fromCharCode(i));
    //do range random here
    for (let i = 0; i <= length - 1; i++) {
        code.push(charArray[Math.floor(Math.random() * charArray.length - 1)]);
    }
    return code.join("");
}

//get timeZone offset
export const GetTimeOffsetByZone = async (zone: string) => {
    try {
        const data = await fetch("https://worldtimeapi.org/api/timezone/" + zone).then(d => d.json())
        //console.log(data)
        const refactorSet = (offset: any) => {
            let sign = offset.slice(0, 1);
            let main = Number(offset.slice(1, -3));
            let left = Number(offset.slice(0. - 2));

            // console.log({main, left, sign});
            const decimal = left / 60;
            const combine = (decimal) > 0 ? main + 0.5 : main;
            return `${sign}${combine}`
        };
        //get timezone else put 0
        if (data && !data.error) {
            return Number(refactorSet(data?.utc_offset))
        } else {
            return +0
        }
    } catch (ex) {
        return +0
    }
}

//get global currency rate from coinbase
/**
 *
 * @param country //pass full country name and not ISO-Name
 * @param getSym //determine if you want country currency symbol or just all finance info
 */
export const getCurrencyRate = async (country: string, getSym = false) => {
    if (!country) return null
    try {
        //get parent country and return data
        const data = countries.find((c) => c.countryName.toLowerCase() === country.toLowerCase())
        if (getSym) return data
        //fetch currency rate
        const rates = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=NGN").then(r => r.json())
        return {data, rates}
    } catch (e) {
        return null
    }
}

//set global debug
export const PrintDebug = (e: any) => {
    if (process.env.DEBUG) {
        console.log(e)
    }
}

export const generateRandomString = (length: number = 5): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
