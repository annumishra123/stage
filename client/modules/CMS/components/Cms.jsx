import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { fetchCmsConfig } from '../CMSActions';
import clientConfig from '../../../config';
import ReactModal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';


class Cms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            config: null
        }
    }

    componentDidMount() {
        this.props.fetchCmsConfig();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cmsConfig) {
            let config = nextProps.cmsConfig;
            this.setState({
                config: nextProps.cmsConfig
            });
        }
    }

    handleTabChange(tabIndex) {
        this.setState({
            tabIndex: tabIndex
        });
    }

    mobileCoverpageLabel(e) {
        this.state.config.mobile.coverpage.rent.label = e.target.value;
    }
    mobileCoverpageTarget(e) {
        this.state.config.mobile.coverpage.rent.target = e.target.value;
    }
    mobileCoverpageImage(e) {
        this.state.config.mobile.coverpage.rent.image = e.target.value;
    }
    mobileCoverpageCreatedDate(e) {
        this.state.config.mobile.coverpage.rent.createddate = e.target.value;
    }
    mobileCoverpageValidDate(e) {
        this.state.config.mobile.coverpage.rent.validtill = e.target.value;
    }
    mobileCoverpageCreator(e) {
        this.state.config.mobile.coverpage.rent.createdby = e.target.value;
    }
    mobileBuyCoverpageLabel(e) {
        this.state.config.mobile.coverpage.buy.label = e.target.value;
    }
    mobileBuyCoverpageTarget(e) {
        this.state.config.mobile.coverpage.buy.target = e.target.value;
    }
    mobileBuyCoverpageImage(e) {
        this.state.config.mobile.coverpage.buy.image = e.target.value;
    }
    mobileBuyCoverpageCreatedDate(e) {
        this.state.config.mobile.coverpage.buy.createddate = e.target.value;
    }
    mobileBuyCoverpageValidDate(e) {
        this.state.config.mobile.coverpage.buy.validtill = e.target.value;
    }
    mobileBuyCoverpageCreator(e) {
        this.state.config.mobile.coverpage.buy.createdby = e.target.value;
    }
    desktopCoverpageLabel(e) {
        this.state.config.desktop.coverpage.rent.label = e.target.value;
    }
    desktopCoverpageTarget(e) {
        this.state.config.desktop.coverpage.rent.target = e.target.value;
    }
    desktopCoverpageImage(e) {
        this.state.config.desktop.coverpage.rent.image = e.target.value;
    }
    desktopCoverpageCreatedDate(e) {
        this.state.config.desktop.coverpage.rent.createddate = e.target.value;
    }
    desktopCoverpageValidDate(e) {
        this.state.config.desktop.coverpage.rent.validtill = e.target.value;
    }
    desktopCoverpageCreator(e) {
        this.state.config.desktop.coverpage.rent.createdby = e.target.value;
    }
    desktopBuyCoverpageLabel(e) {
        this.state.config.desktop.coverpage.buy.label = e.target.value;
    }
    desktopBuyCoverpageTarget(e) {
        this.state.config.desktop.coverpage.buy.target = e.target.value;
    }
    desktopBuyCoverpageImage(e) {
        this.state.config.desktop.coverpage.buy.image = e.target.value;
    }
    desktopBuyCoverpageCreatedDate(e) {
        this.state.config.desktop.coverpage.buy.createddate = e.target.value;
    }
    desktopBuyCoverpageValidDate(e) {
        this.state.config.desktop.coverpage.buy.validtill = e.target.value;
    }
    desktopBuyCoverpageCreator(e) {
        this.state.config.desktop.coverpage.buy.creator = e.target.value;
    }
    mobileDesignerLabel(e) {
        this.state.config.mobile.designers.label = e.target.value;
    }
    mobileDesignerBanner(e) {
        this.state.config.mobile.designers.subbanner = e.target.value;
    }
    mobileDesignerAlt(e) {
        this.state.config.mobile.designers.alt = e.target.value;
    }
    mobileDesignerCreatedDate(e) {
        this.state.config.mobile.designers.createddate = e.target.value;
    }
    mobileDesignerValidDate(e) {
        this.state.config.mobile.designers.validtill = e.target.value;
    }
    mobileDesignerCreator(e) {
        this.state.config.mobile.designers.createdby = e.target.value;
    }
    desktopDesignerLabel(e) {
        this.state.config.desktop.designers.label = e.target.value;
    }
    desktopDesignerBanner(e) {
        this.state.config.desktop.designers.subbanner = e.target.value;
    }
    desktopDesignerCreatedDate(e) {
        this.state.config.desktop.designers.createddate = e.target.value;
    }
    desktopDesignerValidDate(e) {
        this.state.config.desktop.designers.validtill = e.target.value;
    }



    render() {
        return <section>
            {this.state.config ?
                <div>
                    <h1>Content Management System</h1>
                    <br />
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={this.handleTabChange.bind(this)}>
                        <TabList>
                            <Tab>Cover Page</Tab>
                            <Tab>Mega-Menu</Tab>
                            <Tab>Rent Landing Page</Tab>
                            <Tab>Our Designers</Tab>
                            <Tab>Testimonials</Tab>
                            <Tab>Celebrity-Closet</Tab>
                        </TabList>
                        <TabPanel>
                            <form>
                                <h4>MOBILE:</h4>
                                <br />
                                <h3>RENT:</h3>
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.rent.label} onChange={(e) => this.mobileCoverpageLabel(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.rent.target} onChange={(e) => this.mobileCoverpageTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.config.mobile.coverpage.rent.image} onChange={(e) => this.mobileCoverpageImage(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.config.mobile.coverpage.rent.createddate} onChange={(e) => this.mobileCoverpageCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.mobile.coverpage.rent.validtill} onChange={(e) => this.mobileCoverpageValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.rent.createdby} onChange={(e) => this.mobileCoverpageCreator(e)} />
                                </div>
                                <br />
                                <hr />
                                <h3>BUY:</h3>
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.buy.label} onChange={(e) => this.mobileBuyCoverpageLabel(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.buy.target} onChange={(e) => this.mobileBuyCoverpageTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.config.mobile.coverpage.buy.image} onChange={(e) => this.mobileBuyCoverpageImage(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.config.mobile.coverpage.buy.createddate} onChange={(e) => this.mobileBuyCoverpageCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.mobile.coverpage.buy.validtill} onChange={(e) => this.mobileBuyCoverpageValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.mobile.coverpage.buy.createdby} onChange={(e) => this.mobileBuyCoverpageCreator(e)} />
                                </div>
                                <br />
                                <br />
                                <hr />
                                <h4>DESKTOP:</h4>
                                <br />
                                <h3>RENT:</h3>
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.rent.label} onChange={(e) => this.desktopCoverpageLabel(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.rent.target} onChange={(e) => this.desktopCoverpageTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.config.desktop.coverpage.rent.image} onChange={(e) => this.desktopCoverpageImage(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.config.desktop.coverpage.rent.createddate} onChange={(e) => this.desktopCoverpageCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.desktop.coverpage.rent.validtill} onChange={(e) => this.desktopCoverpageValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.rent.createdby} onChange={(e) => this.desktopCoverpageCreator(e)} />
                                </div>
                                <br />
                                <hr />
                                <h3>BUY:</h3>
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.buy.label} onChange={(e) => this.desktopBuyCoverpageLabel(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.buy.target} onChange={(e) => this.desktopBuyCoverpageTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.config.desktop.coverpage.buy.image} onChange={(e) => this.desktopBuyCoverpageImage(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.config.desktop.coverpage.buy.createddate} onChange={(e) => this.desktopBuyCoverpageCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.desktop.coverpage.buy.validtill} onChange={(e) => this.desktopBuyCoverpageValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.desktop.coverpage.buy.createdby} onChange={(e) => this.desktopBuyCoverpageCreator(e)} />
                                </div>
                                <button type="submit">Update</button>
                            </form>
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>
                            <form>
                                <h4>MOBILE:</h4>
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.mobile.designers.label} onChange={(e) => this.mobileDesignerLabel(e)} />
                                    <h4>Sub-Banner: </h4>
                                    <textarea type="text" value={this.state.config.mobile.designers.subbanner} onChange={(e) => this.mobileDesignerBanner(e)} />
                                    <h4>Alt Tag: </h4>
                                    <input type="text" value={this.state.config.mobile.designers.alt} onChange={(e) => this.mobileDesignerAlt(e)} />
                                    <h4>Created Date </h4>
                                    <input type="date" value={this.state.config.mobile.designers.createddate} onChange={(e) => this.mobileDesignerCreatedDate(e)} />
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.mobile.designers.validtill} onChange={(e) => this.mobileDesignerValidDate(e)} />
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.mobile.designers.createdby} onChange={(e) => this.mobileDesignerCreator(e)} />
                                </div>
                                <br />
                                <br />
                                {this.state.config.mobile.designers.children.map((child, i) => {
                                    return <div key={i}>
                                        <hr />
                                        <br />
                                        <div>
                                            <label>Designer Label:{child.label}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Image:{child.image}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Target:{child.target}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Text:{child.text}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created Date:{child.createddate}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Validity:{child.validtill}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created By:{child.createdby}</label>
                                        </div>
                                        <br />
                                    </div>
                                })}
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Designer Label: </h4>
                                    <input type="text" onChange={(e) => this.DesignerLabel(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" onChange={(e) => this.desktopDesignerImage(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" onChange={(e) => this.desktopDesignerTarget(e)} />
                                </div>
                                <div>
                                    <h4>Text: </h4>
                                    <input type="text" onChange={(e) => this.desktopDesignerText(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" onChange={(e) => this.desktopDesignerCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" onChange={(e) => this.desktopDesignerValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" onChange={(e) => this.desktopDesignerCreator(e)} />
                                </div>
                                <br />
                                <br />
                                <hr />
                                <h4>DESKTOP:</h4>
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.desktop.designers.label} onChange={(e) => this.desktopDesignerLabel(e)} />
                                    <h4>Sub-Banner: </h4>
                                    <input type="text" value={this.state.config.desktop.designers.subbanner} onChange={(e) => this.desktopDesignerBanner(e)} />
                                    <h4>Alt Tag: </h4>
                                    <input type="text" value={this.state.config.desktop.designers.alt} onChange={(e) => this.desktopDesignerAlt(e)} />
                                    <h4>Created Date </h4>
                                    <input type="date" value={this.state.config.desktop.designers.createddate} onChange={(e) => this.desktopDesignerCreatedDate(e)} />
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.config.desktop.designers.validtill} onChange={(e) => this.desktopDesignerValidDate(e)} />
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.desktop.designers.createdby} onChange={(e) => this.desktopDesignerCreator(e)} />
                                </div>
                                <br />
                                <br />
                                {this.state.config.desktop.designers.children.map((child, i) => {
                                    return <div key={i}>
                                        <hr />
                                        <br />
                                        <div>
                                            <label>Designer Label:{child.label}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Image:{child.image}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Target:{child.target}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Text:{child.text}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created Date:{child.createddate}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Validity:{child.validtill}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created By:{child.createdby}</label>
                                        </div>
                                        <br />
                                    </div>
                                })}
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Designer Label: </h4>
                                    <input type="text" value={this.state.desktopImageUrl} onChange={(e) => this.changeTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.mobileImageUrl} onChange={(e) => this.changeImage(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.url} onChange={(e) => this.changeCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Text: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Validity: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <br />
                                <button type="submit">Update</button>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form>
                                <h4>MOBILE:</h4>
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.mobile.testimonials.label} onChange={(e) => this.mobileTestimonialLabel(e)} />
                                    <h4>Sub-Banner: </h4>
                                    <input type="text" value={this.state.config.mobile.testimonials.subbanner} onChange={(e) => this.mobileTestimonialBanner(e)} />
                                    <h4>Alt Tag: </h4>
                                    <input type="text" value={this.state.config.mobile.testimonials.alt} onChange={(e) => this.mobileTestimonialAlt(e)} />
                                    <h4>Created Date </h4>
                                    <input type="date" value={this.state.config.mobile.testimonials.createddate} onChange={(e) => this.mobileTestimoniaCreatedDate(e)} />
                                    <h4>Validity Date: </h4>
                                    <input type="date" value={this.state.config.mobile.testimonials.validtill} onChange={(e) => this.mobileTestimonialValidDate(e)} />
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.mobile.testimonials.createdby} onChange={(e) => this.mobileTestimonialCreator(e)} />
                                </div>
                                <br />
                                <br />
                                {this.state.config.mobile.testimonials.children.map((child, i) => {
                                    return <div key={i}>
                                        <hr />
                                        <br />
                                        <div>
                                            <label>Designer Label:{child.label}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Image:{child.image}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Text:{child.text}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created Date:{child.createddate}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Validity:{child.validtill}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created By:{child.createdby}</label>
                                        </div>
                                        <br />
                                    </div>
                                })}
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Designer Label: </h4>
                                    <input type="text" value={this.state.desktopImageUrl} onChange={(e) => this.changeTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.mobileImageUrl} onChange={(e) => this.changeImage(e)} />
                                </div>
                                <div>
                                    <h4>Target: </h4>
                                    <input type="text" value={this.state.url} onChange={(e) => this.changeCreatedDate(e)} />
                                </div>
                                <div>
                                    <h4>Text: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Validity Date: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <br />
                                <br />
                                <hr />
                                <h4>DESKTOP:</h4>
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.config.desktop.testimonials.label} onChange={(e) => this.changeLabel(e)} />
                                    <h4>Sub-Banner: </h4>
                                    <input type="text" value={this.state.config.desktop.testimonials.subbanner} onChange={(e) => this.changeLabel(e)} />
                                    <h4>Alt Tag: </h4>
                                    <input type="text" value={this.state.config.desktop.testimonials.alt} onChange={(e) => this.changeLabel(e)} />
                                    <h4>Created Date </h4>
                                    <input type="date" value={this.state.config.desktop.testimonials.createddate} onChange={(e) => this.changeLabel(e)} />
                                    <h4>Validity Date: </h4>
                                    <input type="date" value={this.state.config.desktop.testimonials.validtill} onChange={(e) => this.changeLabel(e)} />
                                    <h4>Created By: </h4>
                                    <input type="text" value={this.state.config.desktop.testimonials.createdby} onChange={(e) => this.changeLabel(e)} />
                                </div>
                                <br />
                                <br />
                                {this.state.config.desktop.testimonials.children.map((child, i) => {
                                    return <div key={i}>
                                        <hr />
                                        <br />
                                        <div>
                                            <label>Label:{child.label}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Image:{child.image}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Text:{child.text}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created Date:{child.createddate}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Validity:{child.validtill}</label>
                                        </div>
                                        <br />
                                        <div>
                                            <label>Created By:{child.createdby}</label>
                                        </div>
                                        <br />
                                    </div>
                                })}
                                <br />
                                <hr />
                                <br />
                                <div>
                                    <h4>Label: </h4>
                                    <input type="text" value={this.state.desktopImageUrl} onChange={(e) => this.changeTarget(e)} />
                                </div>
                                <div>
                                    <h4>Image: </h4>
                                    <textarea type="text" value={this.state.mobileImageUrl} onChange={(e) => this.changeImage(e)} />
                                </div>
                                <div>
                                    <h4>Text: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeValidDate(e)} />
                                </div>
                                <div>
                                    <h4>Created Date: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Validity Date: </h4>
                                    <input type="date" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <div>
                                    <h4>Updated By: </h4>
                                    <input type="text" value={this.state.title} onChange={(e) => this.changeCreator(e)} />
                                </div>
                                <br />
                                <button type="submit">Update</button>
                            </form>
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </Tabs>
                </div> : null}
        </section >
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchCmsConfig,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user: state.auth.email,
        cmsConfig: state.cmsConfig
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(Cms);
