import { VIDEO_FILE_NAMES } from 'src/pages/main/components/CityWeatherInfo/components/VideoBackground/constants';

export const getVideoParams = (weatherId?: number) => {
  const videoUrl = (fileName: string) => `https://videos.pexels.com/video-files/${fileName}.mp4`;

  const defaultParams = {
    url: videoUrl(VIDEO_FILE_NAMES.DEFAULT),
    background:
      'linear-gradient(353deg, rgba(248,255,255,1) 0%, rgba(116,127,133,1) 30%, rgba(74,87,95,1) 46%, rgba(11,14,13,1) 100%)',
  };

  if (!weatherId || (weatherId > 700 && weatherId !== 800)) {
    return defaultParams;
  }

  if (weatherId < 300) {
    return {
      url: videoUrl(VIDEO_FILE_NAMES.THUNDERSTORM),
      background:
        'linear-gradient(350deg, rgba(191,194,201,1) 2%, rgba(5,6,8,1) 55%, rgba(5,6,8,1) 80%)',
    };
  }

  if (weatherId < 600) {
    return {
      url: videoUrl(VIDEO_FILE_NAMES.RAIN),
      background:
        'linear-gradient(157deg, rgba(29,27,12,1) 0%, rgba(25,42,11,1) 77%, rgba(21,54,10,1) 100%)',
    };
  }

  if (weatherId < 700) {
    return {
      url: videoUrl(VIDEO_FILE_NAMES.SNOW),
      background: 'linear-gradient(149deg, rgba(51,91,152,1) 0%, rgba(156,180,208,1) 100%)',
    };
  }

  if (weatherId === 800) {
    return {
      url: videoUrl(VIDEO_FILE_NAMES.SUN),
      background:
        'linear-gradient(149deg, rgba(8,25,32,1) 0%, rgba(39,70,78,1) 83%, rgba(55,92,101,1) 97%)',
    };
  }

  return defaultParams;
};
