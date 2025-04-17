import Footer from "@/component/Footer";
import InfoModal from "@/component/InfoModal";
import Navbar from "@/component/Navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <InfoModal/>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}