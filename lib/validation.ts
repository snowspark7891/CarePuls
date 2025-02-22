'use Client'
import { z } from "zod";


export const UserFormValidation = z.object({
  username: z.string().min(2,"Username must be of more then two charecters").max(50,"Username at most of 50 charecters"),
  email:z.string().email("Invalid Email address"),
  phone: z.string().refine((phone)=> /^\+?[1-9]\d{1,14}$/.test(phone),'Invalid Phone Number')
});


