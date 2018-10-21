import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import { NavigationEvents, withNavigationFocus  } from 'react-navigation'
class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraVisible: true,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
            cameraVisible: true,
        });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                onPictureSaved: () => {
                    alert("The picture was saved!")
                },
                quality: 1.0,
                base64: true,
            });
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
                        type={this.state.type}
                        ref={ref => { this.camera = ref }}
                    >
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