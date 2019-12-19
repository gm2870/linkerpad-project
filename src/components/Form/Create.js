import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "react-hook-form";

const CreateForm = props => {
    const { register, handleSubmit, errors } = useForm();
    const form = useState({
        name: {
            name: "name",
            type: "text",
            placeholder: "نام محصول",
            value: ""
        },

        price: {
            name: "price",
            type: "number",
            placeholder: "قیمت",
            value: ""
        },

        description: {
            name: "description",
            type: "text",
            placeholder: "توضیحات",
            value: ""
        },

        category: {
            name: "category",
            type: "text",
            placeholder: "دسته بندی",
            value: ""
        }
    })[0];

    // creating an array of input elements from form state that is an object
    const formEelementsArray = [];
    for (const key in form) {
        formEelementsArray.push({
            id: key,
            config: form[key]
        });
    }
    // creating input elements except image input that will be renderd
    // we will render image input seperately because it can not accept a value property
    const formEls = formEelementsArray.map(formEl => (
        <Form.Group key={formEl.id}>
            <Form.Label>{formEl.config.placeholder}</Form.Label>
            <Form.Control
                name={formEl.config.name}
                type={formEl.config.type}
                ref={register({ required: true })}
                placeholder={formEl.config.placeholder}
            />
            {errors[formEl.config.name] && (
                <p style={{ color: "red" }}>این فیلد الزامی است</p>
            )}
        </Form.Group>
    ));

    return (
        <Form onSubmit={handleSubmit(props.handleCreate)}>
            {formEls}
            <Form.Group>
                <Form.Label htmlFor="inputFile">انتخاب عکس</Form.Label>
                <Form.Control
                    id="inputFile"
                    name="image"
                    type="file"
                    ref={register({ required: true })}
                    onChange={props.handleImage}
                />
                {errors.name && (
                    <p style={{ color: "red" }}>این فیلد الزامی است</p>
                )}
            </Form.Group>

            <Button className="ml-2" variant="primary" type="submit">
                ذخیره
            </Button>
            <Button variant="secondary" onClick={props.cancelCreate}>
                انصراف
            </Button>
        </Form>
    );
};
export default CreateForm;
