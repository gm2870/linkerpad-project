import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useForm from "react-hook-form";

const UpdateForm = props => {
    // using react hook form
    const { register, handleSubmit, errors } = useForm();
    // getting the selected product through props and storing it in a product state
    const [product, setProduct] = useState(props.product);
    // initial state of input elements inside the form
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

    // trying to get the last meangingful part of the src string in order to show in the form
    // const formatedImageText = () => {
    //     const myRegexp = /media\/(.*)/;
    //     const match = myRegexp.exec(props.product.image);
    //     return match[1];
    // };

    // although react hook form handles passing the data, we need to define change handler because we need
    // initial value of each input and to be able to change that value a event listener for input is needed
    const inputChangeHandler = (event, name) => {
        const newObj = { ...product };
        newObj[name] = event.target.value;
        setProduct(newObj);
    };
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
                value={product[formEl.config.name]}
                ref={register({ required: true })}
                placeholder={formEl.config.placeholder}
                onChange={event => inputChangeHandler(event, formEl.id)}
            />
            {errors[formEl.config.name] && <p>این فیلد الزامی است</p>}
        </Form.Group>
    ));

    return (
        <Form
            onSubmit={handleSubmit(props.onHandleUpdate)}
            encType="multipart/form-data"
        >
            {formEls}
            <Form.Group>
                <Form.Label htmlFor="inputFile">انتخاب عکس</Form.Label>

                <Form.Control
                    id="inputFile"
                    name="image"
                    type="file"
                    ref={register}
                    onChange={props.imageHandler}
                />
            </Form.Group>
            <Button className="ml-2" variant="primary" type="submit">
                ویرایش
            </Button>
            <Button variant="secondary" onClick={props.cancelUpdate}>
                انصراف
            </Button>
        </Form>
    );
};
export default UpdateForm;
