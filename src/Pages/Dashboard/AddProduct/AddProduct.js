import React, { useContext } from 'react';
import './AddProduct.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const date = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const postedTime = date.toLocaleTimeString('en-us', options);

  const handleAddProduct = (data) => {
    // console.log(data);

    const image = data.image[0];
    // console.log(image);

    //* Image Upload to Imgbb Server
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbKey}`;

    fetch(url, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((imageData) => {
        // console.log(imageData);
        if (imageData.success) {
          const imageURL = imageData?.data?.display_url;

          const product = {
            sellerName: user?.displayName,
            email: user?.email,
            name: data.name,
            categoryName: data.categoryName,
            image: imageURL,
            postedTime: postedTime,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            productCondition: data.productCondition,
            mobileNumber: data.phone,
            location: data.location,
            yearOfPurchase: data.yearOfPurchase,
            yearsOfUse: data.yearsOfUse,
            description: data.description,
            isAdvertise: false,
            salesStatus: 'available',
          };

          // console.log(product);

          fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              if (data.acknowledged) {
                toast.success('Product Added Successfully');
                navigate('/dashboard/myproducts');
              }
            });
        }

        if (imageData.error) {
          toast.info('Please upload .jpg /.jpeg /.png type image');
        }
      });
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

          <Form.Label className="fw-semibold"> Product Category </Form.Label>
          <Form.Select
            {...register('categoryName', {
              required: 'Category Name is required',
            })}
            className="mb-3"
            aria-label="Default select example"
          >
            <option value="HP">HP</option>
            <option value="DELL">DELL</option>
            <option value="ASUS">ASUS</option>
          </Form.Select>

          <Form.Label className="fw-semibold"> Condition</Form.Label>
          <Form.Select
            {...register('productCondition', {
              required: 'Product condition is required',
            })}
            className="mb-3"
            aria-label="Default select example"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </Form.Select>
          {errors.productCondition && (
            <small className="text-danger mb-0">
              {errors.productCondition?.message}
            </small>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Photo</Form.Label>
            <Form.Control
              {...register('image', { required: 'Photo is required' })}
              type="file"
              accept="image/*"
            />

            {errors.image && (
              <p className="text-danger mb-0">{errors.image?.message}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Resale Price </Form.Label>
            <Form.Control
              {...register('resalePrice', { required: 'Price is required' })}
              type="number"
            />

            {errors.resalePrice && (
              <small className="text-danger mb-0">
                {errors.resalePrice?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Original Price </Form.Label>
            <Form.Control
              {...register('originalPrice', { required: 'Price is required' })}
              type="number"
            />

            {errors.originalPrice && (
              <small className="text-danger mb-0">
                {errors.originalPrice?.message}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Years of Use </Form.Label>
            <Form.Control
              {...register('yearsOfUse', {
                required: 'Years of use is required',
              })}
              type="text"
            />

            {errors.yearsOfUse && (
              <small className="text-danger mb-0">
                {errors.yearsOfUse?.message}
              </small>
            )}
          </Form.Group>

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
                required: 'Location is required',
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
            <Form.Control {...register('description')} type="text" />
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
