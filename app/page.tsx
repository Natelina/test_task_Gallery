"use client";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Gallery
        numberPictures={7}
      />
    </main>
  );
}
