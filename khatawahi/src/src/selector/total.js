import { selector } from "recoil";
import totalAmountState from "../atom/totalAmountState";

 const total_in = selector({
    key:"total_in",
    get:({get})=>{
        const totalamount = get(totalAmountState);
        return totalamount.amount_in;
    }
})

 const total_out = selector({
    key:"total_out",
    get:({get})=>{
        const totalamount = get(totalAmountState);
        return totalamount.amount_out;
    }
})

export { total_in, total_out };