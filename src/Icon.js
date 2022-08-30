import React, { useEffect } from 'react';
import { Animated, ImageBackground } from 'react-native';

// import { Container } from './styles';

var spin_value = new Animated.Value(0);

const EdIcon = ({ size, color, name, icon, dark, light, animated, spining, ...props }) => {
    const spin = spin_value.interpolate({ inputRange: [0, 1], outputRange: ['5deg', '355deg'], });

    const startAnimation = () => {
        spin_value.setValue(0);
        if (animated) Animated.timing(spin_value, {
            toValue: 1, duration: 600, useNativeDriver: false
        }).start((o) => (o.finished && animated) && startAnimation());
    };

    useEffect(() => startAnimation(), [animated]);

    const sizes = {};
    sizes.sm = { width: 16, height: 16 };
    sizes.md = { width: 24, height: 24 };
    sizes.lg = { width: 32, height: 32 };
    sizes.xl = { width: 48, height: 48 };

    let styleObject = {};
    if (props.style) styleObject = { ...props.style };
    if (size && size.width) styleObject.width = size.width;
    if (size && size.height) styleObject.height = size.height;
    else styleObject = sizes[size ?? 'md'];

    // if (parseInt(size) == size) styleObject = { width: size, height: size };

    if (props.width) styleObject.width = props.width;
    if (props.height) styleObject.height = props.height;

    const theme = dark ? 'dark' : light ? 'light' : 'primary';

    if (spining !== undefined) spining = true;
    if (animated !== undefined) spining = true;

    if (props.source && icon) props.source = icon;

    return <>
        {spining
            ? <Animated.Image source={props.source} style={{ transform: [{ rotate: spin }], ...styleObject }} />
            : <ImageBackground source={props.source} style={styleObject} resizeMode="contain" />
        }
    </>
}

export default EdIcon;