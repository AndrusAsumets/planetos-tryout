import React, { Component, PropTypes } from 'react';
import Cell from '../components/cell';
import ReactD3 from 'react-d3-components';
var LineChart = ReactD3.AreaChart;
var moment = require('moment');

export default class Content extends Component {
    componentWillMount() {
        this.updateDimensions();
    }

    updateDimensions() {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

            this.setState({ width, height });
    }

    componentWillReceiveProps() {
        const { solar, cloud } = this.props;
        let { width, height } = this.state;

        let extra = 200;
        if (width < 1024) {
            width = width * 2;
            extra = extra / 2;
        }

        var cloudData = {
            data: {
                label: '',
                values: []
            },
            xScale: d3.time.scale().domain([moment(), moment().add(24, 'hours')]).range([0, width / 2 - extra])
        }

        var cloudValues = { values: [] };

        for(var i = 0; i < cloud.length; i++) {
            var time = cloud[i].axes.time;
            var localTime = moment(time);
            var av_ttl_cld = cloud[i].data.av_ttl_cld * 100;

            if (localTime > moment() && localTime <  moment().add(1, 'day')) cloudData.data.values.push({ x: localTime, y: av_ttl_cld });
        }

        var solarData = {
            data: {
                label: '',
                values: []
            },
            xScale: d3.time.scale().domain([moment(), moment().add(1, 'day')]).range([0, width / 2 - extra])
        }

        var solarValues = { values: [] };
        var av_swsfcdown = [];

        for(var i = 0; i < solar.length; i++) av_swsfcdown.push(parseInt(solar[i].data.av_swsfcdown));
        av_swsfcdown = percent(av_swsfcdown);

        for(var i = 0; i < solar.length; i++) {
            var time = solar[i].axes.time;
            var localTime = new Date(time);
            var _av_swsfcdown = av_swsfcdown[i];

            if (localTime > moment() && localTime <  moment().add(1, 'day')) solarData.data.values.push({ x: localTime, y: _av_swsfcdown });
        }

        this.setState({ solar: solarData, cloud: cloudData });
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidMount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const { energy, solar, cloud } = this.props;
        let { width, height } = this.state;
        let heightRatio = 0.4;

        if (width < 1024) {
            width = width * 2;
            heightRatio = 1;
        }

        let cells = [];
        const PANEL_COUNT = 30;
        let totalWattage = 0;

        if (energy.length > 0) {
            if (energy[2] === '-') energy[2] = '0';
            if (energy[8] === '-') energy[10] = '0';

            let wattages = parseFloat(energy[2]);
            let voltages = parseFloat(energy[8]);

            for(var i = 0; i < PANEL_COUNT; i++) {
                let wattage = wattages / PANEL_COUNT;
                let voltage = voltages / PANEL_COUNT;

                if (wattage < 0 || !wattage) wattage = 0;
                if (voltage < 0 || !voltage) voltage = 0;

                totalWattage += wattage;

                cells.push( { wattage: wattage, voltage: voltage });
            }
        }

        let footer = <div></div>;
        if (this.state.solar && this.state.cloud) {
            if (this.state.solar.data.values.length > 0 && this.state.cloud.data.values.length > 0) {
            footer = <div className="dashboard__footer">
                        <LineChart
                                data={ this.state.cloud.data }
                                width={ width / 2 }
                                height={ (height - 40) * heightRatio }
                                margin={{ top: 50, bottom: 50, left: 50, right: 0 }}
                                xScale={ this.state.cloud.xScale }
                                xAxis={{ tickValues: this.state.cloud.xScale.ticks(d3.time.hour, 1), tickFormat: d3.time.format("%H")}}
                                yAxis={{ label: 'Cloud coverage (100% — clear sky)' }}
                            />

                        <LineChart
                                data={this.state.solar.data}
                                width={ width / 2 }
                                height={ (height - 40) * heightRatio }
                                margin={{ top: 50, bottom: 50, left: 50, right: 0 }}
                                xScale={ this.state.solar.xScale }
                                xAxis={{ tickValues: this.state.solar.xScale.ticks(d3.time.hour, 1), tickFormat: d3.time.format("%H") }}
                                yAxis={{ label: 'Solar activity (watts per Sq m)' }}
                            />
                        </div>
            }
        }

        return (
            <div className="dashboard">
                <div className="dashboard__header">
                    Total Energy Production: <span></span> { parseInt(totalWattage) } kWh
                </div>

                <div className="dashboard__grid">
                    <div className="dashboard__cell menu">
                        <div className="dashboard__cell_inner id">
                            ID
                        </div>
                        <div className="dashboard__cell_inner wattage">
                            Power (kWh)
                        </div>
                        <div className="dashboard__cell_inner voltage">
                            Voltage (V)
                        </div>
                    </div>

                    <div className="dashboard__cell menu">
                        <div className="dashboard__cell_inner id">
                            ID
                        </div>
                        <div className="dashboard__cell_inner wattage">
                            Power (kWh)
                        </div>
                        <div className="dashboard__cell_inner voltage">
                            Voltage (V)
                        </div>
                    </div>

                    <div className="dashboard__cell menu">
                        <div className="dashboard__cell_inner id">
                            ID
                        </div>
                        <div className="dashboard__cell_inner wattage">
                            Power (kWh)
                        </div>
                        <div className="dashboard__cell_inner voltage">
                            Voltage (V)
                        </div>
                    </div>

                    {[...cells].map((x, i) =>
                         <Cell key = { i } id={ i + 1 } wattage={ cells[i].wattage } voltage={ cells[i].voltage } />
                     )}
                </div>

                { footer }
            </div>
        )
    }
}

function percent(array) {
    var i, max=0;
    for (i = 0; i < array.length; i++) if (array[i] > max) max = array[i];
    for (i = 0; i < array.length; i++) array[i] = array[i] * 100 / max;
    return array;
}
