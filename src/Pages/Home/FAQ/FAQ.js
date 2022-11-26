import React from 'react';
import './FAQ.css';
import Accordion from 'react-bootstrap/Accordion';

const FAQ = () => {
  return (
    <div className="faq-accordion-container">
      <h1>Frequently Asked Questions</h1>
      <Accordion className="w-50 mx-auto accordion-content">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Is free shipping available?</Accordion.Header>

          <Accordion.Body>
            Yes, free ground shipping is available for laptop orders over
            50000TK.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What are your return policies?</Accordion.Header>
          <Accordion.Body>
            We offer a 30 day money back guarantee with 100% satisfaction
            guaranteed. We will be happy to refund or exchange unopened products
            within 30 days. Damaged items can be serviced via manufacturer's
            warranty. Clearance items are not returnable unless damaged during
            the shipping process.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What payments do you accept?</Accordion.Header>
          <Accordion.Body>
            At HomeTech, we accept all major credit cards including Visa,
            MasterCard, American Express, and Discover. We also accept money
            orders, company checks, cashier's checks and PayPal. Company checks
            may take up to 10 business days to clear. We do not accept e-checks,
            but PayPal can be used as an alternative.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            What is the standard turnaround time for getting samples?
          </Accordion.Header>
          <Accordion.Body>
            We strive to meet your targeted request date for samples, and most
            times, samples are available from our inventories of sample stock.
            Turnaround time is measured in days for products that may not be in
            our sample stock program. In some isolated instances typically
            relevant to custom products designed for our customer’s
            applications, special raw materials may need to be brought in for
            samples.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQ;
