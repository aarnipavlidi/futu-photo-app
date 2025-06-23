"use client";
import { useEffect, useState } from "react";
import PhotoGrid from "@/components/PhotoGrid";
import type { Photo } from "@/types/index"
import { useSearchParams } from "next/navigation";
import { CustomPagination } from "@/components/CustomPagination";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BlankCanvas } from "@/components/svg/BlankCanvas";
import { getErrorMessage } from "@/lib/utils";

const PHOTOS_PER_PAGE = 20;

export default function HomePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${PHOTOS_PER_PAGE}&_page=${page}`);

        if (!response.ok) {
          throw new Error('Failed to fetch photos. Please try again later.')
        };

        const getAllPhotos = await response.json();

        if (!Array.isArray(getAllPhotos) || getAllPhotos.length === 0) {
          throw new Error('Photos not found. Please try again later.');
        }

        setPhotos(getAllPhotos);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
    };

    fetchPhotos();
  }, [page]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 pl-4">Futu Photo App</h1>
      {
        photos.length === 0 && (
          <Card className="max-w-xl mx-auto mt-16 flex flex-col items-center">
            <CardContent className="flex flex-col items-center">
              <BlankCanvas style={{ maxWidth: 320, width: "100%", height: "auto" }} />
              <CardTitle className="mt-6 text-center">Photos not loaded</CardTitle>
              <p className="text-muted-foreground text-center mt-2">{errorMessage}</p>
            </CardContent>
          </Card>
        )
      }
      {
        photos && photos.length > 0 && (
          <>
            <PhotoGrid photos={photos} />
            <div className="mt-8">
              <CustomPagination currentPage={page} />
            </div>
          </>
        )
      }
    </main>
  );
};