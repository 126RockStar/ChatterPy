import React from "react";
import HeroArea from "../../ui/HeroArea";
import Breadcrumb from "../../ui/Breadcrumb";

export default function PrivacySection(): React.Component {
    return (
        <>
          <HeroArea text="Privacy" />
          <Breadcrumb currentSection="Privacy" />
      <section className="privacy-section padding-top padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-md-block d-none">
              <div className="privacy-sidebar-content">
                <h4 className="title">privacy Policy</h4>
                <ul>
                  <li>
                    <a className="nav-link" href="#data-controller">
                      Data Controller
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#cookies-data">
                      Cookies Data
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#why-collect">
                      why do we collect this data?
                    </a>
                  </li>
                </ul>
                <h4 className="title">terms of service</h4>
                <ul>
                  <li>
                    <a className="nav-link" href="#terms-condition">
                      Service terms & condition
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#payment">
                      payment
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#registration">
                      registration
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="privacy-content">
                <h3 className="title" id="data-controller">
                  data controller
                </h3>
                <p>
                  Dolor semper amet, sed phasellus, leo velit quis cras vitae
                  ipsum auctor, et cenas ultrices rhoncus. A tellus vel dis.
                  Magna ad facilisi vestibulum, sagittis imper amet ultricies
                  eu, hac egestas ante amet dis dui. Velit integer, tellus ac
                  proin faucibus morbi erat, enim ultrices odio, scelerisque in
                  accumsan. Id penatibus, tem lectus mi phasellus massa ac,
                  adipiscing purus Malesuada sollicitudin donec fusce. In ac
                  lorem, quis eu eros numquam vestilum, ac curabitur quam sed
                  non hendrerit. Sed duis, nec felis aliquam. Sit ut dapibus in
                  donec vitae, purus et, tincidunt egestas phasellus et
                  curabitur massa erat
                </p>
                <ul className="bullet-list">
                  <li>Vestibulum id rhoncus tempus</li>
                  <li>Tellus fermentum a aenean</li>
                  <li>Pulvinar cursus imperdiet</li>
                </ul>
                <h3 className="title" id="cookies-data">
                  cookies data
                </h3>
                <p>
                  Accumsan. Id penatibus, tempor lectus mi phasellus massa ac,
                  adipiscing purus, tortor sodales ut sed feugiat ipsum,
                  porttitor mauris est eleifend. Felis at at nulla nisl erat
                  tellus, sit donec et sem amet, felis neque eget ac nibh
                  molestie, sit justo eros, vestibulum risus. Iaculis gravida,
                  suspendisse quis mattis fermentum petra velit, curabitur justo
                  consectetuer ultrices nonummy dolor.{" "}
                </p>
                <ul className="bullet-list">
                  <li>
                    Tempus imperdiet. At quis rhoncus aliquam wisi turpis
                    ornare, a vulputate
                  </li>
                  <li>
                    Montes pede dictum, porttitor magna diam fusce mauris erat,
                    id nunc maece
                  </li>
                  <li>
                    Suscipit nulla nullam et eget. Sed sed dolor, senectus
                    tempus nulla euquis
                  </li>
                  <li>
                    Odio magna molestie, pellentesque consectetuer tempus mauris
                    morbi, sed
                  </li>
                  <li>Psum dapibus leo pulvinar orci morbi purus, dui ipsum</li>
                </ul>
                <h3 className="title" id="why-collect">
                  why do we collect this data?
                </h3>
                <p>
                  Sodales mi pharetra pellentesque mauris elementum proin,
                  aliquam rutrquisque est. Fermentum viverra, at ante consequat
                  rutrum a tempus quam, elit plectus lobortis convallis sit
                  orci, quisque feugiat veritatis vel orci suspendisse. Ipsum
                  in, nam at mauris est pellentesque in magna, quis etiam{" "}
                </p>
                <ul className="bullet-list">
                  <li>
                    Nunc dictum mauris malesuada urna, vel velit quisque
                    accumsan.
                  </li>
                  <li>Dolor mattis et aliquam, id ut quam mauris, in fusce.</li>
                  <li>
                    Quam accumsan nunc sodales lobortis, porttitor duis leo
                    malesuada,
                  </li>
                  <li>Ultricies odio erat. Nec ut cum cras.</li>
                  <li>
                    Dapibus rutrum neque, ac in ornare turpis dapibus lacus
                    suscipit,
                  </li>
                </ul>
                <h3 className="title" id="terms-condition">
                  Service Terms & Condition
                </h3>
                <p>
                  Suspendisse, et vehicula, sed justo scelerisque wisi morbi,
                  scelerisque eu mauris est. Bibendum sodales tincidunt ipsum,
                  at pretium mauris mauris mauris sithula, mauris orci est eu,
                  montes enim mattis eu pharetra duis, adipiscing sit
                  nullglortis risus. Diam donec ridiculus, odio nulla mauris,
                  convallis metus etiam conubia vel mattis elit. Netus felis,
                  aliquam tincidunt. Nec vel rerum turpis per donec mauris,
                  adipiscing viverra rutrum, interdum quis nunc dictum mauris
                  malesuada urna, vel velit quisque accumsan.
                </p>
                <h3 className="title" id="payment">
                  Payment Method
                </h3>
                <p>
                  Rutrum pellentesque. Urna posuere lorem lectus ultricies,
                  justo dui. Ante malibevelit justo ut integer. Senectus non.
                  Ipsum ullamcorper vel aliquet quam, nvamus vehicula donec
                  porttitor, lectus quam lacinia et curabitur. Integer egestas
                  lectus et nam diam, aut sagittis pellentesque nec, nunc nunc
                  vitae gravida, dui viverra neque a purus praesent curabitur.
                </p>
                <h3 className="title" id="registration">
                  Registration
                </h3>
                <p>
                  Non maecenas maecenas amet mollis, tincidunt vestibulum
                  suscipit nostra, ac gravida a nec interdum. Aliquam id blandit
                  sapien sollicitudin, tellus elit ultrices pulvina magna tempus
                  nullam suspendisse convallis aenean, amet et htasse non
                  praesent, cum ut lectus lectus. Et consectetuer nulla varius
                  cursus, eros eget ac nisl. Felis ad justo elit vestibulum at,
                  in duis morbi, augue lacus quis nec in est. A dictum integer
                  in nullam felis nulla, posuere suspendisse, justo ante
                  imperdiet,{" "}
                </p>
                <p>
                  eleifend aenean vehicula pede, euismod urna tellus purus.
                  Nullam ut eget ulies. Tortor ante amet tortor, ut quam
                  interdum faucibus nec tellus, parturient pede id ut, montes
                  maecenas nec feugiat tortor, nec massa sociis amet. Est quam
                  erat malesuada penatibus consectetuer suscipit, ac rem sed
                  tortor gravida odio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    );
  }

