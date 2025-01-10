"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckOnboarding() {
  // TODO: FIX THIS COMPONENT
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
