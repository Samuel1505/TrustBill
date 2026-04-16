import { create } from "zustand";
import type { BillCategory, PayStep } from "@/types";

interface PaymentState {
  step: PayStep;
  category: BillCategory | null;
  formData: Record<string, string>;
  txHash: string | null;
  setStep: (s: PayStep) => void;
  setCategory: (c: BillCategory) => void;
  setFormData: (d: Record<string, string>) => void;
  setTxHash: (h: string) => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  step: 1,
  category: null,
  formData: {},
  txHash: null,

  setStep: (step) => set({ step }),
  setCategory: (category) => set({ category }),
  setFormData: (formData) => set({ formData }),
  setTxHash: (txHash) => set({ txHash }),
  reset: () =>
    set({ step: 1, category: null, formData: {}, txHash: null }),
}));
