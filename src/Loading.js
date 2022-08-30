import React from 'react';
import { View } from 'react-native';
import Icon from './Icon.js';

function EdLoading({ isLoading, ...props }) {
    return <View style={{ display: ((isLoading === true) ? "flex" : "none"), position: "absolute", padding: 50, height: "100%", width: "100%", top: 0, justifyContent: "center", alignItems: "center", backgroundColor: "#f2f2f2", zIndex: 999 }}>
        {props.color === 'light' ? <Icon source={require("./assets/light-ine-spinner-third.png")} size="xl" animated />
            : <Icon source={require("./assets/dark-line-spinner-third.png")} size="xl" animated />}
    </View>
}

export default EdLoading;