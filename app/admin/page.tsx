import {columns} from '@/components/tables/columns'
import {DataTable} from '@/components/tables/DataTable'
import StatCard from '@/components/ui/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appoitment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'






const Admin = async () => {

    const appointments = await getRecentAppointmentList();
   

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
     <header className='admin-header'>
      <Link href='/' className='cursor-pointer'>
      <Image 
       src= '/assets/icons/logo-full.svg'
       width={162}
       height={32}
       alt='home logo'
       className='h-8 w-fit'
       />
      </Link>
      <p className='text-16-semibold'>Admin Dashboard</p>
     </header>
     
     <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>
            Welcome to the Admin Dashboard 👋
          </h1>
          <p className='text-dark-600'>Start the day with managing new appointments </p>
        </section>

      <section className='admin-stat'>
          <StatCard 
            type='appointments'
            count={appointments.scheduledCount}
            lable='Scheduled Appointments'
            icon="assets/icons/appointments.svg"
          />
          <StatCard 
            type='pending'
            count={appointments.pendingCount}
            lable='Pending Appointments'
            icon="assets/icons/pending.svg"
          />
          <StatCard 
            type='cancelled'
            count={appointments.cancelledCount}
            lable='Canclled Appointments'
            icon="assets/icons/cancelled.svg"
           />

      </section>

      <DataTable columns={columns} data={appointments.documents}/>
      
     </main>

      </div>
  )
}

export default Admin