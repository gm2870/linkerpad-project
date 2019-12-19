import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import CreateForm from "../../components/Form/Create";
import axios from "axios";
import { backendBaseUrl } from "../../config";
import { RequestContext } from "../../context/request-context";

//using styled components for styling just as an example
const StyledNavbar = styled(Navbar)`
    background-color: #ee6e73;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

const Nav = () => {
    //using request context in order to handle
    //rerender of products component after modal closes
    const requestContext = useContext(RequestContext);

    // show modal state
    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleSetShowCreate = () => {
        setShowCreate(true);
    };

    //saving upladed image using base 64 method
    const [image, setImage] = useState();
    const createImage = file => {
        let reader = new FileReader();
        reader.onload = e => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const imageHandler = e => {
        createImage(e.target.files[0]);
    };
    // submit the create request
    // will get image from it's state
    const handleCreate = data => {
        const body = {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            image: image
        };
        axios.post(`${backendBaseUrl}/api/products`, body).then(() => {
            // using context to inform products component that it should rerender
            // to get all new products
            requestContext.changeRequestStatus();
            setShowCreate(false);
        });
    };
    return (
        <StyledNavbar className="mr-auto" expand="lg">
            <Container>
                <Row className="w-100">
                    <Navbar.Brand
                        style={{ color: "white" }}
                        className="mr-auto"
                        href="#home"
                    >
                        LINKERPAD
                    </Navbar.Brand>
                    <Button onClick={handleSetShowCreate}>افزودن محصول</Button>
                </Row>
            </Container>
            {showCreate && (
                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <CreateForm
                        handleImage={imageHandler}
                        handleCreate={data => handleCreate(data)}
                        cancelCreate={handleCloseCreate}
                    />
                </Modal>
            )}
        </StyledNavbar>
    );
};

export default Nav;
