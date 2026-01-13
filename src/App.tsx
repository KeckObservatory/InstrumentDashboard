import { useState } from 'react'
import './App.css'
import InstrChartList from './instr_chart_list'
import ImageSelector from './ImageSelector'
import { Box, Button } from '@mui/material'
import { useQueryParam, withDefault, type QueryParamConfig } from 'use-query-params';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export const BASE_URL = "https://www3build.keck.hawaii.edu/dashboards/kcwi-temps"
const kcwipanels: PanelMetadata[][] = [
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

export const panels = {
  'kcwi': kcwipanels,
}

export type Instr = keyof typeof panels;

export const InstrParam: QueryParamConfig<Instr, Instr> = {
  encode: (value: Instr) => value,
  decode: (value: string | (string | null)[] | null | undefined): Instr => {
    if (value === 'kcwi') {
      return value as Instr;
    }
    return 'kcwi';
  }
};

interface PanelMetadata {
  title: string;
  panelId: number;
}

export interface ImageAndMetadata extends PanelMetadata {
  url: string;
}

function App() {
  const [selectedPanel, setSelectedPanel] = useState<ImageAndMetadata | null>(null);
  const [instr, setInstr] = useQueryParam<Instr>('instr', withDefault(InstrParam, 'kcwi'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const panelsFlat = panels[instr].flat();

  const handleImageClick = (imageUrl: string, panelId: number) => {
    setSelectedPanel({ title: panelsFlat.find(panel => panel.panelId === panelId)?.title || '', panelId, url: imageUrl });
  };

  const handleClearSelection = () => {
    setSelectedPanel(null);
  };

  const handlePrevious = () => {
    if (selectedPanel === null) return;
    const currentIndex = panelsFlat.findIndex(panel => panel.panelId === selectedPanel.panelId);
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
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Instrument: {instr} 
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          {Object.keys(panels).map((instrKey) => (
            <MenuItem key={instrKey} onClick={() => { setInstr(instrKey as Instr); handleClose(); }}>
              {instrKey}
            </MenuItem>
          ))}
        </Menu>
      </div>
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
