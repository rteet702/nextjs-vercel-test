import Webcam from "react-webcam";
import { useState, useEffect } from "react";
import { Settings } from "./Settings";

export const WebcamComponent = () => {
    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);
    const [display, setDisplay] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        navigator.mediaDevices
            .enumerateDevices()
            .then((allDevices) => {
                const filtered = allDevices.filter(
                    ({ kind }) => kind === "videoinput"
                );
                setDevices(filtered);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const changeSource = (deviceIndex) => {
        console.log(devices[deviceIndex].deviceId);
        setDeviceId(devices[deviceIndex].deviceId);
    };

    const toggleVideo = () => {
        setDisplay((prev) => !prev);
    };

    const toggleSettings = () => {
        setShowSettings((prev) => !prev);
    };

    return (
        <>
            <div
                className="
            w-[1280px] h-[720px]
            bg-neutral-700
            bg-opacity-40
            border-2
            border-neutral-500
            backdrop:blur-lg
            flex items-center justify-center
            relative
            shadow-lg"
            >
                {/* Show webcam if display is true. */}
                {display === true ? (
                    <Webcam
                        videoConstraints={{ deviceId }}
                        audio={false}
                        height={720}
                        width={1280}
                    />
                ) : (
                    <p>Video not turned on.</p>
                )}
                {/* Button Container */}
                <div className="absolute bottom-3 flex gap-5">
                    <button className="styled-button" onClick={toggleVideo}>
                        {devices.length > 0
                            ? display === true
                                ? "Turn off Video"
                                : "Turn on Video"
                            : "No devices detected."}
                    </button>
                    <button className="styled-button" onClick={toggleSettings}>
                        Settings
                    </button>
                </div>
                {/* Show settings if showSettings is true. */}
            </div>
            {showSettings === true ? (
                <Settings
                    devices={devices}
                    setDeviceId={setDeviceId}
                    toggleSettings={toggleSettings}
                />
            ) : null}
        </>
    );
};
