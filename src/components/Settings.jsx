import React from "react";

export const Settings = (props) => {
    const { devices, setDeviceId, toggleSettings } = props;

    const handleClick = (device) => {
        setDeviceId(device.deviceId);
        toggleSettings();
    };

    return (
        <div className="modal-bg flex items-center justify-center">
            <div className="bg-neutral-700 w-[500px] p-3 text-neutral-50">
                <div className="border-b-2 mb-3 flex justify-between">
                    <p className="text-xl">Select Video Device</p>
                    <button onClick={toggleSettings}>X</button>
                </div>
                {devices.length > 0 ? (
                    devices.map((device, index) => {
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center mb-3"
                            >
                                <p>{device.label}</p>
                                <button
                                    className="styled-button"
                                    onClick={() => handleClick(device)}
                                >
                                    Select
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No devices detected.</p>
                )}
            </div>
        </div>
    );
};
