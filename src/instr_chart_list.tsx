import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { panels, BASE_URL, type Instr, InstrParam } from './App';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';


interface InstrChartListProps {
  onImageClick: (imageUrl: string, panelId: number) => void;
}

export default function InstrChartList({ onImageClick }: InstrChartListProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [ timeRange ] = useQueryParam('timeRange', withDefault(StringParam, '2d'));
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [instr] = useQueryParam<Instr>('instr', withDefault(InstrParam, 'kcwi'));

  const handleImageLoad = (panelId: number) => {
    setLoadedImages((prev: Set<number>) => new Set(prev).add(panelId));
    // Start loading the next image
    setCurrentLoadingIndex((prev: number) => prev + 1);
  };

  const handleImageClick = (imgUrl: string, panelId: number) => {
    onImageClick(imgUrl, panelId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      {
        panels[instr].map((panelGroup, panelGroupIndex) => {
          const images = panelGroup.map((panel, index) => {
            const imgUrl = `${BASE_URL}?panelId=${panel.panelId}&from=${timeRange}`;
            const isLoaded = loadedImages.has(panel.panelId);
            const shouldLoad = index <= currentLoadingIndex;

            return <ImageListItem
              key={panel.panelId}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
              onClick={() => handleImageClick(imgUrl, panel.panelId)}
            >
              {!isLoaded && (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={250}
                  animation="wave"
                />
              )}
              {shouldLoad && (
                <Box
                  sx={{
                    display: isLoaded ? 'block' : 'none',
                  }}
                >
                  <img
                    srcSet={imgUrl}
                    src={imgUrl}
                    height={250}
                    alt={`${panel.title}`}
                    onLoad={() => handleImageLoad(panel.panelId)}
                  />
                </Box>
              )}
              <ImageListItemBar 
                title={panel.title} 
                position="top"
                sx={{
                  height: '32px',
                  '& .MuiImageListItemBar-title': {
                    fontSize: '0.875rem',
                    lineHeight: '32px',
                  }
                }}
              />
            </ImageListItem>
          });

          const nCols = panelGroupIndex === 0 ? 3 : 2
          const height = panelGroupIndex === 0 ? 270 : 520

          const imgList = <ImageList key={panelGroupIndex} sx={{ width: 1500, height }} cols={nCols} rowHeight={250}>
            {images}
          </ImageList>
          return imgList;
        }
      )}
    </Box>
  );
}
