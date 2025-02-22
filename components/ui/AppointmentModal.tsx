'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './button'
import AppointmentForm from '../forms/AppointmentForm'
import App from 'next/app'
import { Appointment } from '@/types/appwrite.types'
  

const AppointmentModal = ({
  type , 
  name,
  patientId,
  userId,
  appointment}:{

  type: 'schedule' | 'cancel',
  name:string,
  patientId:string,
  userId : string,
  appointment?: Appointment
}) => {
    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}> 
  <DialogTrigger asChild>
    <Button variant="ghost" className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>{type}</Button>
  </DialogTrigger>
  <DialogContent className='shad-dialog sm:max-w-md'>
    <DialogHeader className='mb-4 space-y-3'>
      <DialogTitle className='capitalize'>{type}</DialogTitle>
      <DialogDescription>
      Please fill in the following details to <span className={(type==='schedule'?'text-green-500':'text-red-700')}>{type} </span> the appointment with  <span className='text-red-50'>Dr.{name}</span>
      </DialogDescription>
    </DialogHeader>

   <AppointmentForm
       userId={userId}
       patientId={patientId}
       type={type}
       appointment={appointment}
       setOpen={setOpen}
   />





  </DialogContent>
</Dialog>
  )
}

export default AppointmentModal