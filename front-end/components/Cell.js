import React, { Component, PropTypes } from 'react';

export default class Content extends Component {
    render() {
        let { wattage, voltage, i } = this.props;

        let wattageStyle = {};
        let voltageStyle = {};

        if (wattage == 0) {
            wattageStyle.backgroundColor = 'red';
            wattageStyle.color = 'white';
            wattageStyle.border = '1px solid rgba(0, 0, 0, 1)';
        }

        if (voltage == 0) {
            voltageStyle.backgroundColor = 'red';
            voltageStyle.color = 'white';
            voltageStyle.border = '1px solid rgba(0, 0, 0, 1)';
        }

        return (
            <div className="dashboard__cell">
                <div className="dashboard__cell_inner id">
                    { i }
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
