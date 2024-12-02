// import React, { useState, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   // State for the selected form type
//   const [formType, setFormType] = useState('');
  
//   // State to hold the fields for the selected form type
//   const [formFields, setFormFields] = useState([]);
  
//   // State to store user input for the form
//   const [formData, setFormData] = useState({});
  
//   // State to track the progress of form completion
//   const [progress, setProgress] = useState(0);
  
//   // State to hold all submitted form data
//   const [submittedData, setSubmittedData] = useState([]);
  
//   // State to display messages for user actions
//   const [message, setMessage] = useState('');
  
//   // State for form validation errors
//   const [formErrors, setFormErrors] = useState({});

//   // Simulated API responses for different form types
//   const apiResponses = React.useMemo(() => ({
//     userInformation: {
//       fields: [
//         { name: 'firstName', type: 'text', label: 'First Name', required: true },
//         { name: 'lastName', type: 'text', label: 'Last Name', required: true },
//         { name: 'age', type: 'number', label: 'Age', required: false },
//       ],
//     },
//     addressInformation: {
//       fields: [
//         { name: 'street', type: 'text', label: 'Street', required: true },
//         { name: 'city', type: 'text', label: 'City', required: true },
//         { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
//         { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
//       ],
//     },
//     paymentInformation: {
//       fields: [
//         { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
//         { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
//         { name: 'cvv', type: 'password', label: 'CVV', required: true },
//         { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
//       ],
//     },
//   }), []);

//   // Effect to load form fields when form type changes
//   useEffect(() => {
//     if (formType) {
//       setFormFields(apiResponses[formType]?.fields || []); // Fetch fields based on selected form type
//       setFormData({}); // Reset form data
//       setProgress(0); // Reset progress bar
//       setFormErrors({}); // Clear errors
//     }
//   }, [formType, apiResponses]);

//   // Handler for form field changes
//   const handleInputChange = (e, field) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data

//     // Validate field dynamically as the user types
//     let errors = { ...formErrors };
//     if (field.required && !value) {
//       errors[name] = `${field.label} is required`;
//     } else if (field.type === 'number' && isNaN(value)) {
//       errors[name] = `${field.label} must be a valid number`;
//     } else if (field.type === 'text' && value.trim() === '') {
//       errors[name] = `${field.label} cannot be empty`;
//     } else {
//       delete errors[name]; // Remove error when the field is valid
//     }
//     setFormErrors(errors);

//     // Calculate progress based on valid fields
//     const validFields = formFields.filter(
//       (field) => formData[field.name] && !formErrors[field.name]
//     );
//     setProgress((validFields.length / formFields.length) * 100);
//   };

//   // Form submission handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let errors = {};

//     Validate required fields and data types
//     formFields.forEach((field) => {
//       if (field.required && !formData[field.name]) {
//         errors[field.name] = `${field.label} is required`;
//       } else if (field.type === 'number' && isNaN(formData[field.name])) {
//         errors[field.name] = `${field.label} must be a valid number`;
//       } else if (field.type === 'text' && formData[field.name].trim() === '') 
//       {
//         errors[field.name] = `${field.label} cannot be empty`;
//       }
//     });

//     // Set errors and check if form is valid
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors); // Display errors
//       setMessage('Please fill in all required fields correctly.'); // Global error message
//     } else {
//       setFormErrors({}); // Clear previous errors
//       setSubmittedData((prevData) => [...prevData, formData]); // Submit data
//       setFormType(''); // Reset form type
//       setMessage('Form submitted successfully!'); // Success message
//     }
//   };

//   // Delete a row from the submitted data table
//   const handleDelete = (index) => {
//     const updatedData = submittedData.filter((_, i) => i !== index);
//     setSubmittedData(updatedData); // Update state after deletion
//     setMessage('Entry deleted successfully.'); // Deletion feedback
//   };

//   // Edit a row from the submitted data table
//   const handleEdit = (index) => {
//     setFormData(submittedData[index]); // Load data into the form
//     setSubmittedData((prevData) => prevData.filter((_, i) => i !== index)); // Remove the entry being edited
//     setMessage('Editing entry...'); // Feedback message
//   };

//   return (
//     <div className="app">
//       <header>
//         <h1>Dynamic Form</h1>
//       </header>
//       <main>
//         <div className="form-container">
//           {/* Dropdown to select form type */}
//           <label htmlFor="formType">Choose Form Type:</label>
//           <select
//             id="formType"
//             value={formType}
//             onChange={(e) => setFormType(e.target.value)}
//           >
//             <option value="">-- Select --</option>
//             <option value="userInformation">User Information</option>
//             <option value="addressInformation">Address Information</option>
//             <option value="paymentInformation">Payment Information</option>
//           </select>

