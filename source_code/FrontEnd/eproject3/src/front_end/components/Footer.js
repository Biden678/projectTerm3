function Footer(props) {

    return (
        <div>


            {/* <!-- Footer Start --> */}
            <div className="container-fluid footer bg-dark wow fadeIn" data-wow-delay=".3s">
                <div className="container pt-5 pb-4">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <a href="index.html">
                                <h1 className="text-white fw-bold d-block">High<span className="text-secondary">Tech</span> </h1>
                            </a>
                            <p className="mt-4 text-light">The more you grow up, the more you realize that arguing about right and wrong, winning or losing is no longer important, the important thing is to want peace for the rest of your life.</p>
                            <div className="d-flex hightech-link">
                                <a href="https://www.facebook.com/groups/techwiz.fptaptech/permalink/1509783259773847/" className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-facebook-f text-primary"></i></a>
                                {/* <a href="" className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-twitter text-primary"></i></a> */}
                                <a href="https://www.instagram.com/bobusiucute?igsh=c3J2YWdxMW92c2E5&utm_source=qr" className="btn-light nav-fill btn btn-square rounded-circle me-2"><i className="fab fa-instagram text-primary"></i></a>
                                {/* <a href="" className="btn-light nav-fill btn btn-square rounded-circle me-0"><i className="fab fa-linkedin-in text-primary"></i></a> */}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <a href="#" className="h3 text-secondary">Short Link</a>
                            <div className="mt-4 d-flex flex-column short-link">
                                <a href="/aboutPage" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>About us</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Our Services</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Our Projects</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Latest Blog</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <a href="#" className="h3 text-secondary">Help Link</a>
                            <div className="mt-4 d-flex flex-column help-link">
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Terms Of use</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Privacy Policy</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>Helps</a>
                                <a href="/comingSoon" className="mb-2 text-white"><i className="fas fa-angle-right text-secondary me-2"></i>FQAs</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <a href="#" className="h3 text-secondary">Contact Us</a>
                            <div className="text-white mt-4 d-flex flex-column contact-link">
                                <a href="#" className="pb-3 text-light border-bottom border-primary"><i className="fas fa-map-marker-alt text-secondary me-2"></i> 123 Street, New York, USA</a>
                                <a href="#" className="py-3 text-light border-bottom border-primary"><i className="fas fa-phone-alt text-secondary me-2"></i> +096 118 8956</a>
                                <a href="#" className="py-3 text-light border-bottom border-primary"><i className="fas fa-envelope text-secondary me-2"></i> info@exmple.con</a>
                            </div>
                        </div>
                    </div>
                    <hr className="text-light mt-5 mb-4" />
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <span className="text-light"><span className="text-secondary"><i className="fas fa-copyright text-secondary me-2"></i>
                                MotorInsurance
                            </span>, Willing to serve.</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}


        </div>
    );
}

export default Footer;