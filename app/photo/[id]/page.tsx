"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Photo } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function PhotoDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (!id) return;

    const fetchPhoto = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
      const data = await response.json();
      // Because json API data does not have images provided, we need to
      // use custom placeholder images instead. And based on what image
      // id we are getting, we will use that to fetch the image. 
      data.url = `https://picsum.photos/id/${id}/600/400`;
      data.thumbnailUrl = `https://picsum.photos/id/${id}/100/100`;
      setPhoto(data);
    };

    fetchPhoto();
  }, [id]);

  if (!photo) return null;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href={`/?page=${page}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-neutral-200 shadow-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700 transition-colors duration-150 mb-4 font-medium w-fit">
        <span className="text-lg">←</span>
        <span>Back to gallery</span>
      </Link>
      <h1 className="text-2xl font-bold mt-4 mb-2">
        {photo.title}
      </h1>
      <div className="relative w-[600px] h-[400px]">
        {
          !imageLoaded && (
            <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md" />
          )
        }
        <Image
          src={photo.url}
          alt={photo.title}
          width={600}
          height={400}
          className={`rounded-lg shadow-md transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-gray-600">Album ID: {photo.albumId}</p>
      <p className="text-gray-600">Photo ID: {photo.id}</p>
    </main>
  );
}
