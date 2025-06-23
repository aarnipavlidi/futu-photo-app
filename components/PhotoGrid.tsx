import PhotoCard from "./PhotoCard"
import type { Photo } from "@/types/index"

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {
        photos.map((photo) => {
          return (
            <PhotoCard key={photo.id} photo={photo} />
          );
        })
      }
    </div>
  );
};
