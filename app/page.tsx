import PaitentForm from "@/components/forms/PaitentForm";


import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
     
     {/* otp verifucation ]]]]]]]]]]]]]]]]]]]]]]]]]]] */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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
