import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appoitment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({params : {userId}, searchParams} : SearchParamProps) => {
   //the userId is present all over here as per this is a dynamic route under the userId folder
   // now here we can extract hte appointment id and other details from the query params
   //http://localhost:3000/patients/67b88e6400384851cee2/new-appointments/success?appointmentId=67b88ee6002531ab3b64%2Fpage
    // we can extract the appointmentId from the query params
   const appointmentId = searchParams?.appointmentId as string || '';
   const appointment = await getAppointment(appointmentId);
   console.log(appointmentId);

    //we can extract the appointment details from the appointment object
   const Doctor = appointment?.primaryPhysician;
   const schedule = appointment?.schedule;
   const reason = appointment?.reason;
    const status = appointment?.status;
    const note = appointment?.note;
    const cancellationReason = appointment?.cancellationReason;
    console.log(Doctor)
   const doctor = Doctors.find((doc)=> doc.name === Doctor)
   console.log(doctor);
   
  return (
    <div className='flex h-screen max-h-screen px-[5%}'>
      <div className='success-img'>
         <Link href='/'>
         <Image 
         src='/assets/icons/logo-full.svg'
         width={100}
         height={100}
          alt='logo'  
          className='h-10 w-fit'
         />
         </Link>
         <section className='flex flex-col items-center'>
         <Image 
         src='/assets/gifs/success.gif'
         width={300}
         height={200}
          alt='success'
           
         />
         <h2 className='header mb-6 max-w-[600px] text-center'>
               your <span className='text-green-500'> appointment request</span> has been successfully submited
         </h2>

         <p>
          We'll be in touch shortly to confirm your appointment
         </p>
         </section>
         

         <section className='request-details'>
            <p>Reequest appointment details:</p>  
            <div className='flex items-center hap-3'>
            <Image 
                src={doctor?.image!}
                   width={200}
                height={200}
                 alt='doctor'  
                  className='size-6'
                />

             <p className='whitespace-nowrap m-2'>Dr.{doctor?.name!}</p>   
            </div>
            <div className='flex gap-2'>
              <Image
               src='/assets/icons/calendar.svg'
               width={24}
               height={24}
               alt='calendar'
               />
                <p>{formatDateTime(schedule).dateTime}</p>
            </div>
         </section>

         <Button variant="outline" className="shad-primary-btn" asChild>
           <Link href={`/patients/${userId}/new-appointments`}>
           New Appointment
           </Link>
         </Button>

         <p className='copyright'> © 2025 CarePulse</p>
      </div>
      </div>
  )
}

export default Success