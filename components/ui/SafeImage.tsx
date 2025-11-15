"use client";

import Image,  {ImageProps}  from "next/image";
import { useState } from "react";


interface SafeImageProps extends Omit<ImageProps, 'src' | 'alt' | 'onError'> {
    primarySrc: string,
    fallbackSrc: string,
    alt: string
}



export const SafeImage = ({ primarySrc, fallbackSrc, alt, ...props}: SafeImageProps) => {

    const [src, setSrc] = useState<string>(primarySrc);
    
    return <Image 
        src={src}
        alt={alt}
        onError={() => setSrc(fallbackSrc)}
        {...props} />
};