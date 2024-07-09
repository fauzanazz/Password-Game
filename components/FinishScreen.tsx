import React from 'react';
import './FinishScreen.css';

interface FinishScreenProps {
    win: string;
    lose: string;
    isVisible: boolean;
}

export const FinishScreen: React.FC<FinishScreenProps> = ({ win, lose, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="finishScreen">
            <div className="message">
                {win ? <p>{win}</p> : <p>{lose}</p>}
            </div>
        </div>
    );
};

export default FinishScreen;