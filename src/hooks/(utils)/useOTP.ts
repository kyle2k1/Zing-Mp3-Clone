import { create } from 'zustand';

interface OTPProps {
  otp: number;
  setOTP: (value: number) => void;
}
const useOTP = create<OTPProps>((set) => ({
  otp: -1,
  setOTP: (value: number) => set({ otp: value })
}));

export default useOTP;
