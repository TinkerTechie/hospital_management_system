import "./globals.css";
import { ReduxProvider } from "./providers";

export const metadata = {
  title: "HospitalNext",
  description: "Hospital Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
