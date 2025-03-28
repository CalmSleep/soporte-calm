import { ImagesProps } from "./types"
import { ImageStyles, StyledLCPImage } from "./styled"

const Images = ({
  children,
  src,
  alt,
  width,
  height,
  objectFit,
  hasTransition,
  borderRadius,
  responsiveMobile,
  widthLCP,
  heightLCP,
  isLazy,
  priority,
  widthHTML,
  heightHTML,
  sizes,
  aspectRatio,
  title,
  placeholder,
  layout,
  blurDataURL,
  fetchpriority,
  fill,
  unoptimized
}: ImagesProps) => {
  return (
    <>
    {
      fill ?
      <StyledLCPImage
        src={src} 
        alt={alt} 
        fill
        $objectFit={objectFit}
        $width={width} 
        $height={height} 
        $borderRadius={borderRadius}
        priority={priority}
        $responsiveMobile={responsiveMobile}
        sizes={sizes}
        layout={layout}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        $aspectRatio={aspectRatio}
        title={title ?? undefined}
        loading={priority ? "eager" : isLazy ? "lazy" : undefined}
        unoptimized={unoptimized ?? false}
      />
      : (widthLCP && heightLCP) ? (
      <StyledLCPImage
        src={src} 
        alt={alt} 
        width={widthLCP}
        height={heightLCP}
        $objectFit={objectFit}
        $width={width} 
        $height={height} 
        $borderRadius={borderRadius}
        priority={priority}
        $responsiveMobile={responsiveMobile}
        sizes={sizes}
        layout={layout}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        $aspectRatio={aspectRatio}
        title={title ?? undefined}
        loading={priority ? "eager" : isLazy ? "lazy" : undefined}
        unoptimized={unoptimized ?? false}
      />
      ) : (
        <ImageStyles 
        src={src} 
        alt={alt} 
        $objectFit={objectFit} 
        $width={width} 
        $height={height} 
        $transition={hasTransition ? "transform 1s ease" : "none"}
        $transform={hasTransition ? "scale(1.05)" : "none"}
        $responsiveMobile={responsiveMobile}
        $borderRadius={borderRadius}
        loading={isLazy ? "lazy" : undefined}
        width={widthHTML}
      /*   fetchPriority={fetchpriority ? "high" : isLazy ? "low" : undefined} */
        height={heightHTML}
        sizes={sizes}
        title={title ?? undefined}
      >
        {children}
      </ImageStyles>
      )
    }
    </>
      
  );
};

export default Images;