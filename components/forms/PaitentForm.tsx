"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormfield from "../ui/CustomFormfield";
import SubmitButton from "../ui/SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldTypes {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    username,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      console.log("its done");
      const userData = {
        username,
        email,
        phone,
      };
      const newUser = await createUser(userData);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There 👋🏻</h1>
          <p className="text-dark-600">Schedule your appointment here</p>
        </section>
        <CustomFormfield
          fieldType={FormFieldTypes.INPUT}
          name="username"
          label="Username"
          iconSrc="/assets/icons/user.svg"
          placeHolder="Fullname"
          iconAlt="user"
          control={form.control}
        />
        <CustomFormfield
          fieldType={FormFieldTypes.INPUT}
          name="email"
          label="Email"
          iconSrc="/assets/icons/email.svg"
          placeHolder="name34@gmail.com"
          iconAlt="email"
          control={form.control}
        />
        <CustomFormfield
          fieldType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          label="Contact Number"
          iconSrc="/assets/icons/phone.svg"
          placeHolder="000000000"
          iconAlt="phone"
          control={form.control}
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;

// "use client";
// import React, { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Form } from "@/components/ui/form";
// import CustomFormfield from "../ui/CustomFormfield";
// import SubmitButton from "../ui/SubmitButton";
// import { UserFormValidation } from "@/lib/validation";
// import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/patient.actions";

// export enum FormFieldTypes {
//   INPUT = "input",
//   TEXTAREA = "textarea",
//   PHONE_INPUT = "phoneInput",
//   CHECKBOX = "checkbox",
//   DATE_PICKER = "datePicker",
//   SELECT = "select",
// }

// const PaitentForm = () => {
//   const router = useRouter();
//   const [isLoading, setisLoading] = useState(false);
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof UserFormValidation>>({
//     resolver: zodResolver(UserFormValidation),
//     defaultValues: {
//       username: "",
//       email: "",
//       phone: "",
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit({
//     username,
//     email,
//     phone,
//   }: z.infer<typeof UserFormValidation>) {
//     console.log("its done");
//     setisLoading(true);
//     try {
//    console.log('its done');

//     const userData = {
//         username,
//         email,
//         phone,
//       };
//      const newuser = await createUser(userData);
//      if(newuser){ router.push(`/patients/${newuser.$id}/register`)}
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
//         <section mb-12 space-y-4>
//           <h1 className="header">Hi There 👋🏻</h1>
//           <p className="text-dark-600">Shedule your appointment here </p>
//         </section>
//         <CustomFormfield
//           fieldType={FormFieldTypes.INPUT}
//           name="name"
//           label="Username"
//           iconSrc="/assets/icons/user.svg"
//           placeHolder="Fullname"
//           iconAlt="user"
//           control={form.control}
//         />
//         <CustomFormfield
//           fieldType={FormFieldTypes.INPUT}
//           name="email"
//           label="Email"
//           iconSrc="/assets/icons/email.svg"
//           placeHolder="name34@gmail.com"
//           iconAlt="email"
//           control={form.control}
//         />
//         <CustomFormfield
//           fieldType={FormFieldTypes.PHONE_INPUT}
//           name="phone"
//           label="Contact Number"
//           iconSrc="/assets/icons/phone.svg"
//           placeHolder="000000000"
//           iconAlt="email"
//           control={form.control}
//         />

//         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//       </form>
//     </Form>
//   );
// };

// export default PaitentForm;
