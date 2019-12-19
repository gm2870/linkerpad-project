import React, { useState, useEffect, useContext } from "react";
import Card from "../../components/card/card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import UpdateForm from "../../components/Form/Update";
import { backendBaseUrl } from "../../config";
import { RequestContext } from "../../context/request-context";
import axios from "axios";

const Products = props => {
    //products initial state and function
    const [items, setItems] = useState([]);

    const requestContext = useContext(RequestContext);
    // update modal state
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);

    //delete modal state
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);

    // fetching products after one of the dependencies in the array changes
    useEffect(() => {
        axios
            .get(`${backendBaseUrl}/api/products`)
            .then(response => {
                setItems(response.data.products);
            })
            .catch(error => console.log(error));
    }, [showUpdate, showDelete, requestContext.requestIsDone]);

    // viewType state
    const [viewType, setViewType] = useState(1);
    const comfortViewHandler = () => setViewType(1);
    const listViewHandler = () => setViewType(2);

    // 1.show the modal for updateForm
    // 2. storing selected product in order to pass it to the updateForm
    const [selectedItem, setSelectedItem] = useState();
    const updateTheProduct = prod => () => {
        const item = items.find(item => item.id === prod.id);
        setSelectedItem(item);
        setShowUpdate(true);
    };

    const handleDeleteProduct = prod => () => {
        const item = items.find(item => item.id === prod.id);
        setSelectedItem(item);
        setShowDelete(true);
    };
    //1. define an array of products based on items state
    //2. return that array
    const producsList = items.map(p => (
        <Card
            key={p.id}
            name={p.name}
            description={p.description}
            price={p.price}
            src={p.image}
            category={p.category}
            type={viewType}
            openUpdateModal={updateTheProduct(p)}
            deleteProduct={handleDeleteProduct(p)}
        />
    ));
    // handling upladed image using base 64 method
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

    //submit updated data
    const handleUpdate = data => {
        const body = {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            image: image
        };
        axios
            .put(`${backendBaseUrl}/api/products/${selectedItem.id}`, body)
            .then(() => {
                setShowUpdate(false);
            })
            .catch(error => console.log(error));
    };

    // submit delete request
    const deleteProduct = () => {
        axios
            .delete(`${backendBaseUrl}/api/products/${selectedItem.id}`)
            .then(() => {
                setShowDelete(false);
            })
            .catch(error => console.log(error));
    };
    return (
        <Container>
            <h1 className="text-center">محصولات</h1>
            <hr />
            <Row
                className="justify-content-center mb-4"
                style={{ direction: "rtl" }}
            >
                <p className="d-flex align-items-center m-0">نحوه نمایش</p>

                {/* if number of view types increases,then we should map just like products */}
                <Button onClick={comfortViewHandler} className="mx-2 btn-light">
                    comfort
                </Button>
                <Button onClick={listViewHandler} className="btn-light">
                    list
                </Button>
            </Row>
            <Row>{producsList}</Row>
            {showUpdate && (
                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <UpdateForm
                        imageHandler={imageHandler}
                        product={selectedItem}
                        cancelUpdate={handleCloseUpdate}
                        onHandleUpdate={data => handleUpdate(data)}
                    />
                </Modal>
            )}
            {showDelete && (
                <Modal show={showDelete} onHide={handleCloseDelete}>
                    <div className="p-3" style={{ direction: "rtl" }}>
                        <h6 className="text-center">
                            آیا مطمئن هستید این محصول پاک شود؟
                        </h6>
                        <Button
                            onClick={deleteProduct}
                            className="ml-2"
                            variant="primary"
                            type="button"
                        >
                            بله
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            انصراف
                        </Button>
                    </div>
                </Modal>
            )}
        </Container>
    );
};

export default Products;
