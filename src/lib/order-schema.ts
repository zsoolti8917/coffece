import { z } from "zod";

export const orderSchema = z.object({
  officeSize: z.enum(["small", "medium", "large", "other"]),
  dailyDrinkers: z.enum(["1-10", "11-25", "26-50", "50+"]),
  coffeeChoice: z.enum(["original", "zlaty", "both"]),
  deliveryFrequency: z.enum(["weekly", "biweekly", "monthly", "onDemand"]),
  contact: z.object({
    name: z.string().min(1),
    company: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    message: z.string().optional(),
    gdprConsent: z.literal(true, {
      message: "GDPR consent is required",
    }),
  }),
});

export type OrderData = z.infer<typeof orderSchema>;
