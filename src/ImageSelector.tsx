import { Box, Button, Typography, IconButton } from '@mui/material';
import type { ImageAndMetadata } from './App';

interface ImageSelectorProps {
  selectedPanel: ImageAndMetadata | null;
  onClear: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export default function ImageSelector({ 
  selectedPanel, 
  onClear, 
  onPrevious, 
  onNext,
  hasPrevious,
  hasNext 
}: ImageSelectorProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        padding: 3,
        marginBottom: 3,
      }}
    >
      {!selectedPanel ? (
        <Typography variant="h6" color="text.secondary">
          Click on a chart below to view it larger
        </Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedPanel.title}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClear}
            >
              Clear Selection
            </Button>
          </Box>

          <Box
            sx={{
              maxWidth: 1200,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <IconButton
              onClick={onPrevious}
              disabled={!hasPrevious}
              sx={{
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f0f0f0' },
                boxShadow: 2,
                fontSize: '2rem',
              }}
            >
              ◀
            </IconButton>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                border: '2px solid #ddd',
                borderRadius: 2,
                padding: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <img
                src={selectedPanel.url}
                alt={`Panel ${selectedPanel.title}.`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '600px',
                  objectFit: 'contain',
                }}
              />
            </Box>

            <IconButton
              onClick={onNext}
              disabled={!hasNext}
              sx={{
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#f0f0f0' },
                boxShadow: 2,
                fontSize: '2rem',
              }}
            >
              ▶
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}
