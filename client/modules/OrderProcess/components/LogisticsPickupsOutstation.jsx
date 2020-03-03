import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import clientConfig from '../../../config';
import ReactTable from 'react-table';
import { getOrderLinesForOutstationPickup, generateWayBills } from '../OrderProcessActions';
import moment from 'moment';

// Import Style
import styles from './OrderProcess.css';

class LogisticsPickups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickup: {
                pageNumber: 0,
                pageSize: 0,
                daysBeforePickupDate: 10
            },
            selectedOrderlines: []
        };
    }

    componentDidMount() {
        this.props.getOrderLinesForOutstationPickup(this.state.pickup);
    }

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    selectOrderline(value, e) {
        let array = this.state.selectedOrderlines;
        if (e.target.checked) {
            array.push({
                "consigneeName": `${value.profile.firstName} ${value.profile.lastName}`,
                "consigneeAddress1": value.deliveryAddress.address.slice(0, 30),
                "consigneeAddress2": value.deliveryAddress.address.slice(30, 60),
                "consigneeAddress3": value.deliveryAddress.address.slice(60, 90),
                "consigneeMobile": value.profile.phoneNumber,
                "consigneePincode": value.deliveryAddress.pincode,
                "consigneeTelephone": value.profile.phoneNumber,
                "actualWeight": 3,
                "collectableAmount": 0,
                "commodity": {},
                "creditReferenceNo": this.makeid(20),
                "declaredValue": (value.price + value.deposit),
                "prepaid": true,
                "orderLineId": value.id,
                "isReversePickup": true,
                "pickupDate": moment(value.pickupDateUTC).format('DD-MMM-YYYY'),
                "pieces": 1,
                "productType": "dox",
                "userId": this.props.user,
                "orderDates": {
                    dispatchDateUTC: value.dispatchDateUTC,
                    occasionDateUTC: value.occasionDateUTC,
                    deliveryDateUTC: value.deliveryDateUTC,
                    pickupDateUTC: value.pickupDateUTC,
                    receivedDateUTC: value.receivedDateUTC,
                    availableDateUTC: value.availableDateUTC
                }
            });
        } else {
            array = array.filter(function (obj) {
                return obj.orderLineID !== value.id;
            });
        }
        this.setState({
            selectedOrderlines: array
        });
    }

    generateWaybills() {
        this.props.generateWayBills(this.state.selectedOrderlines);
    }

    renderDeliveries() {
        if (this.props.pickups) {
            let deliveryIndex = clientConfig.orderProcessColumns.findIndex(o => o.id == 'generateWaybill');
            if (deliveryIndex != -1) { clientConfig.orderProcessColumns.splice(deliveryIndex, 1); }

            clientConfig.orderProcessColumns.unshift({
                Header: '',
                id: 'generateWaybill',
                accessor: o => {
                    return <div>
                        <input type="checkbox" className="" onChange={this.selectOrderline.bind(this, o)} />
                    </div>
                }
            });

            return <ReactTable filterable data={this.props.pickups} columns={clientConfig.orderProcessColumns}
                defaultPageSize={10} className="data-table -striped -highlight" />;
        }
    }

    render() {
        return <section className="">
            <h1>Pickups (Out Station)</h1><br />
            <button onClick={() => { this.generateWaybills() }} className={styles.btnBlack}>Generate Waybills</button><br /><br />
            {this.renderDeliveries()}
        </section>
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderLinesForOutstationPickup,
        generateWayBills
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        pickups: state.getOrderLinesForOutstationPickup,
        role: state.auth.role,
        user: state.auth.email
    };
}


export default connect(mapStateToProps, matchDispatchToProps)(LogisticsPickups);