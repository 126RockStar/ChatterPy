// @flow
import * as React from 'react';
import Banner from './Banner';
import BulkSMS from './BulkSMS';
import ChooseUsSection from './ChooseUsSection';
import ClientSection from './ClientSection';
import PricePlan from './PricePlan';
import ServiceSection from './ServiceSection';

export default function HomePage(): React.Node {
  return (
    <>
      <Banner />
      <ChooseUsSection />
      <BulkSMS />
      <ServiceSection />
      <PricePlan />
      <ClientSection />
    </>
  );
}
