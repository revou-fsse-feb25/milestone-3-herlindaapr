"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  return (
      <main>
        <section className="flex w-full h-screen">
          <div>
            <Image src={"/background.png"} 
            alt="Miku"
            fill
            objectFit="cover" />
          </div>
          <div className="w-full h-screen absolute flex flex-col justify-center px-10">
            <h1 className="text-4xl text-teal-950">Miku Mockup Store</h1>
            <p className="text-xl font-semibold text-teal-900">Your next favorite thing is just a tap away!<br/> 
                                                    Find it, love it, or pass it on<br/>
                                                    The cutest way to shop and sell!</p>
          </div>
        </section>
      </main>
    );
  }
