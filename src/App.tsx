import { useState } from 'react'
import './App.css'
import InstrChartList from './instr_chart_list'
import ImageSelector from './ImageSelector'
import { Box } from '@mui/material'

export const BASE_URL = "https://www3build.keck.hawaii.edu/dashboards/kcwi-temps"
export const panels: PanelMetadata[][] = [
  [
    { 'title': 'Ecab Interior tmp7, rear tmp3', 'panelId': 25 },
    { 'title': 'Blue Autofil Temps', 'panelId': 22 },
    { 'title': 'Red Autofil Temps', 'panelId': 23 },
  ],
  [
    { 'title': 'KRDS Red Detector Temp (target -125C)', 'panelId': 10 },
    { 'title': 'KRDS Red Heater Voltage (V)', 'panelId': 12 },
    { 'title': 'KRGS Red Rough Pressure', 'panelId': 16 },
    { 'title': 'KRVS Red Ion Pump Pressure', 'panelId': 18 },
  ],
  [
    { 'title': 'KT1S tmp1 Blue Detector Temp (Target 163K)', 'panelId': 2 },
    { 'title': 'KBDS Blue Heater Percentage', 'panelId': 4 },
    { 'title': 'KBGS Blue Rough Pressure', 'panelId': 6 },
    { 'title': 'KBVS Blue Ion Pump Pressure', 'panelId': 8 }
  ]

];

interface PanelMetadata {
  title: string;
  panelId: number;
}

export interface ImageAndMetadata extends PanelMetadata {
  url: string;
}

function App() {
  const [selectedPanel, setSelectedPanel] = useState<ImageAndMetadata | null>(null);

  const panelsFlat = panels.flat();

  const handleImageClick = (imageUrl: string, panelId: number) => {
    setSelectedPanel({ title: panelsFlat.find(panel => panel.panelId === panelId)?.title || '', panelId, url: imageUrl });
  };

  const handleClearSelection = () => {
    setSelectedPanel(null);
  };

  const handlePrevious = () => {
    if (selectedPanel === null) return;
    const currentIndex = panelsFlat.findIndex(panel => panel.panelId=== selectedPanel.panelId);
    // Loop to end if at the beginning
    const newIndex = currentIndex > 0 ? currentIndex - 1 : panelsFlat.length - 1;
    const newPanelId = panelsFlat[newIndex].panelId;
    const newImageUrl = `${BASE_URL}?panelId=${newPanelId}`;
    setSelectedPanel({ title: panelsFlat[newIndex].title, panelId: newPanelId, url: newImageUrl });
  };

  const handleNext = () => {
    if (selectedPanel === null) return;
    const currentIndex = panelsFlat.findIndex(panel => panel.panelId === selectedPanel.panelId);
    // Loop to beginning if at the end
    const newIndex = currentIndex < panelsFlat.length - 1 ? currentIndex + 1 : 0;
    const newPanelId = panelsFlat[newIndex].panelId;
    const newImageUrl = `${BASE_URL}?panelId=${newPanelId}`;
    setSelectedPanel({ title: panelsFlat[newIndex].title, panelId: newPanelId, url: newImageUrl });
  };

  const hasPrevious = selectedPanel !== null;
  const hasNext = selectedPanel !== null;

  return (
    <Box>
      <ImageSelector
        selectedPanel={selectedPanel}
        onClear={handleClearSelection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
      <InstrChartList onImageClick={handleImageClick} />
    </Box>
  )
}

export default App
