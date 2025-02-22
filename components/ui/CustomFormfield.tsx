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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";
import { Checkbox } from "./checkbox";
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
  const { fieldType, iconSrc, iconAlt, placeHolder, renderSkeleton } = props;
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

    case FormFieldTypes.TEXTAREA:
      return(
        <FormControl>
          <Textarea
          placeholder={placeHolder} 
          {...field}
          className="shad-textarea bg-dark-400"
          disabled={props.disabled}
          />
        </FormControl>
      );  

    case FormFieldTypes.DATE_PICKER:
      return (
        <div className="flex gap-2 rounded-xl border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            height={24}
            width={24}
            className="ml-2 my-1"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={props.showTimeSelect}
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={props.dateFormat}
              placeholderText={placeHolder}
              className="shad-input border-0"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    
      case FormFieldTypes.CHECKBOX:
        return(
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className="checkbox-label">{props.label}</label> 
            </div>
          </FormControl>
        )

     case FormFieldTypes.SELECT:
       return (
         <FormControl>
           <Select onValueChange={field.onChange} defaultValue={field.value}>
             <FormControl className="shad-select-trigger">
               <SelectTrigger>
                 <SelectValue placeholder={placeHolder} />
               </SelectTrigger>
             </FormControl>
             <SelectContent className="shad-select-content">
               {props.children}
             </SelectContent>
           </Select>
         </FormControl>
       ); 

    case FormFieldTypes.SKELETON:
      return(
        renderSkeleton ? renderSkeleton(field) : null
      )  
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
