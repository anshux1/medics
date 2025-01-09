"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckOnboarding() {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();
  useEffect(() => {
    if (!user?.onBoarded) {
      router.replace("/onboarding");
    } else {
      router.replace("/dashboard");
    }
  }, [session]);
  return <></>;
}
