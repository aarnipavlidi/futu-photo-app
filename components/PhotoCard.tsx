"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Photo } from "@/types/index"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSearchParams } from "next/navigation"
import { ImageIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function PhotoCard({ photo }: { photo: Photo }) {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1"
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      {
        !imageError && (
          <Link href={`/photo/${photo.id}?page=${page}`} className="group">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {!imageLoaded && (
                    <Skeleton className="absolute top-0 left-0 w-full h-48" />
                  )}
                  <Image
                    src={`https://picsum.photos/id/${photo.id}/400/300`}
                    alt={photo.title}
                    width={400}
                    height={300}
                    className={`object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onError={() => setImageError(true)}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300" />
                  <Badge variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #{photo.id}
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-neutral-800 transition-colors duration-200">
                    {photo.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      }
      {
        imageError && (
          <div className="group cursor-not-allowed">
            <Card className="overflow-hidden border-0 shadow-md opacity-70">
              <CardContent className="p-0">
                <div className="relative overflow-hidden w-full h-48 flex flex-col items-center justify-center bg-neutral-100">
                  <Avatar className="w-20 h-20 mb-2">
                    <AvatarFallback className="bg-neutral-200">
                      <ImageIcon className="w-8 h-8 text-neutral-400" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-neutral-500 text-base font-semibold">Image not found</span>
                  <span className="text-neutral-400 text-xs mt-1">This photo is unavailable or missing.</span>
                  <Badge variant="secondary" className="absolute top-2 right-2 opacity-100 transition-opacity duration-300">
                    #{photo.id}
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-neutral-400 line-clamp-2">
                    {photo.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }
    </>
  );
};