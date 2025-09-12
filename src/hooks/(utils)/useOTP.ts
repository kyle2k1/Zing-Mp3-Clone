import { create } from 'zustand';

interface OTPProps {
  OTP: number;
  setOTP: (value: number) => void;
}
const useOTP = create<OTPProps>((set) => ({
  OTP: -1,
  setOTP: (value: number) => set({ OTP: value })
}));

export default useOTP;
