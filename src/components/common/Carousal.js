import React, { useEffect, useState } from "react";
import { FullLoading } from "./Loader";

export default function Carousal({ images, control, title = "" }) {
    const [shown, setShown] = control;
    const [opacity, setOpacity] = useState(0);
    const [visibility, setVisibility] = useState("invisible");
    const [currentImage, setCurrentImage] = useState(0);

    const [imageOpacity, setImageOpacity] = useState(1);
    const [animationRunning, setAnimationRunning] = useState(false);
    const [loaded, setLoaded] = useState([images.map((el) => false)]);

    const initTransitionDuration = 300;
    const transitionDuration = 200;
    const timerInterval = 5000;

    useEffect(() => {
        if (shown) {
            setVisibility("visible");
            setOpacity(1);
        } else {
            setOpacity(0);
            setTimeout(() => {
                setVisibility("invisible");
                setCurrentImage(0);
            }, initTransitionDuration);
        }
    }, [shown, initTransitionDuration]);

    useEffect(() => {
        if (shown && images.length > 1) {
            const id = setInterval(nextImage, timerInterval);
            return () => {
                clearInterval(id);
            };
        }
    }, [shown, images, timerInterval, transitionDuration]);

    useEffect(() => {
        if (shown && images.length > 1) {
            console.log("add listener");
            document.addEventListener("keydown", handleKeyPress);
            return () => {
                console.log("remove listener");
                document.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [shown]);

    function previousImage() {
        if (animationRunning) return;
        setAnimationRunning(true);
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImage((c) => (c == 0 ? images.length - 1 : c - 1));
            setImageOpacity(1);
            setAnimationRunning(false);
        }, transitionDuration);
    }

    function loadImage(i) {
        if (animationRunning) return;
        setAnimationRunning(true);
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImage(i);
            setImageOpacity(1);
            setAnimationRunning(false);
        }, transitionDuration);
    }

    function nextImage() {
        if (animationRunning) return;
        setAnimationRunning(true);
        setImageOpacity(0);
        setTimeout(() => {
            setCurrentImage((c) => (c + 1) % images.length);
            setImageOpacity(1);
            setAnimationRunning(false);
        }, transitionDuration);
    }

    function handleKeyPress(e) {
        switch (e.key) {
            case "ArrowLeft":
                previousImage();
                break;
            case "ArrowRight":
                nextImage();
                break;
            case "Escape":
                setShown(false);
                break;
        }
    }

    function loadHandler(num) {
        const newLoaded = [...loaded];
        newLoaded[num] = true;
        setLoaded(newLoaded);
    }

    if (!images || images.length < 1) {
        return null;
    }

    return (
        <div
            onKeyDown={handleKeyPress}
            className={`${visibility} transition ease-in-out duration-${initTransitionDuration} fixed top-0 left-0 max-h-screen h-screen w-full bg-black opacity-${opacity}`}>
            <div className="relative flex flex-col items-center justify-center w-full h-full py-2">
                <div className="absolute top-0 text-shadow text-2xl tracking-wide md:text-4xl text-white pt-5 text-center">
                    {title}
                </div>
                {!loaded[currentImage] && (
                    <div className="absolute">
                        <FullLoading color="none" />
                    </div>
                )}
                <img
                    onLoad={() => loadHandler(currentImage)}
                    src={images[currentImage]}
                    alt={title}
                    className={`max-h-full object-cover opacity-${imageOpacity} transition ease-in-out duration-${transitionDuration} ${
                        loaded[currentImage] ? "" : "opacity-0"
                    }`}
                />
                {images.length > 1 && (
                    <div className="absolute flex justify-between items-center w-full h-full">
                        <div className="flex items-center justify-center h-full pl-2 sm:pl-5">
                            <button
                                onClick={previousImage}
                                className="sm:p-5 p-2 flex items-center justify-center rounded-full text-white opacity-50 bg-black">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="chevron-left"
                                    className="w-5 md:w-10 svg-inline--fa fa-chevron-left fa-w-10"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path
                                        fill="currentColor"
                                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center justify-center h-full pr-2 sm:pr-5">
                            <button
                                onClick={nextImage}
                                className="sm:p-5 p-2 flex items-center justify-center rounded-full text-white opacity-50 bg-black">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="chevron-right"
                                    className="w-5 md:w-10 svg-inline--fa fa-chevron-right fa-w-10"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path
                                        fill="currentColor"
                                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                <button
                    onClick={opacity === 1 ? () => setShown(false) : null}
                    className="absolute top-0 right-0 px-5 md:px-10 py-5 text-white">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="times"
                        className="w-5 md:w-8 svg-inline--fa fa-times fa-w-11"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 352 512">
                        <path
                            fill="currentColor"
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </button>
                <div className="absolute bottom-0 flex w-full justify-center pb-5">
                    {images.map((el, i) => (
                        <button
                            onClick={() => loadImage(i)}
                            key={i.toString()}
                            className={`w-4 shadow-xl h-2 mx-2 ${
                                i === currentImage
                                    ? "bg-white"
                                    : "bg-gray-700 opacity-50"
                            } rounded-full focus:outline-none`}></button>
                    ))}
                </div>
            </div>
        </div>
    );
}
