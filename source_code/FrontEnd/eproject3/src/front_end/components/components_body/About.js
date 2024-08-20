import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import GoogleMapsLink from './GoogleMapsLink';




function About(props) {



    const {
        handleFetchAddresses,
        addresses,
        handleFetchAreas,
        areas
    } = useContext(AuthContext);

    useEffect(() => {
        handleFetchAreas();
        handleFetchAddresses();
    }, []);


    const [filteredAddresses, setFilteredAddresses] = useState([]);
    const [selectedOption, setSelectedOption] = useState('ALL');
    function handleAreaChange() {
        const selectedAreaId = selectedOption;
        if (selectedAreaId === "ALL") {
            setFilteredAddresses(addresses);
        } else {
            const filteredAddresses = addresses.filter(
                (address) => address.id_Area === parseInt(selectedAreaId)
            );
            setFilteredAddresses(filteredAddresses);
        }
    }



    useEffect(() => {
        handleAreaChange();
    }, [selectedOption]);

    const containerStyle = {
        backgroundImage: `url(https://i.pinimg.com/564x/5a/7f/b4/5a7fb489d3625820bca5d3cf633898bf.jpg)`, // Change this to the image you want to use
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    const headerStyle = {
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)',
        fontSize: '400%',
    };
    const selectContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const selectStyle = {
        width: '50%',
        borderRadius: '50px',
        fontSize: '18px',
        textAlign: 'center',

        alignItems: 'center',
    };


    const openGoogleMapsForAddress = (address) => {
        const encodedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };
    return (
        <div>

            {/* <!-- About Start --> */}
            <div className="container-fluid py-5 my-5" style={containerStyle}>
                <div className="container py-5">

                    <div className='row'>
                        <div className='col-lg-12'>
                            <h1 style={headerStyle}>LIST OF BRANCHES</h1>
                        </div>
                        <div className='col-lg-12' style={selectContainerStyle}>
                            {/* Select Dropdown */}
                            {/* <select className="form-select mb-4" style={selectStyle} onChange={(e) => console.log(e.target.value)}>
                                <option value="" disabled selected>
                                    Select an area
                                </option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.nameArea}
                                    </option>
                                ))}
                            </select> */}

                            <select className="form-select mb-4" style={selectStyle} value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="ALL">
                                    All Areas
                                </option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.nameArea}
                                    </option>
                                ))}
                            </select>


                            {/* End Select Dropdown */}
                        </div>
                    </div>


                    <div className="row g-5">

                        <div className="col-lg-6 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".3s">
                            <img src="https://www.aaa.com.vn/catalog/view/theme/default/image/GIOI-THIEU-1-07.svg" className="img-fluid rounded" alt="" style={{ maxWidth: '50%' }} />
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 wow fadeIn" data-wow-delay=".5s" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
                            {filteredAddresses.length > 0 ? filteredAddresses.map((address) => (
                                <div key={address.id}>
                                    <h5 style={{ color: 'white' }} onClick={() => openGoogleMapsForAddress(address.nameAddress)}>{address.nameAddress}</h5>
                                    <hr style={{ color: 'white' }} />
                                </div>
                            )) : addresses.map((address) => (
                                <div key={address.id}>
                                    <h5 style={{ color: 'white' }} onClick={() => openGoogleMapsForAddress(address.nameAddress)}>{address.nameAddress}</h5>
                                    <hr style={{ color: 'white' }} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- About End --> */}

        </div>
    );
}

export default About;