"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldTypes } from "../forms/PaitentForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
//import E164Number from "react-phone-number-input";

interface Customprops {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeHolder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
}

//type nume45 = E164Number;

// Element which can render all kinds of input for the form
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RenderField = ({ field, props }: { field: any; props: Customprops }) => {
  const { fieldType, iconSrc, iconAlt, placeHolder } = props;
  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "Icon"}
              height={24}
              width={24}
              className="ml-2 my-1"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeHolder}
              {...field}
              className="shad-input border-0"
              value={field.value || ""} // Ensure field.value is not undefined
              onChange={field.onChange}
            />
          </FormControl>
        </div>
      );

    case FormFieldTypes.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeHolder}
            international
            withCountryCallingCode
            value={field.value || ""} // Ensure field.value is not undefined
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormfield = (props: Customprops) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldTypes.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormfield;

// "use client";
// import React from "react";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Control } from "react-hook-form";
// import { FormFieldTypes } from "../forms/PaitentForm";
// import Image from "next/image";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import E164Number from "react-phone-number-input";

// interface Customprops {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   control: Control<any>;
//   fieldType: FormFieldTypes;
//   name: string;
//   label?: string;
//   placeHolder?: string;
//   iconSrc?: string;
//   iconAlt?: string;
//   disabled?: boolean;
//   dateFormat?: string;
//   showTimeSelect?: boolean;
//   children?: React.ReactNode;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   renderSkeleton?: (field: any) => React.ReactNode;
// }
// type nume45 = E164Number;
// //element which can render all kind of input for the form
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const RenderField = ({ field, props }: { field: any; props: Customprops }) => {
//   const { fieldType, iconSrc, iconAlt, placeHolder } = props;
//   switch (fieldType) {
//     case FormFieldTypes.INPUT:
//       return (
//         <div className="flex rounded-md border border-dark-500 bg-dark-400">
//           {iconSrc && (
//             <Image
//               src={iconSrc}
//               alt={iconAlt || "Icon"}
//               height={24}
//               width={24}
//               className="ml-2 my-1"
//             />
//           )}
//           <FormControl>
//             <Input
//               placeholder={placeHolder}
//               {...field}
//               className="shad-input border-0"
//             />
//           </FormControl>
//         </div>
//       );

//     case FormFieldTypes.PHONE_INPUT:
//       return (
//         <FormControl>
//           <PhoneInput
//             defaultCountry="IN"
//             placeholder={placeHolder}
//             international
//             withCountryCallingCode
//             value={field.value as nume45 | undefined}
//             onChange={field.onChange}
//             className="input-phone"
//           />
//         </FormControl>
//       );
//     default:
//       break;
//   }
//   // return <Input type="text" placeholder="Mr.Jerry" />;
// };
// const CustomFormfield = (props: Customprops) => {
//   const { control, fieldType, name, label } = props;
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="flex-1">
//           {fieldType !== FormFieldTypes.CHECKBOX && label && (
//             <FormLabel>{label}</FormLabel>
//           )}
//           <RenderField field={field} props={props} />
//           <FormMessage className="shad-error" />
//         </FormItem>
//       )}
//     />

//     //  <FormField     {/* <FormDescription>This is your public display name.</FormDescription>*/}
//     //    control={control}
//     //    name="username"----------changes
//     //    render={({ field }) => (
//     //      <FormItem>
//     //        <FormLabel>Username</FormLabel>---------changes
//     //        <FormControl>
//     //          <Input placeholder="shadcn" {...field} />
//     //        </FormControl>
//     //        <FormDescription>------------------------changes
//     //          This is your public display name.
//     //        </FormDescription>
//     //        <FormMessage />
//     //      </FormItem>
//     //    )}
//     //  />
//   );
// };

// export default CustomFormfield;
