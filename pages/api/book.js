import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  const {
    apartmentId, apartmentTitle, pricePerNight,
    name, email, guests, checkin, checkout,
    nights, subtotal, tax, citytax, total
  } = req.body || {};

  if (!name || !email || !checkin || !checkout) {
    return res.status(400).send("Missing fields");
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.BOOKING_TO || "info@ugurlu-living.de";
  if (!user || !pass) {
    return res.status(500).send("SMTP not configured (set SMTP_USER & SMTP_PASS).");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const subject = `Neue Buchungsanfrage – ${apartmentTitle} (${checkin} → ${checkout})`;
    const text = `Neue Anfrage:
Apartment: ${apartmentTitle} (ID ${apartmentId})
Gast: ${name} (${email}) – Gäste: ${guests}
Zeitraum: ${checkin} bis ${checkout} (${nights} Nächte)

Preis/Nacht: ${pricePerNight} €
Zwischensumme: ${subtotal.toFixed(2)} €
Steuern (19%): ${tax.toFixed(2)} €
Citytax (5,5%): ${citytax.toFixed(2)} €
GESAMT: ${total.toFixed(2)} €

Bitte antworte dem Gast manuell oder richte Stripe später ein.
`;

    await transporter.sendMail({
      from: `"Ugurlu Living" <${user}>`,
      to,
      subject,
      text,
    });

    await transporter.sendMail({
      from: `"Ugurlu Living" <${user}>`,
      to: email,
      subject: "Deine Buchungsanfrage ist eingegangen",
      text: `Hallo ${name},

vielen Dank für deine Buchungsanfrage bei Ugurlu Living.

Apartment: ${apartmentTitle}
Zeitraum: ${checkin} bis ${checkout} (${nights} Nächte)

Gesamt (inkl. Reinigung, Steuern & Citytax): ${total.toFixed(2)} €

Wir melden uns in Kürze mit der Bestätigung.

Herzliche Grüße
Ugurlu Living
`,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Email error");
  }
}
