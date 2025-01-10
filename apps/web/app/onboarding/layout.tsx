import { ReactNode } from "react";

import { HomeSiteHeader } from "@/components/home/HomeSiteHeader";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container h-screen">
        <HomeSiteHeader />
        {children}
      </div>
    </div>
  );
}
