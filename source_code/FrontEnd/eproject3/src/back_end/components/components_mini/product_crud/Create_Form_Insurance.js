import React from 'react';

function Create_Form_Insurance(props) {
    return (
        <div>
            <h2>Create New Type Of Insurance</h2>
            <form action="">
                <div class="mb-3 mt-3 row">
                    <div className='col-lg-12'>
                        <label for="Type">Name Insurance:</label>
                        <input type="text" class="form-control" id="Type" placeholder="Enter Type  Of Insurance" name="Type" />
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Create_Form_Insurance;