import React, { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './BookingModal.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AuthContext } from '../../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BookingModal = ({ show, product, setProduct }) => {
  const { user } = useContext(AuthContext);
  const { name, resalePrice } = product;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleBooking = (data) => {
    // console.log(data);

    const booking = {
      productName: data.productName,
      resalePrice: data.resalePrice,
      userName: data.userName,
      userEmail: data.userEmail,
      phone: data.phone,
      meetingLocation: data.meetingLocation,
    };

    console.log(booking);

    fetch('http://localhost:5000/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          //* Close the Modal
          setProduct(null);
          toast.success('Product Booked Successfully');
        } else {
          setProduct(null);
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
          <AiFillCloseCircle
            size={40}
            onClick={() => setProduct(null)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(handleBooking)}
            className=" d-flex flex-column  py-3"
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Product Name </Form.Label>
              <Form.Control
                {...register('productName')}
                defaultValue={name}
                readOnly
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Price </Form.Label>
              <Form.Control
                {...register('resalePrice')}
                defaultValue={resalePrice}
                readOnly
                type="number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Your Name </Form.Label>
              <Form.Control
                {...register('userName')}
                defaultValue={user?.displayName}
                readOnly
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-semibold">Your Email </Form.Label>
              <Form.Control
                {...register('userEmail')}
                defaultValue={user?.email}
                readOnly
                type="email"
              />
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
              <Form.Label className="fw-semibold">Meeting Location </Form.Label>
              <Form.Control
                {...register('meetingLocation', {
                  required: 'Please enter a location name for meeting',
                })}
                type="text"
              />

              {errors.meetingLocation && (
                <small className="text-danger mb-0">
                  {errors.meetingLocation?.message}
                </small>
              )}
            </Form.Group>

            <Button
              className="d-block w-100 fw-semibold btn-register"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setProduct(null)} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingModal;
