import nodemailer from "nodemailer";
import type { OrderData } from "./order-schema";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(data: OrderData) {
  const { officeSize, dailyDrinkers, coffeeChoice, deliveryFrequency, contact } = data;

  const html = `
    <h2>Nová objednávka z coffece.sk</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Veľkosť kancelárie</td><td style="padding:8px;border:1px solid #ddd;">${officeSize}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Denne pije kávu</td><td style="padding:8px;border:1px solid #ddd;">${dailyDrinkers}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Výber kávy</td><td style="padding:8px;border:1px solid #ddd;">${coffeeChoice}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Frekvencia dodania</td><td style="padding:8px;border:1px solid #ddd;">${deliveryFrequency}</td></tr>
    </table>
    <h3>Kontaktné údaje</h3>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Meno</td><td style="padding:8px;border:1px solid #ddd;">${contact.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${contact.company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${contact.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefón</td><td style="padding:8px;border:1px solid #ddd;">${contact.phone}</td></tr>
      ${contact.message ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Správa</td><td style="padding:8px;border:1px solid #ddd;">${contact.message}</td></tr>` : ""}
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    replyTo: contact.email,
    subject: `Nová objednávka – ${contact.company} (${contact.name})`,
    html,
  });
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}) {
  const html = `
    <h2>Nová správa z coffece.sk</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Meno</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefón</td><td style="padding:8px;border:1px solid #ddd;">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${data.company}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Správa</td><td style="padding:8px;border:1px solid #ddd;">${data.message}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO,
    replyTo: data.email,
    subject: `Kontakt – ${data.company} (${data.name})`,
    html,
  });
}
