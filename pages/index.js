import Image from "next/image";
import Link from "next/link";
import { APARTMENTS } from "@/lib/apartments";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="p-6 flex items-center justify-between shadow bg-white">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Ugurlu Living" width={48} height={48} />
          <div>
            <h1 className="text-2xl font-bold">Ugurlu Living</h1>
            <p className="text-sm text-gray-500">Direkt buchen · Bremerhaven</p>
          </div>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#wohnungen">Wohnungen</a>
          <Link href="/impressum">Impressum</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section id="wohnungen" className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Unsere Wohnungen</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APARTMENTS.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <Image src={a.image} alt={a.title} fill className="object-cover" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-600">{a.address}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold">{a.price}€ / Nacht</span>
                    <Link href={`/apartments/${a.id}`} className="px-3 py-1.5 rounded-lg bg-black text-white text-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 text-center">
          <Link href="/booking" className="inline-block px-5 py-3 rounded-xl bg-black text-white font-semibold">
            Jetzt buchen
          </Link>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 py-8">
        © {new Date().getFullYear()} Ugurlu Living · Bremerhaven
      </footer>
    </div>
  );
}
