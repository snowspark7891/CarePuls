'use client'
import PaitentForm from "@/components/forms/PaitentForm";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import PassKeyModal from "@/components/ui/PassKeyModal";

export default function Home({searchParams}:SearchParamProps) {
   const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {/* otp verifucation ]]]]]]]]]]]]]]]]]]]]]]]]]]] */
        isAdmin && <PassKeyModal/>
      }





      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[896px] flex-1 flex-col py-20">
          <Image
            alt="Mainlogo"
            height={1000}
            width={1000}
            src="/assets/icons/logo-full.svg"
            className="mb-12 h-10 w-fit"
          />
          <PaitentForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-500 lg:text-left">
              © 2025 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-700">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="sideImg"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
