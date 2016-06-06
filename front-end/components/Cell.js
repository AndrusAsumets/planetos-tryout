import React, { Component, PropTypes } from 'react';

export default class Content extends Component {
    render() {
        let { wattage, voltage, id } = this.props;

        let wattageStyle = {};
        let voltageStyle = {};

        if (wattage == 0) {
            wattageStyle.color = 'red';
        }

        if (voltage == 0) {
            voltageStyle.color = 'red';
        }

        return (
            <div className="dashboard__cell">
                <div className="dashboard__cell_inner id">
                    { id }
                </div>
                <div className="dashboard__cell_inner wattage" style={ wattageStyle }>
                    { Math.round(wattage * 100) / 100 }
                </div>
                <div className="dashboard__cell_inner voltage" style={ voltageStyle }>
                    { Math.round(voltage * 100) / 100 }
                </div>
            </div>
        )
    }
}
