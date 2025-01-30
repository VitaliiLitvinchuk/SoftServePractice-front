import { RotatingLines } from "react-loader-spinner";

interface ILoaderProps {
    visible: boolean
    className?: string
}

const Loader = ({ visible, className }: ILoaderProps) => {
    return (
        <div className={className}>
            <RotatingLines
                visible={visible}
                strokeColor="grey"
                width="64"
                strokeWidth="5"
                animationDuration="1"
                ariaLabel="rotating-lines-loading"
            />
        </div>
    );
}

export default Loader;