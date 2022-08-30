import React, { useEffect } from 'react';
import { TouchableOpacity, Text, Image, Animated } from 'react-native';

var spin_value = new Animated.Value(0);

const EdButton = ({ title, label, image, onPress, color, disabled, animated, style = {}, ...props }) => {
    const spin = spin_value.interpolate({ inputRange: [0, 1], outputRange: ['5deg', '355deg'], });
    const startAnimation = () => {
        spin_value.setValue(0);
        if (animated) Animated.timing(spin_value, { toValue: 1, duration: 600, useNativeDriver: false, }).start((o) => (o.finished && animated) && startAnimation());
    };

    useEffect(() => startAnimation(), [animated]);

    label = label ? label : title ? title : false;

    const colors = {}
    color = color ? color : "transparent"
    colors["dark"] = { bg: "#212121", txt: "#fff" }
    colors["light"] = { bg: "#dddddd", txt: "#212121" }
    colors["success"] = { bg: "#393", txt: "#f2f2f2" }
    colors["danger"] = { bg: "#c33", txt: "#f2f2f2" }
    colors["warning"] = { bg: "#f90", txt: "#f2f2f2" }
    colors["info"] = { bg: "#2cd", txt: "#f2f2f2" }
    colors["primary"] = { bg: "#0d6efd", txt: "#f2f2f2" }
    colors["secondary"] = { bg: "#666666", txt: "#f2f2f2" }
    colors["transparent"] = { bg: "transparent", txt: "#212121" }

    if (!colors[color]) color = "transparent";

    const sizes = {};
    sizes.sm = { width: 16, height: 16, fontSize: 14, margin: 8 };
    sizes.md = { width: 24, height: 24, fontSize: 20, margin: 16 };
    sizes.lg = { width: 32, height: 32, fontSize: 24, margin: 16 };
    sizes.xl = { width: 48, height: 48, fontSize: 36, margin: 16 };

    const size = sizes[props.size ?? "md"];
    if (props.wide) size.width = size.width * 1.2;

    const btnStyle = {
        // borderWidth: .5,
        borderColor: "#dddddd",
        flexDirection: "row",
        backgroundColor: colors[color] ? colors[color].bg : color,
        borderRadius: style.borderRadius ?? 3,
        maxHeight: 60,
        // minWidth: style.width ?? 20,
        width: style.width ?? null,
        paddingHorizontal: (size.margin) ? size.margin : 4,
        paddingVertical: (size.margin) ? size.margin / 2 : 4,
        justifyContent: style.justifyContent ?? "center",
        alignItems: "center",
        opacity: (disabled) ? 0.5 : 1,

        ...style ?? {},
    };



    const textStyle = {
        color: colors[color].txt,
        fontSize: props.textStyle ? (props.textStyle.fontSize ? props.textStyle.fontSize : size.fontSize) : size.fontSize,
        textTransform: "uppercase",
        fontWeight: 'bold',
        textAlign: "center",

        ...props.textStyle ?? {}
    }

    if (props.textColor) textStyle.color = colors[props.textColor] ? colors[props.textColor].bg : props.textColor;

    const iconStyle = {
        width: (label) ? size.width - 2 : size.width,
        height: (label) ? size.height - 2 : size.height,
        resizeMode: 'contain',
        marginLeft: (label) ? size.margin : 0,

        ...props.iconStyle,
    }

    if (!onPress) onPress = () => { }

    return <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled} {...props}>
        {typeof label == "string" && <Text style={textStyle}>{label}</Text>}
        {typeof props.children == "string" ? <Text style={textStyle}>{props.children}</Text> : props.children}
        {(image || props.icon) && <>
            {(animated || props.spin)
                ? <Animated.Image source={image || props.icon} style={{ transform: [{ rotate: spin }], ...iconStyle }} />
                : <Image source={image || props.icon} style={iconStyle} />
            }
        </>
        }
    </TouchableOpacity>
};

export default EdButton;