const Clarifai = require('clarifai');
import React from 'react'
import { View, Text } from 'react-native'

process.nextTick = setImmediate;
const app = new Clarifai.App({
    apiKey: '1076cec1d6484e85bfaf9e07c09b5a17'
});



export default class Clarifier extends React.Component {

    constructor(props){
        super(props);
      
        this.callClarifai();
        
    }
    state = {
        names: ['one','two','three','four','five']
    }

    render(){
        ready = this.state.names && this.state.base64
        
        return ready && (
        <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={{fontSize: 30, color: "white"}}>Results of the Search:</Text>
            {this.state.names.map(name => <Text style={{ flex: 1, color: "white" }} key={name}>{name}</Text>)}
        </View>
        ) || null

        //render MUST return something
    }

    callClarifai() {
        return app.models.predict(Clarifai.GENERAL_MODEL, {
            language: this.props.targetLang || "en",
            base64: this.props.imageBase64
        }).then(
            function (response) {
                const concepts = response.outputs[0].data.concepts

                const names = concepts.map(concept => concept.name)

                console.log("THE concepts: ",concepts)

                // do something with response

                this.setState({names: names})
            },
            function (err) {
                // there was an error
            }
        );
    }
}