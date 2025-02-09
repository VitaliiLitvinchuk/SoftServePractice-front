import React, { useCallback, useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import axios from "axios";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ITag } from "./store/types";
import CreateTagModal from "./modal-form/create";
import TagWorkerModal, { ITagErrorType } from "./modal-form";
import roles from "../../../utils/roles";

const operationAccess = roles.ADMIN;

const Tags = React.memo(() => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<ITag | null>(null);
    const [error, setError] = useState<ITagErrorType>({ name: "" });

    const { getTags, updateTag, deleteTag } = useActions('tag');
    const { role } = useTypedSelector(state => state.sign);
    const { tags } = useTypedSelector(state => state.tag);

    useEffect(() => {
        const source = axios.CancelToken.source();

        getTags(source.token);

        return () => {
            source.cancel("Get tags canceled");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteTag(id, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = useCallback((tag: ITag) => {
        setSelected(null);
        updateTag(tag, setError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickEdit = useCallback((tag: ITag) => {
        setSelected(tag);
        setShow(true);
    }, []);

    return (
        <>
            <h1>Tags</h1>
            {
                role?.includes(operationAccess) &&
                <div className="d-flex justify-content-end me-5 my-2">
                    <CreateTagModal />
                </div>
            }
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className="px-4" style={{ width: "40%" }}>Id</th>
                        <th className="px-4" style={{ width: "30%" }}>Name</th>
                        {
                            role?.includes(operationAccess) &&
                            <th className="text-center" style={{ width: "30%" }}>Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {tags.slice(0, 100).map(tag => (
                        <tr key={tag.id}>
                            <td className="text-start"><span className="mx-2">{tag.id}</span></td>
                            <td className="text-start"><span className="mx-2">{tag.name}</span></td>
                            {
                                role?.includes(operationAccess) &&
                                <td>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <button className="btn btn-outline-warning w-100" onClick={() => onClickEdit(tag)}>Edit</button>
                                            </Col>
                                            <Col>
                                                <button className="btn btn-outline-danger w-100" onClick={() => handleDelete(tag.id)}>Delete</button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                selected && show && role?.includes(operationAccess) &&
                <TagWorkerModal show={show} tag={selected} title="Edit tag" error={error} setError={setError} handleClose={() => setShow(false)} handleSubmit={handleEdit} />
            }
        </>
    );
});

export default Tags;