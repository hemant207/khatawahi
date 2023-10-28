import { atom } from 'recoil';


const totalAmountState = atom({
  key: "totalAmountState",
  default: {
    "amount_in":0,
    "amount_out":0
  }
});

export default totalAmountState;
