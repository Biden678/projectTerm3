import React from 'react';

function Create_Form_Product(props) {
    return (
        <div>
            <h2>Create New Contract</h2>
            <form action="">
                <div className="mb-3 mt-3 row">
                    <div className='col-lg-6 col-sm-12'>
                        <label for="Contract_Name">Name Contract:</label>
                        <input type="text" className="form-control" id="Contract_Name" placeholder="Enter Contract Name . . ." name="Contract_Name" />
                    </div>
                    <div className='col-lg-3 col-sm-6'>
                        <label for="VAT">VAT:</label>
                        <input type="number" className="form-control" id="VAT" placeholder=". . . %" name="VAT" />
                    </div>
                    <div className='col-lg-3 col-sm-6'>
                        <label for="Contract_Name">Type Of Insurance:</label>
                        <select className="form-select">
                            <option>Bike</option>
                            <option>Car</option>
                        </select>
                    </div>
                </div>


                <div className="mb-3 mt-3 row">
                    <div className='col-lg-4'>
                        <label for="Limited_Years">Limited Years:</label>
                        <input type="number" className="form-control" id="Limited_Years" placeholder="Enter Limited Number Of Years . . ." name="Limited_Years" />
                    </div>
                    <div className='col-lg-4'>
                        <label for="Level_Responsibility_For_People">Level Responsibility For People:</label>
                        <input type="number" className="form-control" id="Level_Responsibility_For_People" placeholder="Level Responsibility For People ($)" name="Level_Responsibility_For_People" />
                    </div>
                    
                    <div className='col-lg-4'>
                        <label for="Level_Responsibility_For_The_Property">Level Responsibility For The Property:</label>
                        <input type="number" className="form-control" id="Level_Responsibility_For_The_Property" placeholder="Level Responsibility For The Property ($)" name="Level_Responsibility_For_The_Property" />
                    </div>
                    
                   
                </div>


                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="done" /> Are You Done ?
                    </label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create_Form_Product;