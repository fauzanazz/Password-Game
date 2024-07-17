import React from 'react';
import './FinishScreen.css';

interface FinishScreenProps {
    win: string;
    lose: string;
    score: number;
    state: boolean;
    isVisible: boolean;
    onClose: () => void; // Added prop for handling close action
}

export const FinishScreen: React.FC<FinishScreenProps> = ({ win, lose, state, isVisible, onClose , score}) => {

    if (!isVisible) return null;

    return (
        <div className="finishScreen">
            <div className="message">
                {state ? <p>{win}</p> : <p>{lose}</p>}
                <p>Your score is {score}</p>
            </div>
            {/*<button className="closeButton" onClick={onClose}>X</button>*/}
        </div>
    );
};

export default FinishScreen;