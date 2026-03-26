import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coffece — Čerstvá káva pre váš office",
  description:
    "Čerstvo pražená káva z Brazílie doručená priamo do vašej kancelárie. 100% Arabica, bez záväzkov.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
