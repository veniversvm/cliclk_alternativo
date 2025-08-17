import { useState, useEffect } from "react";

type ImageItem = string | {
  src: string;
  width: number;
  height: number;
  format: string;
};

interface CarouselProps {
  images: ImageItem[];
  interval?: number; // ms, por defecto 10s
}

export default function Carousel({ images, interval = 10000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  // Avanza automáticamente cada `interval`
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  const renderImage = (img: ImageItem, i: number) => {
    if (typeof img === "string") {
      return <img key={i} src={img} alt={`Imagen ${i + 1}`} className="w-full h-auto rounded-xl shadow" />;
    }
    return (
      <img
        key={i}
        src={img.src}
        alt={`Imagen ${i + 1}`}
        width={img.width}
        height={img.height}
        className="w-full h-auto rounded-xl shadow"
      />
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Imagen activa */}
      <div className="overflow-hidden rounded-xl">
        {renderImage(images[current], current)}
      </div>

      {/* Botón anterior */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ‹
      </button>

      {/* Botón siguiente */}
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${i === current ? "bg-blue-500" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
