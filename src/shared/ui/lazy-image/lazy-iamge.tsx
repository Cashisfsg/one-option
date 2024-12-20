import { useEffect, useRef } from "react";
import { decodeBlurHash } from "fast-blurhash";

interface LazyImageProps extends React.ComponentPropsWithoutRef<"img"> {
    width: number;
    height: number;
    src: string;
    blurHash: string;
    placeholder: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
    placeholder,
    src,
    width,
    height,
    blurHash,
    loading = "lazy",
    fetchPriority = "low",
    decoding = "async",
    ...props
}) => {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        (async () => {
            const pixels = decodeBlurHash(blurHash, width, height);
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            const imageData = new ImageData(pixels, width, height);
            ctx.putImageData(imageData, 0, 0);
            imageRef.current?.setAttribute("src", canvas.toDataURL());

            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageRef.current?.setAttribute("src", src);
                // imageRef.current?.style.setProperty("filter", "blur(1.5rem)");

                // setTimeout(() => {
                imageRef.current?.style.setProperty(
                    "transition",
                    "filter 1000ms ease-in-out"
                );
                imageRef.current?.style.setProperty("filter", "blur(0)");
                // }, 1000);
            };
        })();
    }, [src, width, height, blurHash]);

    return (
        <img
            // src={placeholder}
            width={width}
            height={height}
            ref={imageRef}
            loading={loading}
            fetchPriority={fetchPriority}
            // decoding={decoding   }
            style={{ filter: "blur(1.5rem)" }}
            // style={{
            //     transitionProperty: "filter",
            //     transitionDuration: "1s",
            //     transition: "all",
            //     transitionTimingFunction: "ease-in-out"
            // }}
            // className="object-cover transition-all duration-[3s] ease-in-out"
            {...props}
        />
    );
};
