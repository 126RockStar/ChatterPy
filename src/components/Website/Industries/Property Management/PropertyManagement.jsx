import React from "react";
import HeroArea from "../../ui/HeroArea"
import Breadcrumb from "../../ui/Breadcrumb";
export default function PropertyManagement(): React.Component {

    return(
        <>
            <HeroArea text="Property Management"/>
            <Breadcrumb currentSection={"Property Management"}/>
            <section className="benifit-section padding-top padding-bottom">
                <div className="container mw-xxl-100 pr-xl-0">
                    <div className="row m-0 align-items-center">
                        <div className="col-xl-7 p-0">
                            <div className="benifit-left text-center text-md-left">
                                <div className="cate">ChatterPy for Property Managers</div>
                                <h2 className="title">Why Property Managers should use ChatterPy</h2>
                                <p>Mauris iaculis pede, tellus commodo justo. Ligula in tortmris libero lectus libero
                                    aliquet, vestibulum aut nullloret ac sictus, id pede quis quisque lacinia
                                    consectetuer. </p>
                                <div className="benifit-bottom">
                                    <div className="feature-item">
                                        <div className="icon">
                                            <i className="flaticon-customer-service"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5 className="title">100% SMS Delivery</h5>
                                            <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                                driving ptingoum.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="icon">
                                            <i className="flaticon-newspaper"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5 className="title">unlimited validity</h5>
                                            <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                                driving ptingoum.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="icon">
                                            <i className="flaticon-money"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5 className="title">lowest cost</h5>
                                            <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                                driving ptingoum.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="icon">
                                            <i className="flaticon-newspaper-1"></i>
                                        </div>
                                        <div className="feature-content">
                                            <h5 className="title">delivery report</h5>
                                            <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                                driving ptingoum.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 p-0 d-none d-xl-block">
                            <div className="benifit-thumb text-right">
                                <img src="./assets/images/overview/benifit-01.png" alt="overview"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="non-masking-sms-section-overview bg-f8">
                <div className="container-fluid p-lg-0">
                    <div className="row m-0 flex-wrap-reverse justify-content-between">
                        <div className="col-lg-6 p-0">
                            <div className="overview-non-masking-left padding-top padding-bottom mr-lg-15-xl">
                                <h2 className="title">
                                    worldwide non-masking SMS service
                                </h2>
                                <p className="header-para">
                                    Aspernatur, corporis, magni, deleniti recusandae aperiam quia vero sunt quae impedit
                                    neque tempora.
                                </p>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta excepturi
                                    necessitatibus quod ipsum animi illo dolores tempora, asperiores impedit cum
                                    quibusdam laudantium totam quidem maxime ea tempore natus porro! Magnam.
                                    Reiciendis, voluptate sed aliquid deserunt reprehenderit ab enim </p>
                                <ul className="bullet-list">
                                    <li>
                                        Vestibulum id rhoncus tempus
                                    </li>
                                    <li>
                                        Tellus fermentum a aenean
                                    </li>
                                    <li>
                                        Pulvinar cursus imperdiet
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-5 p-0">
                            <div className="w-100 h-100 non-m-video-section bg_img"
                                 data-background="./assets/images/overview/overview-bg03.jpg">
                                <a data-rel="lightcase:myCollection" href="https://www.youtube.com/embed/GT6-H4BRyqQ"
                                   className="video-button">
                                    <i className="flaticon-play-button-1 m-0"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="non-masking-sms-section-overview style-two bg-f8">
                <div className="container-fluid p-lg-0">
                    <div className="row m-0 justify-content-between">
                        <div className="col-lg-6 col-xl-5 p-0">
                            <div className="w-100 h-100 bg_img"
                                 data-background="./assets/images/overview/overview-bg04.jpg">
                                <img className="d-lg-none w-100" src="./assets/images/overview/overview-bg04.jpg"
                                     alt="overview"/>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-7 p-0">
                            <div className="overview-non-masking-left padding-top padding-bottom ml-lg-15-xl">
                                <h2 className="title">
                                    100% secure platform for Non-masking SMS
                                </h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam odit repellendus
                                    odio! Sequi voluptates recusandae vel quisquam corrupti, assumenda obcaecati ipsa
                                    quas perferendis tempora nobis consequatur id expedita dicta quibusdam! Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit.</p>
                                <p className="mt-0">Vestibulum wisi ac pharetra vitae maecenas, eu dui mauris mi et,
                                    facere nam curabitur nunc
                                    pellentesque molestie et, maecenas ultricies, conubia aliquam mauris, sit id lectus
                                    convallis vel mi. Libero quisque, ornare lacus</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}