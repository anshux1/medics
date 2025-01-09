import { SiteHeader } from "@/components/home/SiteHeader";
import { ReactNode } from "react";

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
