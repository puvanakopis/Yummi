import './DeliveryFormPage.css'; 

const DeliveryFormPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault(); 
    alert("Your Delivery is confirmed"); 
  };
  
  return (
    <div className='DeliveryForm'>
      <div className="DeliveryForm-container">

        {/* Heading */}
        <h2 className="DeliveryForm-title MainHeading">Delivery Information</h2>

        {/* Form container */}
        <div className="DeliveryForm-box">
          <form onSubmit={handleSubmit}>
            <div className='input_details'>

              {/* First Name input */}
              <div className='FName'>
                <input type="text" id="FName" placeholder="First Name" required />
              </div>

              {/* Last Name input */}
              <div className="LName">
                <input type="text" id="LName" placeholder="Last Name" required />
              </div>

              {/* Address input */}
              <div className='Address'>
                <input type="text" id="Address" placeholder="Address" required />
              </div>

              {/* Postal Code input */}
              <div className="Postal_Code">
                <input type="text" id="Postal_Code" placeholder="Postal Code" required />
              </div>

              {/* Phone Number input */}
              <div className="Phone_Number">
                <input type="tel" id="Phone_Number" placeholder="Phone Number" required />
              </div>
            </div>



            {/* Submit button */}
            <div className='DeliveryFormButton'>
              <button type="submit" className="mainButton">Delivery confirmed</button>
            </div>

          </form>
        </div>
        
      </div>
    </div>
  );
};

export default DeliveryFormPage;