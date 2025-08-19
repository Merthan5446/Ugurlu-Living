export const FEES = {
  cleaning: 20,      // Reinigungsgebühr
  tax: 0.19,         // 19% MwSt
  cityTax: 0.055,    // 5,5% Citytax
};

export const APARTMENTS = [
  {
    id: "1",
    slug: "gemuetlich-und-geraumig",
    title: "Gemütlich & geräumiges Apartment",
    description:
      "Für 5 Personen mit 3 Einzelbetten und 1 Doppelbett. Heizung, Handtücher, Bettwäsche, kostenloser Parkplatz an der Straße, Kühlschrank, Küche (Utensilien, Salz, Pfeffer, Töpfe), Waschmaschine, Hygieneartikel (Creme, Shampoo, Zahnbürste, Zahnpasta).",
    price: 65,
    address: "Lindenallee 130, 27572 Bremerhaven",
    maxGuests: 5,
    beds: "3 Einzelbetten + 1 Doppelbett",
    checkIn: "14:00",
    checkOut: "12:00",
    image: "/apt1.jpg",
    images: ["/apt1.jpg"],
  },
  {
    id: "2",
    slug: "schoenes-zimmer-ruhig",
    title: "Schönes Zimmer in ruhiger Gegend",
    description:
      "Apartment für 1 Person, Einzelbett. Heizung, Handtücher, Bettwäsche, kostenloser Parkplatz an der Straße, Kühlschrank, Küche (Utensilien, Salz, Pfeffer, Töpfe), Waschmaschine, Hygieneartikel.",
    price: 45,
    address: "Lindenallee 130, 27572 Bremerhaven",
    maxGuests: 1,
    beds: "1 Einzelbett",
    checkIn: "14:00",
    checkOut: "12:00",
    image: "/apt2.jpg",
    images: ["/apt2.jpg"],
  },
  {
    id: "3",
    slug: "the-cozy-note",
    title: "The Cozy Note – Apartment für 2",
    description:
      "Apartment für 2, Doppelbett. Heizung, Handtücher, Bettwäsche, kostenloser Parkplatz an der Straße, Kühlschrank, Küche (Utensilien, Salz, Pfeffer, Töpfe), Waschmaschine, Hygieneartikel.",
    price: 70,
    address: "Jahnstraße 28, 27568 Bremerhaven",
    maxGuests: 2,
    beds: "1 Doppelbett",
    checkIn: "14:00",
    checkOut: "12:00",
    image: "/apt3.jpg",
    images: ["/apt3.jpg"],
  },
];
