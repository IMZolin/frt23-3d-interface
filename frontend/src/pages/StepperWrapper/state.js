import { useState, useEffect } from "react";

export const defaultValues = {
    files: [],
    averageBeadSave: [],
    extractedPSFSave: [],
    isLoad: false,
    beads: [],
    extractBeads: [],
    centerExtractBeads: [],
    averageBead: [],
    extractedPSF: [],
    beadSize: 0.2,
    psfFiles: [],
    voxelX: 0.089,
    voxelY: 0.089,
    voxelZ: 0.2,
    resolution: [],
    levelBrightness: 1,
    layer: 0,
    layer2: 0,
    isDeleted: false,
    isRightClick: false,
    selectSize: 36, //px size
    tiffType: '8 bit',
    blurType: 'gauss',
    resolutionXY: 0.022,
    resolutionZ: 0.100,
    scale: 5,
    iter: 50,
    activeStep: 0,
    filename: "",
    maximizeIntensity: false,
    makeGaussianBlur: false,
    gaussianBlurCount: 3,
    regularization: 0.0001,
    deconvMethod: "Richardson-Lucy",
    marginTop: 0,
    sourceImage: [],
    resultImage: [],
    resultImageSave: [],
    resolution2: [],
    sourceImageSave: [],
    scaleCompare: 5
};

