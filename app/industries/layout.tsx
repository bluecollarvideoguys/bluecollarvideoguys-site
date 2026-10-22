import "../v02/v02.css";
import { v02Body, v02Display } from "@/lib/v02-fonts";

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${v02Display.variable} ${v02Body.variable} v02-root min-h-screen`}>
      {children}
    </div>
  );
}
