import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { NavigationEvents, withNavigationFocus } from 'react-navigation'

import Clarifier from '../components/clarifier'

class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        base64: "",
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    }

    //snap a picture
    snap = async () => {
      
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                base64: true,
               // skipProcessing: true
            });
         
           
            //grab the base64 representation
            this.setState({ base64: photo.base64 })
            console.log("STATE :", this.state)
           

        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;

        } else if (!this.props.isFocused) {
            //unmount camera if not tab focused
            return <View />
        } else {
            return (

                <View style={{ flex: 1 }}>

                    <Camera style={{ flex: 1 }}
                        ratio={"4:3"}
                        zoom={1}
                        exif={true}
                       
                        type={this.state.type}
                        //refer to the camera outside of the definition
                        ref={ref => { this.camera = ref }}

                    >
                        <View style={{
                            flex: 1, backgroundColor: 'transparent',
                        }}>
                            <Clarifier
                                base64={this.state.base64}
                                targetLang={"en"}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 0.5,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.snap()
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    Snap A Picture!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>

                </View>
            );
        }
    }
}

export default withNavigationFocus(CameraScreen);