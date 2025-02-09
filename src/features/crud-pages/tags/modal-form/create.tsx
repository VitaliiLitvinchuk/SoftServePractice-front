import { useEffect, useRef, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import axios, { CancelTokenSource } from "axios";
import TagWorkerModal, { ITagErrorType } from ".";
import { ITag } from "../store/types";

const CreateTagModal = () => {
    const [tag] = useState<ITag>({ id: "", name: "" });
    const [error, setError] = useState<ITagErrorType>({ name: "" });
    const [show, setShow] = useState(false);
    const createCancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { addTag } = useActions('tag');

    useEffect(() => {
        return () => {
            createCancelTokenRef.current?.cancel("Create tag canceled");
        };
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleSubmit = (tag: ITag) => {
        createCancelTokenRef.current = axios.CancelToken.source();

        addTag(tag, setError, createCancelTokenRef.current?.token);
    }

    return (
        <>
            <div
                className="btn btn-success px-3 py-2"
                onClick={handleShow}>
                <i className="fa fa-plus"></i>
            </div>
            <TagWorkerModal show={show} tag={tag} title='Create tag' error={error} setError={setError} handleClose={handleClose} handleSubmit={handleSubmit} />
        </>
    )
}

export default CreateTagModal;