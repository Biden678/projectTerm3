import img1 from '../img/background.jpg';


function Carousel(props) {
    const images = [img1];

    return (
        <div>

            {/* <!-- Carousel Start --> */}
            <div className="container-fluid px-0">
                {/* <div id="carouselId" className="carousel slide" data-bs-ride="carousel"> */}
                {/* <ol className="carousel-indicators">
                        <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active" aria-current="true" aria-label="First slide"></li>
                        <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                    </ol> */}
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item-header active">
                        <img src={images} className="img-fluid" alt="First slide" />
                        <div className="carousel-caption">
                            <div className="container carousel-content">
                                <h6 className="text-secondary h4 animated fadeInUp">Motorcycle Insurance</h6>
                                <h1 className="text-white display-1 mb-4 animated fadeInRight">Protect the safety of your beloved <span style={{ color: '#7fffd4' }}>Motor</span> on all roads</h1>
                                <p className="mb-4 text-white fs-5 animated fadeInDown">The top insurance company in Vietnam.</p>
                                {/* <a href="" className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Read More</button></a>
                                <a href="" className="ms-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img src="../img/carousel-2.jpg" className="img-fluid" alt="Second slide"/>
                        <div className="carousel-caption">
                            <div className="container carousel-content">
                                <h6 className="text-secondary h4 animated fadeInUp">Best IT Solutions</h6>
                                <h1 className="text-white display-1 mb-4 animated fadeInLeft">Quality Digital Services You Really Need!</h1>
                                <p className="mb-4 text-white fs-5 animated fadeInDown">Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum. Pellentesque aliquam dolor eget urna ultricies tincidunt.</p>
                                <a href="" className="me-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn1 animated fadeInLeft">Read More</button></a>
                                <a href="" className="ms-2"><button type="button" className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight">Contact Us</button></a>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> */}
                {/* </div> */}
            </div>
            {/* <!-- Carousel End --> */}

        </div>
    );
}

export default Carousel;