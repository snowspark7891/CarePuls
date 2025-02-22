'use server'
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { ConfigVariable, databases, storage } from "../apwrite/appwrite.config";
import { parseStringify } from "../utils";
import { log } from "console";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (appointment : CreateAppointmentParams) =>{
    try {
             const newAppointment = await databases.createDocument(
              ConfigVariable.PROJECT_DATABASEID,
              ConfigVariable.APPOINTMENT_COLLECTION_ID,
              ID.unique(),
              appointment
             )
            
             console.log('appointment is startecd to redy');
             
            return parseStringify( newAppointment); 
        //   } catch (error) {
        //     console.log(error);
            
        //   }
       // }

    } catch (error) {
        console.log(error);
        
    }
}

export const getAppointment =async (appointmentId:string) => {
    console.log(`Fetching appointment with ID: ${appointmentId}`);
//   console.log(`Using Database ID: ${ConfigVariable.PROJECT_DATABASEID}`);
//   console.log(`Using Collection ID: ${ConfigVariable.APPOINTMENT_COLLECTION_ID}`);
    
  try {
       const appointment = await databases.getDocument(
        ConfigVariable.PROJECT_DATABASEID!,
        ConfigVariable.APPOINTMENT_COLLECTION_ID!,
        appointmentId
       );
        log('we get the appointment, we are in the appointment action',appointment);
       return parseStringify(appointment);
  } catch (error) {
    console.log(error);
    
  }    
}

export const getRecentAppointmentList = async () => {
  try {
     const appointments = await databases.listDocuments(
      ConfigVariable.PROJECT_DATABASEID!,
      ConfigVariable.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]  //get as per desending order of created at
     )

     const initalCounts = {
      scheduledCount:0,
      pendingCount : 0,
      cancelledCount : 0
     }
  
    
    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment)=>{
      if(appointment.status === 'scheduled'){
        acc.scheduledCount ++;
      }else if(appointment.status === 'pending'){
        acc.pendingCount ++;
      }
      else if(appointment.status === 'cancelled'){
        acc.cancelledCount ++;
      }

      return acc;
    },initalCounts) 
     

    const data = {
      totalCount : appointments.total,
      ...counts,
      documents: appointments.documents

    }

    return parseStringify(data);
  } catch (error) {
    console.log(error);
    
  }
}

export const updateAppointment = async ({appointmentId,userId,appointment,type}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      ConfigVariable.PROJECT_DATABASEID!,
      ConfigVariable.APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if(!updatedAppointment){
      throw new Error('Appointment not updated');
    }
    //sms notification

    revalidatePath('/admin')
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
    
  }
}