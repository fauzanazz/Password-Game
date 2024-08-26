import React from 'react';
import './FinishScreen.css';

interface FinishScreenProps {
    win: string;
    lose: string;
    state: boolean;
    isVisible: boolean;
    onClose: () => void; // Added prop for handling close action
}

export const FinishScreen: React.FC<FinishScreenProps> = ({ win, lose, state, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="finishScreen">
            <div className="message">
                {state ? <p>{win}</p> : <p>{lose}</p>}
            </div>
        </div>
    );
};

export default FinishScreen;