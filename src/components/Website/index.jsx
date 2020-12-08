// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import PrivacySection from './Privacy/Components/PrivacySection';
import FAQ from './FAQ/Components/FAQ';
import PropertyManagement from "./Industries/Property Management/PropertyManagement";
import AuthorizationService from '../../services/AuthorizationService';
import RealEstate from "./Industries/Real Estate/RealEstate";
import Fitness from "./Industries/Fitness/Fitness";
import Automotive from "./Industries/Automotive/Automotive";

window.AuthorizationService = AuthorizationService;
export default function Website(): React.Node {
  const [isWebsiteCSSLoaded, setIsWebsiteCSSLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!isWebsiteCSSLoaded) {
      import('../../assets/website/scss/main.scss').then(() => {
        setIsWebsiteCSSLoaded(true);
      });
    }
  });

  return (
    isWebsiteCSSLoaded && (
      <>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/privacy" component={PrivacySection} />
        <Route path="/faq" component={FAQ} />
        <Route path="/property-management"component={PropertyManagement}/>
        <Route path="/real-estate" component={RealEstate}/>
        <Route path="/fitness" component={Fitness}/>
        <Route path="/automotive" component={Automotive}/>

        <Footer />
      </>
    )
  );
}
