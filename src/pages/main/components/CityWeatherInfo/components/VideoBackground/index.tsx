import { type FC } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

type TProps = {};

export const VideoBackground: FC<TProps> = ({}) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        position: 'absolute',
      }}
    >
      <video
        width={matchesMd ? '100%' : 'auto'}
        height={matchesMd ? '' : 1920}
        controls={false}
        autoPlay
        loop
        preload="metadata"
        muted
      >
        <source
          src="https://videos.pexels.com/video-files/28462207/12391058_1440_2560_60fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

// https://videos.pexels.com/video-files/28157978/12312847_1440_2560_60fps.mp4
// https://videos.pexels.com/video-files/7681534/7681534-hd_1080_1920_24fps.mp4
