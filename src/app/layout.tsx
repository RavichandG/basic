import "./globals.css";
import Navbar from "./../../components/NavBar";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className="bg-[#020617] text-slate-200">
        <Navbar />
        {children}
      </body>
    </html>
  );
}