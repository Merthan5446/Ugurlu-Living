import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="p-4 bg-white shadow flex items-center">
        <Image src="/logo.png" alt="Ugurlu Living" width={50} height={50} />
        <h1 className="ml-4 text-xl font-bold">Ugurlu Living</h1>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Unsere Ferienwohnungen</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-4">
            <Image src="/wohnung1.jpg" alt="Wohnung 1" width={500} height={300} className="rounded"/>
            <h3 className="mt-2 text-lg font-semibold">Wohnung am Meer</h3>
            <p>Gemütliche Wohnung mit Blick aufs Meer. Ideal für 2-4 Personen.</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <Image src="/wohnung2.jpg" alt="Wohnung 2" width={500} height={300} className="rounded"/>
            <h3 className="mt-2 text-lg font-semibold">Stadtwohnung</h3>
            <p>Moderne Wohnung im Herzen der Stadt. Perfekt für Paare oder Geschäftsreisen.</p>
          </div>
        </div>
      </main>
    </div>
  );
}