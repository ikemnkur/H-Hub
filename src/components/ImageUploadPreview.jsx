import React, { useState, useRef, useEffect } from 'react';

const ImageCanvas = () => {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [xpos, setPosX] = useState(0);
    const [ypos, setPosY] = useState(0); 
    const [moved, setMoved] = useState(0);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const drawImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (image) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, xpos, ypos, image.width * scale, image.height * scale);
            updateOutputImage();
        }
    };

    const handleImageUpload = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleWheel = event => {
        event.preventDefault();
        const newScale = scale + event.deltaY * -0.0005;
        setScale(Math.max(0.01, Math.min(newScale, 200)));
    };

    function handleMouseDown (event) {
        event.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let startX = event.clientX;
        let startY = event.clientY;
        // console.log("Start X: " + startX)
        setMoved(false);

        const handleMouseMove = (moveEvent) => {
            console.log("HandleMouseMove: (" + xpos + " , " + ypos+")");
            const dx = moveEvent.clientX - startX + xpos;
            const dy = moveEvent.clientY - startY + ypos;
            // startX = moveEvent.clientX;
            // startY = moveEvent.clientY;
            setPosX(dx);
            setPosY(dy);

///////////////////////////////
            // console.log("MoveX: " + moveEvent.clientX)
            
            // const imageData = ctx.getImageData(dx, dy, image.width, image.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.putImageData(imageData, 0, 0);
            ctx.drawImage(image, dx, dy, image.width * scale, image.height * scale);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setMoved(true);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const updateOutputImage = () => {
        const canvas = canvasRef.current;
        imageRef.current.src = canvas.toDataURL();
    };

    useEffect(() => {
        drawImage();
    }, [image, scale, moved]);

    return (
        <div>
            <label htmlFor="">Upload Picture: </label>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            <br />
            <br />
            <div style={{display: "flex"}}>
                <div>
                    <span style={{margin: "auto"}}>Crop/Scale Image</span>
                    <br />
                    <canvas
                        ref={canvasRef}
                        width="160"
                        height="160"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        style={{ border: '3px solid black', borderRadius: '5px', margin: '3px' }}
                    /> 
                </div>
                <div>
                    <span style={{margin: "auto"}}>Final Image</span>
                    <br />
                    <img ref={imageRef} alt="Canvas Output" width="160" height="160" style={{ border: '3px solid grey', borderRadius: '5px', margin: '3px' }} />       
                </div>    
            </div>
            
        </div>
    );
};

export default ImageCanvas;
