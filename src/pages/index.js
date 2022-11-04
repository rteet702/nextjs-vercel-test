import Head from "next/head";
import Webcam from "react-webcam";
import { useState, useEffect } from "react";

export default function Home() {
    const [deviceId, setDeviceId] = useState({});
    const [devices, setDevices] = useState([]);

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

    return (
        <div>
            <Head>
                <title>Robert Teets Software</title>
            </Head>
            <Webcam
                videoConstraints={{ deviceId }}
                audio={false}
                height={720}
            />
            <ul>
                {devices.length > 0 ? (
                    devices.map((input, index) => {
                        return (
                            <button
                                onClick={() => changeSource(index)}
                                key={index}
                            >
                                {input.label}
                            </button>
                        );
                    })
                ) : (
                    <li>No Devices Detected</li>
                )}
            </ul>
        </div>
    );
}
