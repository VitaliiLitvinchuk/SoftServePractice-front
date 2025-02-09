import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";

const InformationMessenger = () => {
    const { showInformationMessenger, message } = useTypedSelector(state => state.informationMessenger);

    const { closeInformationMessenger } = useActions('informationMessenger');

    const handleClose = () => {
        closeInformationMessenger();
    };

    useEffect(() => {
        if (showInformationMessenger) {
            setTimeout(() => {
                closeInformationMessenger();
            }, 30000);
        }
    }, [showInformationMessenger, closeInformationMessenger]);

    return (
        <>
            {showInformationMessenger && (
                <div className="info-panel" onClick={handleClose}>
                    <span>{message}</span>
                </div>
            )}
        </>
    );
};

export default InformationMessenger;


