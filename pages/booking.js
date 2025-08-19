import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { APARTMENTS, FEES } from "@/lib/apartments";

function nightsBetween(start, end) {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const ms = e - s;
  if (ms <= 0) return 0;
  return Math.ceil(ms / 86400000);
}

export default function Booking() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 1,
    checkin: "",
    checkout: "",
  });

  const apt = useMemo(
    () => APARTMENTS.find((a) => a.id === router.query.id) || APARTMENTS[0],
    [router.query.id]
  );

  const nights = nightsBetween(form.checkin, form.checkout);
  const subtotal = nights * apt.price + (nights > 0 ? FEES.cleaning : 0);
  const tax = subtotal * FEES.tax;
  const citytax = subtotal * FEES.cityTax;
  const total = subtotal + tax + citytax;

  const canSubmit = form.name && form.email && nights > 0;

  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apartmentId: apt.id,
        apartmentTitle: apt.title,
        pricePerNight: apt.price,
        ...form,
        nights,
        subtotal,
        tax,
        citytax,
        total,
      }),
    });

    if (res.ok) {
      alert("Anfrage gesendet! Du erhältst eine Bestätigung per E-Mail (SMTP konfigurieren).");
      window.location.href = "/";
    } else {
      const t = await res.text();
      alert("Fehler beim Senden: " + t);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <a href="/" className="text-sm">&larr; Zurück</a>
      <h1 className="text-2xl font-bold mt-2">Buchung anfragen</h1>
      <p className="text-gray-600">Apartment: <b>{apt.title}</b></p>

      <form onSubmit={submit} className="mt-4 space-y-3 bg-white p-6 rounded-2xl shadow">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-medium">Name</span>
            <input className="mt-1 w-full rounded-lg border p-2" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">E-Mail</span>
            <input type="email" className="mt-1 w-full rounded-lg border p-2" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Check-in</span>
            <input type="date" className="mt-1 w-full rounded-lg border p-2" value={form.checkin} onChange={(e) => setForm((f) => ({ ...f, checkin: e.target.value }))} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Check-out</span>
            <input type="date" className="mt-1 w-full rounded-lg border p-2" value={form.checkout} onChange={(e) => setForm((f) => ({ ...f, checkout: e.target.value }))} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Gäste</span>
            <input type="number" min="1" max={apt.maxGuests} className="mt-1 w-full rounded-lg border p-2" value={form.guests} onChange={(e) => setForm((f) => ({ ...f, guests: Number(e.target.value) || 1 }))} />
          </label>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg text-sm">
          <div className="flex justify-between"><span>{apt.price}€ × {nights} Nächte</span><span>{(apt.price * nights).toFixed(2)}€</span></div>
          {nights > 0 && <div className="flex justify-between"><span>Reinigung</span><span>{FEES.cleaning.toFixed(2)}€</span></div>}
          <div className="flex justify-between"><span>Steuern (19%)</span><span>{tax.toFixed(2)}€</span></div>
          <div className="flex justify-between"><span>Citytax (5,5%)</span><span>{citytax.toFixed(2)}€</span></div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold"><span>Gesamt</span><span>{total.toFixed(2)}€</span></div>
        </div>

        <button disabled={!canSubmit} className={"px-5 py-3 rounded-xl font-semibold text-white " + (canSubmit ? "bg-black" : "bg-gray-400 cursor-not-allowed")}>
          Anfrage senden
        </button>
        <p className="text-xs text-gray-500">E-Mail-Versand via Gmail SMTP muss als Umgebungsvariable konfiguriert sein.</p>
      </form>
    </div>
  );
}
