import React from 'react';
import './AddProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddProduct = (data) => {
    console.log(data);
  };

  return (
    <div className="py-4">
      <h1 className="text-center">Add A Product</h1>

      <div className="p-3">
        <Form
          onSubmit={handleSubmit(handleAddProduct)}
          className="add-product-form d-flex flex-column p-4 shadow"
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Product Name </Form.Label>
            <Form.Control {...register('productName')} readOnly type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Product Category </Form.Label>
            <Form.Control {...register('categoryName')} readOnly type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Price </Form.Label>
            <Form.Control {...register('resalePrice')} readOnly type="number" />
          </Form.Group>

          <Form.Label className="fw-semibold"> Condition</Form.Label>
          <Form.Select className="mb-3" aria-label="Default select example">
            <option value="1">Excellent</option>
            <option value="2">Good</option>
            <option value="3">Fair</option>
          </Form.Select>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Phone No </Form.Label>
            <Form.Control
              {...register('phone', {
                required: 'Please enter your phone number',
              })}
              type="number"
            />

            {errors.phone && (
              <small className="text-danger mb-0">
                {errors.phone?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Location </Form.Label>
            <Form.Control
              {...register('location', {
                required: true,
              })}
              type="text"
            />

            {errors.meetingLocation && (
              <small className="text-danger mb-0">
                {errors.meetingLocation?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Purchase Year </Form.Label>
            <Form.Control {...register('yearOfPurchase')} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Description </Form.Label>
            <Form.Control {...register('description')} type="email" />
          </Form.Group>

          <Button
            className="d-block w-100 fw-semibold btn-register"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
