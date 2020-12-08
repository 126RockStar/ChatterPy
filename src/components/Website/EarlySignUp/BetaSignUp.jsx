import React from "react";
import HeroArea from "../ui/HeroArea";
import Breadcrumb from "../ui/Breadcrumb";

export default function BetaSignUp(): React.Component {
    return (
        <>
            <HeroArea text="Early Sign Up"/>
            <Breadcrumb currentSection="Coming Soon"/>
            <section className="privacy-section padding-top padding-bottom">
                <div className="container">
                    <p>Great things are coming soon</p>
                    <iframe title="Early Sign Up" frameBorder="0" height="700px" width="2000px"
              src='https://forms.zohopublic.com/precisionassetmanagement/form/BasicSignup/formperma/hHMytVxNnsQtE5iypjGkuowcAhaUAXV2N6Q0MOL_VcM'>

                    </iframe>
                </div>
            </section>
        </>
    );
}