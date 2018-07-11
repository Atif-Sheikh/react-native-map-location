import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const LATTITUDE_DELTA = 0.0922;
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const EXPECT_RATIO = width / height;
const LONGITUDE_DELTA = LATTITUDE_DELTA * EXPECT_RATIO;

export default class DrawMap extends Component {
    constructor() {
        super();
        this.state = {
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                longitude: 0,
                latitude: 0
            }
        }
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            this.setState({ initialPosition: initialRegion });
            this.setState({ markerPosition: initialRegion });
        }, (err) => alert(JSON.stringify(err)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })
        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude);
            var long = parseFloat(position.coords.longitude);
            var lastRegion = {
                latitude: lat,
                longitude: long,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATTITUDE_DELTA,
            }
            this.setState({ initialPosition: lastRegion });
            this.setState({ markerPosition: lastRegion });
        })
    };
    componentWillUnmount() {
        navigator.geolocation.clearWatch(thi.watchID);
    };
    render() {
        return (
            <MapView
                region={this.state.initialPosition}
            >
                <MapView.Marker
                    coordinate={this.state.markerPosition}
                >
                </MapView.Marker>
            </MapView>
        );
    };
};
const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
    },
});