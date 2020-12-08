import React from "react";
import HeroArea from "../../ui/HeroArea"
import Breadcrumb from "../../ui/Breadcrumb";
export default function Automotive(): React.Component {

    return(
        <>
            <HeroArea text="Templates"/>
            <Breadcrumb currentSection={"Templates"}/>
            <section className="bulk-sms mask-sms padding-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="bulk-thumb">
                                <img src="./assets/images/bulk/bulk02.png" alt="bulk"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bulk-content text-center text-sm-left">
                                <span>services Benefits</span>
                                <h2 className="title">what's Benefits masking SMS</h2>
                                <p>Mauris iaculis pede, tellus commodo justo. Ligula in tortmris libero lectus libero
                                    aliquet,
                                    vestibulum aut nullloret ac sictus, id pede quis quisque lacinia consectetuer. uere
                                    eros
                                    velit eu nec arcu, repellat urna ad odio nunc. Pharetra massa mauris aliquet posuere
                                    magna
                                    ligula, pellentesque molestie et, maecenas ultricies, conubia aliquam mauris</p>
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
                    </div>
                </div>
            </section>
            <section className="bulk-sms padding-top">
                <div className="container">
                    <div className="row flex-wrap-reverse align-items-center">
                        <div className="col-lg-6">
                            <div className="bulk-content text-center text-sm-left">
                                <span>wellcome to bulk sms</span>
                                <h2 className="title">grobal Bulk SMS Service company</h2>
                                <p>Mauris iaculis pede, tellus commodo justo. Ligula in tortmris libero lectus libero
                                    aliquet, vestibulum aut nullloret ac sictus, id pede quis quisque lacinia
                                    consectetuer.
                                    uere eros velit eu nec arcu, repellat urna ad odio nunc. Doletiarcu eginrdum tiunt
                                    morbi, aenean dui amet at mapro Sed quis nunc est justo, in in, elit lorem
                                    vulputate,
                                    suspendisse pellentesque pede tpluptatem ut mattis, eros diam litora nullam. Ac
                                    cras,
                                    mollis quis maecenas urna ullamper eros.</p>
                                <a href="#0" className="custom-button active">sign-up & start</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bulk-thumb">
                                <img src="./assets/images/bulk/bulk01.png" alt="bulk"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="feature-section padding-top padding-bottom">
                <div className="container">
                    <div className="section-header">
                        <span className="cate">our feature</span>
                        <h2 className="title">masking SMS feature</h2>
                    </div>
                    <div className="feature-section-wrapper">
                        <div className="feature-area">
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
                                    <h5 className="title">Unlimited Validity</h5>
                                    <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                        driving ptingoum.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-area">
                            <img src="./assets/images/feature/feature01.png" alt="feature"/>
                        </div>
                        <div className="feature-area">
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
                                    <h5 className="title">Delivery report</h5>
                                    <p>Amet mus venenatis dictucator amet, amet amet eget semi.
                                        driving ptingoum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}