//           {/* Render form fields dynamically */}
//           {formFields.length > 0 && (
//             <form onSubmit={handleSubmit}>
//               {formFields.map((field) => (
//                 <div key={field.name} className="form-field">
//                   <label htmlFor={field.name}>
//                     {field.label} {field.required && '*'}
//                   </label>
//                   {field.type === 'dropdown' ? (
//                     <select
//                       id={field.name}
//                       name={field.name}
//                       value={formData[field.name] || ''}
//                       onChange={(e) => handleInputChange(e, field)}
//                       required={field.required}
//                     >
//                       <option value="">-- Select --</option>
//                       {field.options.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       id={field.name}
//                       type={field.type}
//                       name={field.name}
//                       value={formData[field.name] || ''}
//                       onChange={(e) => handleInputChange(e, field)}
//                       required={field.required}
//                     />
//                   )}

//                   {/* Display error message if any */}
//                   {formErrors[field.name] && (
//                     <p className="error-message">{formErrors[field.name]}</p>
//                   )}
//                 </div>
//               ))}
//               {/* Progress bar for form completion */}
//               <div className="progress-bar">
//                 <div style={{ width: `${progress}%` }}></div>
//               </div>
//               <button type="submit">Submit</button>
//             </form>
//           )}
//         </div>

//         {/* Display feedback message */}
//         {message && <p className="message">{message}</p>}

//         {/* Display submitted data in tabular format */}
//         {submittedData.length > 0 && (
//           <div className="data-table">
//             <h2>Submitted Data</h2>
//             <table>
//               <thead>
//                 <tr>
//                   {Object.keys(submittedData[0]).map((key) => (
//                     <th key={key}>{key}</th>
//                   ))}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submittedData.map((data, index) => (
//                   <tr key={index}>
//                     {Object.values(data).map((value, i) => (
//                       <td key={i}>{value}</td>
//                     ))}
//                     <td>
//                       <button onClick={() => handleEdit(index)}>Edit</button>
//                       <button onClick={() => handleDelete(index)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//       <footer>
//         <p>&copy; 2024 Dynamic Form App</p>
//       </footer>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formType, setFormType] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);
  const [submittedData, setSubmittedData] = useState([]);
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const apiResponses = React.useMemo(() => ({
    userInformation: {
      fields: [
        { name: 'firstName', type: 'text', label: 'First Name', required: true },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true },
        { name: 'age', type: 'number', label: 'Age', required: false },
      ],
    },
    addressInformation: {
      fields: [
        { name: 'street', type: 'text', label: 'Street', required: true },
        { name: 'city', type: 'text', label: 'City', required: true },
        { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
        { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
      ],
    },
    paymentInformation: {
      fields: [
        { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
        { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
        { name: 'cvv', type: 'password', label: 'CVV', required: true },
        { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
      ],
    },
  }), []);

  useEffect(() => {
    if (formType) {
      setFormFields(apiResponses[formType]?.fields || []);
      setFormData({});
      setProgress(0);
      setFormErrors({});
    }
  }, [formType, apiResponses]);

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (!field.required) return;

    let errors = { ...formErrors };
    if (value.trim() === '' && field.required) {
      errors[name] = `${field.label} is required`;
    } else if (field.type === 'number' && isNaN(value)) {
      errors[name] = `${field.label} must be a valid number`;
    } else {
      delete errors[name];
    }

    setFormErrors(errors);

    const validFields = formFields.filter(
      (f) => f.required && formData[f.name] && !formErrors[f.name]
    );
    setProgress((validFields.length / formFields.filter((f) => f.required).length) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.required && field.type === 'number' && isNaN(formData[field.name])) {
        errors[field.name] = `${field.label} must be a valid number`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setMessage('Please fill in all required fields correctly.');
    } else {
      setFormErrors({});
      setSubmittedData((prevData) => [...prevData, formData]);
      setFormType('');
      setMessage('Form submitted successfully!');
    }
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    setMessage('Entry deleted successfully.');
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setSubmittedData((prevData) => prevData.filter((_, i) => i !== index));
    setMessage('Editing entry...');
  };

  return (
    <div className="app">
      <header>
        <h1>Dynamic Form</h1>
      </header>
      <main>
        <div className="form-container">
          <label htmlFor="formType">Choose Form Type:</label>
          <select
            id="formType"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="userInformation">User Information</option>
            <option value="addressInformation">Address Information</option>
            <option value="paymentInformation">Payment Information</option>
          </select>

          {formFields.length > 0 && (
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div key={field.name} className="form-field">
                  <label htmlFor={field.name}>
                    {field.label} {field.required && '*'}
                  </label>
                  {field.type === 'dropdown' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(e, field)}
                      required={field.required}
                    >
                      <option value="">-- Select --</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(e, field)}
                      required={field.required}
                    />
                  )}

                  {formErrors[field.name] && (
                    <p className="error-message">{formErrors[field.name]}</p>
                  )}
                </div>
              ))}
              <div className="progress-bar">
                <div style={{ width: `${progress}%` }}></div>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>

        {message && <p className="message">{message}</p>}

        {submittedData.length > 0 && (
          <div className="data-table">
            <h2>Submitted Data</h2>
            <table>
              <thead>
                <tr>
                  {Object.keys(submittedData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index}>
                    {Object.values(data).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                    <td>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2024 Dynamic Form App</p>
      </footer>
    </div>
  );
};

export default App;

