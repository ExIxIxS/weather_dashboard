import { memo, useEffect, useRef, useState, type FC } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { getVideoParams } from 'src/pages/main/components/CityWeatherInfo/components/VideoBackground/utils';
import { FADING_TIMEOUT } from 'src/pages/main/components/CityWeatherInfo/components/VideoBackground/constants';

type TProps = { weatherId?: number };

export const VideoBackground: FC<TProps> = memo(({ weatherId }) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const refVideo = useRef<HTMLVideoElement | null>(null);
  const [isFading, setIsFading] = useState(false);

  const { url: videoUrl, background: videoBackground } = getVideoParams(weatherId);

  useEffect(() => {
    if (refVideo.current) {
      setIsFading(true);

      const timeout = setTimeout(() => {
        if (refVideo.current) {
          refVideo.current.load();
          setIsFading(false);
        }
      }, FADING_TIMEOUT);

      return () => clearTimeout(timeout);
    }
  }, [videoUrl]);

  return (
    <Box
      sx={{
        position: 'absolute',
        background: videoBackground,
        width: '100%',
        minHeight: 1920,
      }}
    >
      <Box
        sx={{
          transition: 'opacity 2s ease',
          opacity: isFading ? 0.3 : 1,
        }}
      >
        <video
          ref={refVideo}
          width={matchesMd ? '100%' : 'auto'}
          height={matchesMd ? '' : 1920}
          controls={false}
          autoPlay
          loop
          preload="metadata"
          muted
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
});
