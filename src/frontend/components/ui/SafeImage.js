"use client";
import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ src, fallbackSrc = "/images/placeholder.svg", alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt || "Image"}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
}
