/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormfield from "../ui/CustomFormfield";
import SubmitButton from "../ui/SubmitButton";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, registerPaient } from "@/lib/actions/patient.actions";
import { FormFieldTypes } from "./PaitentForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { FileUploader } from "../ui/FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    console.log("its done register");
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }
    try {
      console.log("its done register");
      const patientData = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPaient(patientData);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointments`);
      }

    } catch (error) {
      console.log(error,"something is here not working",Error.name);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-600">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Personal Information</h2>
          </div>
        </section>
        <CustomFormfield
          fieldType={FormFieldTypes.INPUT}
          name="name"
          label="Fullname"
          iconSrc="/assets/icons/user.svg"
          placeHolder="Fullname"
          iconAlt="user"
          control={form.control}
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
            iconAlt="phone"
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.DATE_PICKER}
            name="birthDate"
            label="Date of Birth"
            iconSrc="/assets/icons/phone.svg"
            placeHolder="dd/mm/yyyy"
            iconAlt="phone"
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.INPUT}
            name="address"
            label="Address"
            placeHolder="Sector 3, Bhubaneswar"
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.INPUT}
            name="occupation"
            label="Occupation"
            placeHolder="Engineer"
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.INPUT}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeHolder="Brother, Friend, Wife, etc."
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            iconSrc="/assets/icons/phone.svg"
            iconAlt="phone"
            control={form.control}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Medical Information</h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.SELECT}
            name="primaryPhysician"
            label="Primary Physician"
            placeHolder="Select a Physician"
            control={form.control}
          >
            {Doctors.map((doctor) => (
              <SelectItem value={doctor.name} key={doctor.name}>
                <div className="flex items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormfield>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeHolder="Life Care"
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.INPUT}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeHolder="004430934432"
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeHolder="Peanuts, Pollen, etc."
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.TEXTAREA}
            name="currentMedications"
            label="Current Medications"
            placeHolder="Paracetamol 40mg, Aspirin 200mg, etc."
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormfield
            fieldType={FormFieldTypes.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeHolder="Diabetes, Hypertension, etc."
            control={form.control}
          />
          <CustomFormfield
            fieldType={FormFieldTypes.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeHolder="Asthma, Heart Attack, etc."
            control={form.control}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">
              Identification and Verification
            </h2>
          </div>
        </section>
        <CustomFormfield
          fieldType={FormFieldTypes.SELECT}
          name="identificationType"
          label="Identification Type"
          placeHolder="Select an Identification Type"
          control={form.control}
        >
          {IdentificationTypes.map((type) => (
            <SelectItem value={type} key={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormfield>
        <CustomFormfield
          fieldType={FormFieldTypes.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeHolder="A1234567"
          control={form.control}
        />
        <CustomFormfield
          fieldType={FormFieldTypes.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-dark-700">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormfield
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to the treatment"
        />
        <CustomFormfield
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to the disclosure of my medical information"
        />
        <CustomFormfield
          fieldType={FormFieldTypes.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I have read and agree to the privacy policy"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;


































































// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Form, FormControl } from "@/components/ui/form";
// import CustomFormfield from "../ui/CustomFormfield";
// import SubmitButton from "../ui/SubmitButton";
// import { PatientFormValidation } from "@/lib/validation";
// import { useRouter } from "next/navigation";
// import { createUser, registerPaient } from "@/lib/actions/patient.actions";
// import { FormFieldTypes } from "./PaitentForm";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import {
//   Doctors,
//   GenderOptions,
//   IdentificationTypes,
//   PatientFormDefaultValues,
// } from "@/constants";
// import { Label } from "../ui/label";
// import { SelectItem } from "../ui/select";
// import Image from "next/image";
// import { FileUploader } from "../ui/FileUploader";
// import { blob } from "stream/consumers";
// import { register } from "module";

// const RegisterForm = ({ user }: { user: User }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof PatientFormValidation>>({
//     resolver: zodResolver(PatientFormValidation),
//     defaultValues: {
//       ...PatientFormDefaultValues,
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
//     setIsLoading(true);
//     console.log("its done register");
//     let formData;
//     if (
//       values.identificationDocument &&
//       values.identificationDocument.length > 0
//     ) {
//      const blobFile = new Blob([values.identificationDocument[0]], {
//        type: values.identificationDocument[0].type,
//      });
//       formData = new FormData();
//       formData.append("blobFile", blobFile);
//       formData.append("fileName", values.identificationDocument[0].name);
//     }
//     try {
//       console.log("its done register");
//         const patientData = {
//           userId: user.$id,
//           name: values.name,
//           email: values.email,
//           phone: values.phone,
//           birthDate: new Date(values.birthDate),
//           gender: values.gender,
//           address: values.address,
//           occupation: values.occupation,
//           emergencyContactName: values.emergencyContactName,
//           emergencyContactNumber: values.emergencyContactNumber,
//           primaryPhysician: values.primaryPhysician,
//           insuranceProvider: values.insuranceProvider,
//           insurancePolicyNumber: values.insurancePolicyNumber,
//           allergies: values.allergies,
//           currentMedication: values.currentMedication,
//           familyMedicalHistory: values.familyMedicalHistory,
//           pastMedicalHistory: values.pastMedicalHistory,
//           identificationType: values.identificationType,
//           identificationNumber: values.identificationNumber,
//           identificationDocument: values.identificationDocument
//             ? formData
//             : undefined,
//           privacyConsent: values.privacyConsent,

//           // ...values,
//           // userId:user.$id,
//           // birthDate: new Date(values.birthDate),
//           // identificationDocument: formData,
//         };

//         const newPatient = await registerPaient(patientData);

//         if(newPatient){
//           router.push(`/patients/${user.$id}/new-appointments`);
//         }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-12 flex-1"
//       >
//         <section className="space-y-4">
//           <h1 className="header">Welcome</h1>
//           <p className="text-dark-600">Let us know more about your self.</p>
//         </section>
//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header text-dark-700">Persnal Information</h2>
//           </div>
//         </section>
//         <CustomFormfield
//           fieldType={FormFieldTypes.INPUT}
//           name="name"
//           label="Fullname"
//           iconSrc="/assets/icons/user.svg"
//           placeHolder="Fullname"
//           iconAlt="user"
//           control={form.control}
//         />
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="email"
//             label="Email"
//             iconSrc="/assets/icons/email.svg"
//             placeHolder="name34@gmail.com"
//             iconAlt="email"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.PHONE_INPUT}
//             name="phone"
//             label="Contact Number"
//             iconSrc="/assets/icons/phone.svg"
//             iconAlt="phone"
//             control={form.control}
//           />
//         </div>
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.DATE_PICKER}
//             name="birthDate"
//             label="Date of Birth"
//             iconSrc="/assets/icons/phone.svg"
//             placeHolder="dd/mm/yyyy"
//             iconAlt="phone"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.SKELETON}
//             control={form.control}
//             name="gender"
//             label="Gender"
//             renderSkeleton={(field) => (
//               <FormControl>
//                 <RadioGroup
//                   className="flex h-11 gap-6 xl:justify-between"
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   {GenderOptions.map((option, i) => (
//                     <div key={option + i} className="radio-group">
//                       <RadioGroupItem value={option} id={option} />
//                       <Label htmlFor={option} className="cursor-pointer">
//                         {option}
//                       </Label>
//                     </div>
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             )}
//           />
//         </div>
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="address"
//             label="address"
//             placeHolder="sector3 Bhubneswar"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="occupation"
//             label="occupation"
//             placeHolder="Engineer"
//             control={form.control}
//           />
//         </div>
//         <div className="flex flex-col gap-6 xl:flex-row">
//           {" "}
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="emergencyContactName"
//             label="emergency Contact Name"
//             placeHolder="Brother , Friend , Wife etc"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.PHONE_INPUT}
//             name="emergencyContactNumber"
//             label="emergency Contact Name"
//             iconSrc="/assets/icons/phone.svg"
//             iconAlt="phone"
//             control={form.control}
//           />
//         </div>

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header text-dark-700">Medical Information</h2>
//           </div>
//         </section>
//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.SELECT}
//             name="primaryPhysician"
//             label="Primary Physician"
//             placeHolder="Select a Physician"
//             control={form.control}
//           >
//             {Doctors.map((doctor) => (
//               <SelectItem value={doctor.name} key={doctor.name}>
//                 <div className="flex items-center gap-2">
//                   <Image
//                     src={doctor.image}
//                     width={32}
//                     height={32}
//                     alt={doctor.name}
//                     className="rounded-full border border-dark-500"
//                   />
//                   <p>{doctor.name}</p>
//                 </div>
//               </SelectItem>
//             ))}
//           </CustomFormfield>
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="insuranceProvider"
//             label="Insurance Provider"
//             placeHolder="Life Care"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.INPUT}
//             name="insurancePolicyNumber"
//             label="Insurance Policy Number"
//             placeHolder="004430934432"
//             control={form.control}
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.TEXTAREA}
//             name="allergies"
//             label="Allergies (if any)"
//             placeHolder="Peanuts, Pollen, etc"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.TEXTAREA}
//             name="currentMedications"
//             label="Current Medications"
//             placeHolder="Paracetamol 40mg, Aspirin 200mg, etc"
//             control={form.control}
//           />
//         </div>

//         <div className="flex flex-col gap-6 xl:flex-row">
//           <CustomFormfield
//             fieldType={FormFieldTypes.TEXTAREA}
//             name="familyMedicalHistory"
//             label="Family Medical History"
//             placeHolder="Diabetes, Hypertension, etc"
//             control={form.control}
//           />
//           <CustomFormfield
//             fieldType={FormFieldTypes.TEXTAREA}
//             name="pastMedicalHistory"
//             label="Past Medical History"
//             placeHolder="Asthma, Heart Attack, etc"
//             control={form.control}
//           />
//         </div>

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header text-dark-700">
//               Identification and Varification
//             </h2>
//           </div>
//         </section>

//         <CustomFormfield
//           fieldType={FormFieldTypes.SELECT}
//           name="identificationType"
//           label="Identification Type"
//           placeHolder="Select an Identification Type"
//           control={form.control}
//         >
//           {IdentificationTypes.map((type) => (
//             <SelectItem value={type} key={type}>
//               {type}
//             </SelectItem>
//           ))}
//         </CustomFormfield>

//         <CustomFormfield
//           fieldType={FormFieldTypes.INPUT}
//           name="identificationNumber"
//           label="Identification Number"
//           placeHolder="A1234567"
//           control={form.control}
//         />

//         <CustomFormfield
//           fieldType={FormFieldTypes.SKELETON}
//           control={form.control}
//           name="identificationDocument"
//           label="Identification Document"
//           renderSkeleton={(field) => (
//             <FormControl>
//               <FileUploader files={field.value} onChange={field.onChange} />
//             </FormControl>
//           )}
//         />

//         <section className="space-y-6">
//           <div className="mb-9 space-y-1">
//             <h2 className="sub-header text-dark-700">Consent and Privacy</h2>
//           </div>
//         </section>
//         <CustomFormfield
//           fieldType={FormFieldTypes.CHECKBOX}
//           control={form.control}
//           name="teatmentConsent"
//           label="I consent to the treatment"
//         />
//         <CustomFormfield
//           fieldType={FormFieldTypes.CHECKBOX}
//           control={form.control}
//           name="disclosuerConsent"
//           label="I consent to the disclosure of my medical information"
//         />
//         <CustomFormfield
//           fieldType={FormFieldTypes.CHECKBOX}
//           control={form.control}
//           name="privacyConsent"
//           label="I have read and agree to the privacy policy"
//         />

//         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//       </form>
//     </Form>
//   );
// };

// export default RegisterForm;
