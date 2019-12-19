import React from "react";
import Card from "../../components/UI/card/card";
const product = props => {
    return <Card type={props.type} name={props.name} />;
};

export default product;
