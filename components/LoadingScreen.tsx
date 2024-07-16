import React from "react";
import {Spinner} from "@nextui-org/spinner";

interface LoadingScreenProps {
    isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center ${isVisible ? "block" : "hidden"}`}>
            {/* Check color and labelColor props for visibility */}
            <Spinner label="Loading Cheat" color="white" labelColor="secondary" />
        </div>
    );
}

export default LoadingScreen;
