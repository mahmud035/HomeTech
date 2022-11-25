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
            <Form.Control
              {...register('name', { required: 'Product Name is required' })}
              type="text"
            />

            {errors.name && (
              <small className="text-danger mb-0">{errors.name?.message}</small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Product Category </Form.Label>
            <Form.Control
              {...register('categoryName', {
                required: 'Category Name is required',
              })}
              type="text"
            />

            {errors.categoryName && (
              <small className="text-danger mb-0">
                {errors.categoryName?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Price </Form.Label>
            <Form.Control
              {...register('resalePrice', { required: 'Price is required' })}
              readOnly
              type="number"
            />

            {errors.resalePrice && (
              <small className="text-danger mb-0">
                {errors.resalePrice?.message}
              </small>
            )}
          </Form.Group>

          <Form.Label className="fw-semibold"> Condition</Form.Label>
          <Form.Select
            {...register('productCondition', {
              required: 'Product condition is required',
            })}
            className="mb-3"
            aria-label="Default select example"
          >
            <option value="1">Excellent</option>
            <option value="2">Good</option>
            <option value="3">Fair</option>
          </Form.Select>
          {errors.productCondition && (
            <small className="text-danger mb-0">
              {errors.productCondition?.message}
            </small>
          )}

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

            {errors.location && (
              <small className="text-danger mb-0">
                {errors.location?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Purchase Year </Form.Label>
            <Form.Control
              {...register('yearOfPurchase', {
                required: 'Purchase year is required',
              })}
              type="text"
            />

            {errors.yearOfPurchase && (
              <small className="text-danger mb-0">
                {errors.yearOfPurchase?.message}
              </small>
            )}
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
