import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ClothImage {
  id: number;
  url: string | null;
  postId: number | null;
  clothId: number | null;
}

interface Cloth {
  id: number;
  name: string;
  rating: number;
  isAd: string;
  userId: string | null;
  image: ClothImage[];
}

interface ClothListProps {
  cloths: Cloth[];
}

const ClothList: React.FC<ClothListProps> = ({ cloths }) => {
  return (
    <div className="w-fit h-[730px] grid grid-cols-2 gap-3 overflow-y-scroll">
      {cloths.length ? (
        cloths.map((item) => (
          <Link key={item.id} href={`/item/${item.id}`}>
            <div className="w-[300px] h-[300px] rounded-lg border-black border-2 flex items-center justify-center overflow-hidden relative">
              {item.image[0]?.url ? (
                <Image
                  className="object-cover"
                  src={item.image[0].url}
                  alt={item.name || "Cloth image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <p>Нет изображения</p>
              )}
            </div>
            <p>{item.name}</p>
          </Link>
        ))
      ) : (
        <p>В этом аутфите нет одежды... Очень Странно!</p>
      )}
    </div>
  );
};

export default ClothList;
