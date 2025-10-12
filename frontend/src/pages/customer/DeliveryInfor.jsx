import './DeliveryInfor.css';

const DeliveryInfor = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your Delivery is confirmed");
  };

  return (
    <div className='delivery-infor-page'>
      <div className="container">

        <h2 className="title MainHeading">Delivery Information</h2>

        {/*------------ Form container ------------ */}
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className='input_details'>

              <div className='FName'>
                <input type="text" id="FName" placeholder="First Name" required />
              </div>

              <div className="LName">
                <input type="text" id="LName" placeholder="Last Name" required />
              </div>

              <div className='Address'>
                <input type="text" id="Address" placeholder="Address" required />
              </div>

              <div className="Postal_Code">
                <input type="text" id="Postal_Code" placeholder="Postal Code" required />
              </div>

              <div className="Phone_Number">
                <input type="tel" id="Phone_Number" placeholder="Phone Number" required />
              </div>
            </div>


            {/* ------------ Submit button ------------ */}
            <div className='button'>
              <button type="submit" className="mainButton">Delivery confirmed</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfor;