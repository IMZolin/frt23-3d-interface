import React from 'react';
import { Button, TextField } from '@mui/material';
import StepperWrapper from '../../StepperWrapper';
import TifCompare from '../../../components/TifCompare';
import TiffStackViewer from '../../../components/TiffStackViewer';
import Dropzone from '../../../components/Dropzone';
import { useStateValues } from '../state';
import ChooseList from '../../../components/ChooseList';
import './stepper.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BeadExtractor = () => {
  const state = useStateValues();
  const steps = ['Load beads', 'Bead parameters', 'Mark beads', 'Average bead', 'Save results'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <Dropzone files={state.files} addFiles={state.addFiles} />
          </>
        );
      case 1:
        return (
          <>
            <div className="row">
              <div className="column-1" style={{ zIndex: 2 }}>
                <div className="slider-container">
                  <label htmlFor="scale-slider">Scale:</label>
                  <input
                    id="scale-slider"
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={state.scale}
                    onChange={state.handleSliderChange}
                  />
                </div>
                <div className="subtitle">Actual bead Size:</div>
                <TextField
                  id="beadSize"
                  variant="outlined"
                  placeholder="Enter a bead size"
                  fullWidth
                  margin="normal"
                  name="beadSize"
                  onChange={(e) => state.setBeadSize(e.target.value)}
                  value={state.beadSize}
                />
                <div className="subtitle">Voxel size:</div>
                <div className="voxel-box">
                  <TextField
                    className="stepper-resolution"
                    id="resolution-x"
                    label="X (nm/pxl)"
                    variant="outlined"
                    placeholder="Enter the resolution in X direction"
                    fullWidth
                    margin="normal"
                    onChange={(e) => state.setVoxelX(e.target.value)}
                    value={state.voxelX}
                  />
                  <TextField
                    className="stepper-resolution"
                    id="resolution-y"
                    label="Y (nm/pxl)"
                    variant="outlined"
                    placeholder=""
                    fullWidth
                    margin="normal"
                    onChange={(e) => state.setVoxelY(e.target.value)}
                    value={state.voxelY}
                  />
                  <TextField
                    className="stepper-resolution"
                    id="resolution-z"
                    label="Z (nm/pxl)"
                    variant="outlined"
                    placeholder=""
                    fullWidth
                    margin="normal"
                    onChange={(e) => state.setVoxelZ(e.target.value)}
                    value={state.voxelZ}
                  />
                </div>
              </div>
              <div className="column-2" style={{ zIndex: 1 }}>
                <div className="images__preview">
                  <TiffStackViewer tiffList={state.files} scale={state.scale} />
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="row">
              <div className="column-1">
                <label htmlFor="brightness-slider">Brightness:</label>
                <input
                  id="brightness-slider"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={state.levelBrightness}
                  onChange={state.handleSliderBrightnessChange}
                />
                <div className="subtitle">Selection Size (px):</div>
                <TextField
                  id="selectSize"
                  variant="outlined"
                  placeholder="Enter a select size"
                  fullWidth
                  margin="normal"
                  name="selectSize"
                  onChange={(e) => state.setSelectSize(e.target.value)}
                  value={state.selectSize}
                />
              </div>
              <div className="column-2" style={{ zIndex: 1 }}>
                <div className="images__preview">
                  <TiffStackViewer
                    tiffList={state.files}
                    scale={state.scale}
                    brightness={state.levelBrightness}
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="row">
              <div className="column-1">
                <div className="slider-container">
                  <label htmlFor="scale-slider">Scale:</label>
                  <input
                    id="scale-slider"
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={state.scale}
                    onChange={state.handleSliderChange}
                  />
                </div>
                <ChooseList
                  className="choose-list"
                  name="Blur type"
                  list={state.blurTypes}
                  selected={state.blurType}
                  onChange={state.handleBlurTypeChange}
                />
                <Button variant="outlined" color="secondary" className="btn-run">
                  Average Bead
                </Button>
              </div>
              <div className="column-2">
                <div className="images__preview">
                  <TifCompare files_1={state.files} files_2={state.files} scale={state.scale} />
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="row">
              <div className="column-1" style={{ zIndex: 2 }}>
                <div className="slider-container">
                  <label htmlFor="scale-slider">Scale:</label>
                  <input
                    id="scale-slider"
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={state.scale}
                    onChange={state.handleSliderChange}
                  />
                </div>
                <TextField
                  id="filename"
                  label="Filename"
                  variant="outlined"
                  placeholder="Enter a file name"
                  fullWidth
                  margin="normal"
                  name="filename"
                  onChange={(e) => state.setFilename(e.target.value)}
                  value={state.filename}
                />
              </div>
              <div className="column-2" style={{ zIndex: 1 }}>
                <div className="images__preview">
                  <TiffStackViewer tiffList={state.files} scale={state.scale} />
                </div>
              </div>
            </div>
          </>
        );
      default:
        return "unknown step";
    }
  }

  return (
    <div>
      <StepperWrapper
        name="Bead extraction"
        stepContent={getStepContent}
        steps={steps}
        handleNextStep={state.handleNextStep}
        handlePrevStep={state.handlePrevStep}
        activeStep={state.activeStep}
        files={state.files}
      />
    </div>
  );
};

export default BeadExtractor;
