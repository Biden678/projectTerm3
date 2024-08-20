import React from 'react';

function Create_Form_Service(props) {
    return (
        <div>
            <h2>Create New Type Of The Service</h2>
            <form action="">
                <div className="mb-3 mt-3 row">
                    <div className='col-lg-4 col-sm-6'>
                        <label for="Contract_Name">Type Of Insurance:</label>
                        <select className="form-select">
                            <option>Bike</option>
                            <option>Car</option>
                        </select>
                    </div>
                    <div className='col-lg-8 col-sm-12'>
                        <label for="Name_Service">Name Service:</label>
                        <input type="text" className="form-control" id="Name_Service" placeholder="Enter Name . . ." name="Name_Service" />
                    </div>

                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create_Form_Service;