import React from 'react'
import Image from "next/image";
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';

const NewAppointment = async ({params:{userId}}:SearchParamProps) => {
  //we have to get the paitent also to shecule the appointment for him
  const patient = await getPatient(userId); //server action
  console.log(userId);
  
  // console.log(patient);
  
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[896px] flex-1 justify-between">
        <Image
          alt="Mainlogo"
          height={1000}
          width={1000}
          src="/assets/icons/logo-full.svg"
          className="mb-12 h-10 w-fit"
        />
        <AppointmentForm
         type="create"
         userId={userId}
         patientId = {patient.$id}
        />
        
        <h3 className="justify-items-end text-dark-500 lg:text-left mt-10 py-12">
            © 2025 CarePulse
          </h3>
      </div>
    </section>
    <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="appointment"
      className="side-img max-w-[30%] bg-bottom"
    />
  </div>
  );
}

export default NewAppointment