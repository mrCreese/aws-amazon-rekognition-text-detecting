import { Inter } from "next/font/google";
import "../../style/globals.css";
import { AppProvider } from "./utility/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Text Detector",
  description: "App per leggere testo nell'imagine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
