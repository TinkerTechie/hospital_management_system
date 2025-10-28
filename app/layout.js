import "./globals.css";

export const metadata = {
  title: "HospitalNext",
  description: "Hospital Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        This body tag is the main one for the whole site.
        It's minimal so it doesn't interfere with your
        landing page or your main app layout.
      */}
      <body>{children}</body>
    </html>
  );
}
