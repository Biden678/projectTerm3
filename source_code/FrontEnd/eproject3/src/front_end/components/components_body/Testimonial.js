import img1 from '../../img/background.jpg';
import { Carousel } from 'react-bootstrap'; // Import Carousel component from Bootstrap

function Testimonial(props) {
    const images = [img1];

    return (
        <div>
            {/* <!-- Testimonial Start --> */}
            <div className="container-fluid testimonial py-5 my-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h5 className="text-primary">customer experience</h5>
                        <h1>What do customers think about our services?</h1>
                    </div>

                    <Carousel className="testimonial-carousel wow fadeIn" data-wow-delay=".5s">

                        <Carousel.Item>
                            <div className="testimonial-item border p-4">

                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <div className="d-flex align-items-center">
                                            <div className="ms-4">
                                                <img src={images} width={'100%'} height={'100%'} alt="" />
                                            </div>

                                        </div>
                                    </div>

                                    <div className='col-lg-8'>
                                        <hr/>
                                        <div className="m-5">
                                            <h2 className="text-secondary">Mr Tèo</h2>
                                            <p className="mb-0" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Lorem ipsum dolor sit amet elit. Sed efficitur quis purus ut interdum aliquam dolor eget urna. Nam volutpat libero sit amet leo cursus, ac viverra eros morbi quis quam mi.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Carousel.Item>

                        
                    </Carousel>
                </div>
            </div>
            {/* <!-- Testimonial End --> */}
        </div>
    );
}

export default Testimonial;
