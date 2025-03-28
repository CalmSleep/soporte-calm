import { VideoProps } from "./types"
import { Iframe, Mp4 } from "./styled"

const Video = ({
    isMp4,
    videoUrl,
    hasAutoPlay,
    hasLoop,
    hasMuted,
    width,
    height,
    borderRadius,
    title,
    objectFit
}: VideoProps) => {
  return (
    <>
        {
        isMp4 ? (
            <Mp4
            title={title}
            src={videoUrl}
            autoPlay={hasAutoPlay}
            loop={hasLoop}
            muted={hasMuted}
            $width={width}
            $height={height}
            $borderRadius={borderRadius}
            controlsList="nodownload"
            $objectFit={objectFit} 
            playsInline
        ></Mp4>
        ) : (
            <Iframe
            title={title}
            $width={width}
            $height={height}
            $borderRadius={borderRadius}
            src={`https://www.youtube.com/embed/${videoUrl}`}
        ></Iframe>
        )
        }
    </>
  );
};

export default Video;