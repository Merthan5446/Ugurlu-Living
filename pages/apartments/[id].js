import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { APARTMENTS, FEES } from "@/lib/apartments";

export default function ApartmentPage() {
  const { query } = useRouter();
  const apartment = APARTMENTS.find((a) => a.id === query.id);

  if (!apartment) return <p style={{ padding: 24 }}>Apartment nicht gefunden.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-sm">&larr; Zurück</Link>
      <div className="mt-4 bg-white rounded-2xl shadow p-6">
        <div className="relative w-full h-72 rounded-xl overflow-hidden">
          <Image src={apartment.image} alt={apartment.title} fill className="object-cover" />
        </div>
        <h1 className="text-2xl font-bold mt-4">{apartment.title}</h1>
        <p className="text-gray-600 mt-2">{apartment.description}</p>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-gray-50">
            <p><b>Adresse:</b> {apartment.address}</p>
            <p><b>Betten:</b> {apartment.beds}</p>
            <p><b>Max. Gäste:</b> {apartment.maxGuests}</p>
            <p><b>Check-in:</b> {apartment.checkIn} · <b>Check-out:</b> {apartment.checkOut}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <p><b>Preis/Nacht:</b> {apartment.price} €</p>
            <p><b>Reinigung:</b> {FEES.cleaning} €</p>
            <p><b>Steuern:</b> {Math.round(FEES.tax * 100)}%</p>
            <p><b>Citytax:</b> {FEES.cityTax * 100}%</p>
          </div>
        </div>

        <Link
          href={{ pathname: "/booking", query: { id: apartment.id } }}
          className="mt-6 inline-block px-5 py-3 rounded-xl bg-black text-white font-semibold"
        >
          Zeitraum wählen & buchen
        </Link>
      </div>
    </div>
  );
}
