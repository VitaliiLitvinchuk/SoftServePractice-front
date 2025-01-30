import Loader from "..";

interface ILoaderWrapperProps {
    children: React.ReactNode
    visible: boolean,
    loaderClass?: string
}

const LoaderWrapper = ({ children, visible, loaderClass }: ILoaderWrapperProps) => {
    return (
        <div className="w-100 position-relative">
            {
                visible &&
                <Loader className={loaderClass} visible />
            }
            {children}
        </div>
    )
}

export default LoaderWrapper;