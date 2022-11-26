import React from 'react';
import useSetTitle from '../../hooks/useSetTitle';
import './Blog.css';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

const Blog = () => {
  useSetTitle('Blog');
  return (
    <div className="accordion-container">
      <h1>Questions & Answer</h1>
      <Accordion className="w-50 mx-auto accordion-content">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            What are the different ways to manage a state in a React
            application?
          </Accordion.Header>

          <Accordion.Body>
            There are four main types of state you need to properly manage in
            your React apps:
            <ol>
              <li>Local state</li>
              <li>Global state</li>
              <li>Server state</li>
              <li>URL state</li>
            </ol>
            <br />
            <strong>Local (UI) state - </strong>Local state is data we manage in
            one or another component.
            <br />
            Local state is most often managed in React using the useState hook.
            <br />
            For example, local state would be needed to show or hide a modal
            component or to track values for a form component, such as form
            submission, when the form is disabled and the values of a form's
            inputs.
            <br />
            <br />
            <strong>Global (UI) state - </strong>Global state is data we manage
            across multiple components.
            <br />
            Global state is necessary when we want to get and update data
            anywhere in our app, or in multiple components at least.
            <br />A common example of global state is authenticated user state.
            If a user is logged into our app, it is necessary to get and change
            their data throughout our application.
            <br />
            <br />
            Sometimes state we think should be local might become global.
            <br />
            <br />
            <strong>Server state - </strong>
            Data that comes from an external server that must be integrated with
            our UI state.
            <br />
            Server state is a simple concept, but can be hard to manage
            alongside all of our local and global UI state.
            <br />
            There are several pieces of state that must be managed every time
            you fetch or update data from an external server, including loading
            and error state. <br />
            Fortunately there are tools such as SWR and React Query that make
            managing server state much easier.
            <br />
            <br />
            <strong>URL state - </strong> Data that exists on our URLs,
            including the pathname and query parameters.
            <br />
            URL state is often missing as a category of state, but it is an
            important one.
            <br />
            In many cases, a lot of major parts of our application rely upon
            accessing URL state. Try to imagine building a blog without being
            able to fetch a post based off of its slug or id that is located in
            the URL!
            <br />
            There are undoubtedly more pieces of state that we could identify,
            but these are the major categories worth focusing on for most
            applications you build.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How does prototypical inheritance work?
          </Accordion.Header>
          <Accordion.Body>
            Every object with its methods and properties contains an internal
            and hidden property known as [[Prototype]]. The Prototypal
            Inheritance is a feature in javascript used to add methods and
            properties in objects. It is a method by which an object can inherit
            the properties and methods of another object. Traditionally, in
            order to get and set the [[Prototype]] of an object, we use
            Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern
            language, it is being set using __proto__.
            <br />
            <strong>Syntax:</strong> ChildObject.__proto__ = ParentObject
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            What is a unit test? Why should we write unit tests?
          </Accordion.Header>
          <Accordion.Body>
            Unit testing is a type of software testing where individual units or
            software components are tested. Its purpose is to validate that each
            unit of code performs as expected.
            <strong>
              A unit can be anything you want it to be — a line of code, a
              method, or a class.
            </strong>
            <br />
            <br />
            To justify any effort in business, there must be a positive impact
            on the bottom line. Here are a few benefits to writing unit tests:
            <br />
            <ul>
              <li>
                Unit tests save time and money. Usually, we tend to test the
                happy path more than the unhappy path. If you release such an
                app without thorough testing, you would have to keep fixing
                issues raised by your potential users. The time to fix these
                issues could've been used to build new features or optimize the
                existing system. Bear in mind that fixing bugs without running
                tests could also introduce new bugs into the system.
              </li>
              <li>
                Well-written unit tests act as documentation for your code. Any
                developer can quickly look at your tests and know the purpose of
                your functions.
              </li>
              <li>It simplifies the debugging process.</li>
              <li>
                Unit testing is an integral part of extreme programming. Extreme
                programming is basically a
                “test-everything-that-can-possibly-break” programming strategy.
              </li>
              <li>
                Unit tests make code reuse easier. If you want to reuse existing
                code in a new project, you can simply migrate both the code and
                tests to your new project, then run your tests to make sure you
                have the desired results.
              </li>
              <li>
                In the testing pyramid, unit tests are faster than integration
                and end-to-end. They are more assertive and return quick
                feedback.
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>React vs. Angular vs. Vue?</Accordion.Header>
          <Accordion.Body>
            <Table bordered className="text-white">
              <thead>
                <tr>
                  <th></th>
                  <th>Angular.js</th>
                  <th>Vue.js</th>
                  <th>React.js</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Performance</td>
                  <td>
                    Performant but may have some issues in the case of
                    overloading
                  </td>
                  <td>Depending on the use case</td>
                  <td>Highly performant</td>
                </tr>
                <tr>
                  <td>Ease of mastering</td>
                  <td>Difficult</td>
                  <td>Relatively easy</td>
                  <td>Easy</td>
                </tr>
                <tr>
                  <td>Ease of usage</td>
                  <td>Depending on the use case</td>
                  <td>Relatively easy</td>
                  <td>Easy</td>
                </tr>
                <tr>
                  <td>Popularity</td>
                  <td>The third-ranked tool</td>
                  <td>The second-ranked tool</td>
                  <td>The most popular web app development tool</td>
                </tr>
                <tr>
                  <td>Most suitable for </td>
                  <td>PWA SPA Enterprise apps</td>
                  <td>
                    Animated websites Idea validation projects Rapid development
                  </td>
                  <td>
                    eCommerce development PWA SPA Idea validation projects
                  </td>
                </tr>
                <tr>
                  <td>Development time</td>
                  <td>Medium</td>
                  <td>Relatively short</td>
                  <td>Short</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Blog;
