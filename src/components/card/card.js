import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import { backendBaseUrl } from "../../config";

const card = props => {
    let CardStyle;
    let lg, md;

    // handling comfort and list view
    // mediaQuery is defined in order to avoid switching on mobile size
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (props.type === 1) {
        CardStyle = styled(Card)``;
        lg = 4;
        md = 6;
    }
    // if list view is selected and mediaquery is not on mobile
    else if (props.type === 2 && !mediaQuery.matches) {
        lg = 12;
        md = 12;
        CardStyle = styled(Card)`
            flex-direction: row !important;
        `;
    } else {
        CardStyle = styled(Card)``;
    }
    return (
        <Col lg={lg} xs={12} md={md}>
            <CardStyle className="mb-4">
                <Card.Img
                    style={{ width: "unset", maxHeight: "250px" }}
                    variant="top"
                    src={`${backendBaseUrl}/images/${props.src}`}
                />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <p>{props.category}</p>
                    <Card.Text>{props.description}</Card.Text>
                    <b className="d-block">{`قیمت : ${props.price} هزارتومان`}</b>
                    <Button
                        className="btn-success mt-3 mx-1"
                        onClick={props.openUpdateModal}
                    >
                        ویرایش
                    </Button>
                    <Button
                        className="btn-danger mt-3"
                        onClick={props.deleteProduct}
                    >
                        حذف
                    </Button>
                </Card.Body>
            </CardStyle>
        </Col>
    );
};
export default card;
