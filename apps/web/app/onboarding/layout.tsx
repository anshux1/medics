import { ReactNode } from "react";

import { SiteHeader } from "@/components/home/SiteHeader";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container h-screen">
        <SiteHeader />
        {children}
      </div>
    </div>
  );
}
