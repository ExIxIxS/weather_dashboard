import { VIDEO_FILE_NAMES } from 'src/pages/main/components/CityWeatherInfo/components/VideoBackground/constants';

export const getVideoUrl = (weatherId?: number) => {
  const videoUrl = (fileName: string) => `https://videos.pexels.com/video-files/${fileName}.mp4`;

  if (!weatherId || (weatherId > 700 && weatherId !== 800)) {
    return videoUrl(VIDEO_FILE_NAMES.DEFAULT);
  }

  if (weatherId < 300) {
    return videoUrl(VIDEO_FILE_NAMES.THUNDERSTORM);
  }

  if (weatherId < 600) {
    return videoUrl(VIDEO_FILE_NAMES.RAIN);
  }

  if (weatherId < 700) {
    return videoUrl(VIDEO_FILE_NAMES.SNOW);
  }

  if (weatherId === 800) {
    return videoUrl(VIDEO_FILE_NAMES.SUN);
  }
};
