import Webcam from "react-webcam";
import { useState, useEffect } from "react";

export const WebcamComponent = () => {
    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);
    const [display, setDisplay] = useState(false);

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

    return (
        <div
            className="
            w-[1280px] h-[720px]
            bg-neutral-700
            flex items-center justify-center
            mx-auto
            relative"
        >
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
            <div className="absolute bottom-5 flex gap-5">
                <button className="styled-button" onClick={toggleVideo}>
                    {devices.length > 0
                        ? display === true
                            ? "Turn off Video"
                            : "Turn on Video"
                        : "No devices detected."}
                </button>
                <button className="styled-button">Settings</button>
            </div>
        </div>
    );
};
