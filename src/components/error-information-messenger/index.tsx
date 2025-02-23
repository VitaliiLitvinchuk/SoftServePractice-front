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
            const timeoutId = setTimeout(() => {
                closeInformationMessenger();
            }, 30000);

            return () => clearTimeout(timeoutId);
        }
    }, [showInformationMessenger, closeInformationMessenger, message]);

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


