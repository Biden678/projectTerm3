import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import React from 'react';


function Insurances(props) {

    const {
        handleFetchInsurances, insurances
    } = useContext(AuthContext);

    useEffect(() => {
        handleFetchInsurances();
    }, [])

    return (
        <div>

            {/* <!-- Project Start --> */}
            <div className="container-fluid project py-5 my-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h5 className="text-primary">All Our Protection</h5>
                        <h1>I need protection:</h1>
                    </div>

                    {insurances.map(insurance => (
                        <div key={insurance.id_Type_Insurance} className="row g-5 mb-5">
                            <div className="col-lg-5 wow fadeIn" data-wow-delay=".3s">
                                <div className="project-item">
                                    <div className="project-img">
                                        <img src="https://i.pinimg.com/564x/9b/ad/d9/9badd9561abd07ec7942d195088378f9.jpg" className="img-fluid w-100 rounded" alt="" />
                                        <div className="project-content">
                                            <a className="text-center btn btn-success" href={`/insurancesPage/${insurance.id_Type_Insurance}`}>
                                                <h4 className="text-secondary">{insurance.type}</h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7">

                                <p style={{ textAlign: 'left', color: 'black' }}>
                                    <i className="fas fa-angle-right text-secondary me-2"></i>{insurance.title}
                                    <br />
                                    <br />
                                    <p style={{ whiteSpace: "pre-wrap" }}>{insurance.description}</p>
                                </p>
                            </div>

                        </div>
                    ))}



                </div>
            </div>
            {/* <!-- Project End --> */}

        </div>
    );
}

export default Insurances;