export const useStateValues = () => {
    //General states
    const [files, addFiles] = useState(defaultValues.files);
    const [isLoad, setIsLoad] = useState(defaultValues.isLoad);
    const [layer, setLayer] = useState(defaultValues.layer);
    const [layer2, setLayer2] = useState(defaultValues.layer2);
    const [scale, setScale] = useState(defaultValues.scale);
    const [scaleCompare, setScaleCompare] = useState(defaultValues.scaleCompare);
    const [filename, setFilename] = useState(defaultValues.filename);
    const [activeStep, setActiveStep] = useState(defaultValues.activeStep);
    const [resolution, setResolution] = useState(defaultValues.resolution);
    const [resolution2, setResolution2] = useState(defaultValues.resolution2);
    const [marginTop, setMarginTop] = useState(defaultValues.marginTop);
    //Bead extraction
    const [beads, setBeads] = useState(defaultValues.beads);
    const [voxelX, setVoxelX] = useState(defaultValues.voxelX);
    const [voxelY, setVoxelY] = useState(defaultValues.voxelY);
    const [voxelZ, setVoxelZ] = useState(defaultValues.voxelZ);
    const [levelBrightness, setLevelBrightness] = useState(defaultValues.levelBrightness);
    const [selectSize, setSelectSize] = useState(defaultValues.selectSize);
    const [isDeleted, setIsDeleted] = useState(defaultValues.isDeleted);
    const [isRightClick, setIsRightClick] = useState(defaultValues.isRightClick);
    const [extractBeads, setExtractBeads] = useState(defaultValues.extractBeads);
    const [centerExtractBeads, setCenterExtractBeads] = useState(defaultValues.centerExtractBeads);
    const [averageBead, setAverageBead] = useState(defaultValues.averageBead);
    const [averageBeadSave, setAverageBeadSave] = useState(defaultValues.averageBead);
    const [extractedPSF, setExtractedPSF] = useState(defaultValues.extractedPSF);
    const [extractedPSFSave, setExtractedPSFSave] = useState(defaultValues.extractedPSFSave);
    const [tiffType, setTiffType] = useState(defaultValues.tiffType);
    const [blurType, setBlurType] = useState(defaultValues.blurType);

    const [resolutionXY, setResolutionXY] = useState(defaultValues.resolutionXY);
    const [resolutionZ, setResolutionZ] = useState(defaultValues.resolutionZ);

    //PSF
    const [beadSize, setBeadSize] = useState(defaultValues.beadSize);
    const [psfFiles, addPsfFiles] = useState(defaultValues.psfFiles);
    const [iter, setIter] = useState(defaultValues.iter);
    const [regularization, setRegularization] = useState(defaultValues.regularization);
    const [deconvMethod, setDeconvMethod] = useState(defaultValues.deconvMethod);

    //Deconvolution
    const [sourceImage, setSourceImage] = useState(defaultValues.sourceImage);
    const [sourceImageSave, setSourceImageSave] = useState(defaultValues.sourceImageSave);
    const [resultImage, setResultImage] = useState(defaultValues.resultImage);
    const [resultImageSave, setResultImageSave] = useState(defaultValues.resultImageSave);
    
    //Neural network
    const [maximizeIntensity, setMaximizeIntensity] = useState(false);
    const [makeGaussianBlur, setMakeGaussianBlur] = useState(false);
    const [gaussianBlurCount, setGaussianBlurCount] = useState(3);

    const tiffTypes = ["8 bit", "16 bit", "32 bit"]

    const blurTypes = ["gauss", "none", "median"]

    const deconvMethods = {
        "Richardson-Lucy":"RL",
        "Richardson-Lucy TM":"RLTMR",
        "Richardson-Lucy TV":"RLTVR"
      };

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handlePrevStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
    };

    const handleSliderBrightnessChange = (e) => {
        const value = e.target.value;
        const maxBrightness = 10;
        const newBrightness = value > maxBrightness ? maxBrightness : value;
        setLevelBrightness(newBrightness);
    };

    const handleGaussianBlurToggle = (e) => {
        const checked = e.target.checked;
        setMakeGaussianBlur(checked);
    };

    const handleDeconvMethodChange = (selectedMethod) => {
        console.log(selectedMethod);
        setDeconvMethod(selectedMethod);
    };

    const handleBlurTypeChange = (selectedType) => {
        setBlurType(selectedType);
        console.log(selectedType);
    };

    const handleTiffTypeChange = (selectedType) => {
        setTiffType(selectedType);
    };

    const handleLayerChange = (e, maxLayer) => {
        const value = e.target.value;
        const newLayer = value > maxLayer ? maxLayer : value;
        setLayer(newLayer);
    };

    const handleLayer2Change = (e, maxLayer) => {
        const value = e.target.value;
        const newLayer = value > maxLayer ? maxLayer : value;
        setLayer2(newLayer);
    };
    
    const drawSquare = (x, y, size, canvasRef) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - size / 2, y - size / 2, size, size);
    };

    const handleAllDrawClick = async (canvasRef, x, y, markBead) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const centerCoords = await markBead(x, y, selectSize);
        drawSquare(centerCoords.x, centerCoords.y, selectSize, canvasRef);
    };

    useEffect(() => {
        console.log(centerExtractBeads, resolution);
    }, [centerExtractBeads, resolution]);

    const handleUndoMark = (e, canvasRef) => {
        e.preventDefault();
        if (centerExtractBeads.length > 0) {
          setCenterExtractBeads((prevCenterExtractBeads) =>
            prevCenterExtractBeads.slice(0, prevCenterExtractBeads.length - 1)
          );
          setIsDeleted(true);  
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            centerExtractBeads.slice(0, -1).forEach((bead) => {
              drawSquare(bead.x, bead.y, selectSize, canvasRef);
            });
          }
        }
      };
    
    const handleClearMarks = (e, canvasRef) => {
        e.preventDefault();
        setCenterExtractBeads([]);
        const canvas = canvasRef.current;
        if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setIsDeleted(true); 
    };

    const handleScaleChange = (e, maxScale) => {
        const value = e.target.value;
        const newScale = value > maxScale ? maxScale : value;
        setScale(newScale);
    
        const marginTopIncrement = 3; 
        const newMarginTop = Math.floor((value - 0.5) / 0.1) * marginTopIncrement;
        setMarginTop(newMarginTop);
      };
    
    return {
        files,
        addFiles,
        isLoad,
        setIsLoad,
        beads,
        setBeads,
        voxelX,
        setVoxelX,
        voxelY,
        setVoxelY,
        voxelZ,
        setVoxelZ,
        levelBrightness,
        layer,
        setLayer,
        setLevelBrightness,
        selectSize,
        setSelectSize,
        isDeleted,
        setIsDeleted,
        resolutionXY,
        setResolutionXY,
        resolutionZ,
        setResolutionZ,
        beadSize,
        setBeadSize,
        scale,
        setScale,
        iter,
        setIter,
        activeStep,
        setActiveStep,
        filename,
        setFilename,
        maximizeIntensity,
        setMaximizeIntensity,
        makeGaussianBlur,
        setMakeGaussianBlur,
        gaussianBlurCount,
        setGaussianBlurCount,
        handleNextStep,
        handlePrevStep,
        handleButtonClick,
        handleGaussianBlurToggle,
        tiffType,
        setTiffType,
        tiffTypes,
        handleTiffTypeChange,
        regularization,
        setRegularization,
        deconvMethod,
        setDeconvMethod,
        handleDeconvMethodChange,
        deconvMethods, 
        blurType,
        setBlurType,
        blurTypes,
        handleBlurTypeChange,
        handleSliderBrightnessChange,
        psfFiles,
        addPsfFiles,
        averageBead,
        setAverageBead,
        extractedPSF,
        setExtractedPSF,
        extractBeads,
        setExtractBeads,
        isRightClick,
        setIsRightClick,
        handleLayerChange,
        centerExtractBeads,
        setCenterExtractBeads,
        drawSquare,
        handleUndoMark,
        handleClearMarks,
        resolution,
        setResolution,
        marginTop,
        setMarginTop,
        handleScaleChange,
        layer2,
        setLayer2,
        handleLayer2Change,
        averageBeadSave,
        setAverageBeadSave,
        extractedPSFSave,
        setExtractedPSFSave,
        sourceImage,
        resultImage,
        resultImageSave,
        setSourceImage,
        setResultImage,
        setResultImageSave,
        resolution2,
        setResolution2,
        sourceImageSave,
        setSourceImageSave,
        scaleCompare,
        setScaleCompare,
        handleAllDrawClick
    };
};
