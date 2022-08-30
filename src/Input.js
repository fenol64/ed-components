import React from 'react';
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const EdInput = ({ type, label, width, grouped, state, value, fill, ...props }) => {
    const helperStyle = { marginLeft: 5, backgroundColor: "#212121", color: "#f2f2f2", opacity: 0.95, paddingHorizontal: 3, borderRadius: 5, paddingHorizontal: 5 };

    width = width ? width : '100%';
    var grouped_width = `${parseInt(`${width}`.replace('%', '')) - 1}%`;
    if (grouped) width = grouped_width;

    var boxStyle = {
        // margin: grouped ? "1% 1% 0 0" : "1% 0",
        marginTop: grouped ? 0 : 0,
        marginLeft: grouped ? 0 : 0,
        marginRight: grouped ? "1%" : 0,
        marginBottom: "1%",
        borderRadius: 2,
        paddingTop: 3,
        borderWidth: .8,
        borderColor: "#999",
        backgroundColor: "#fff",
    };

    if (width) boxStyle.flexBasis = width;
    if (fill) boxStyle.flex = 1;

    if (props.style) {
        if (props.style.borderColor) boxStyle.borderColor = props.style.borderColor;
        if (props.style.backgroundColor) boxStyle.backgroundColor = props.style.backgroundColor;

        if (props.style.marginTop) boxStyle.marginTop = props.style.marginTop;
        if (props.style.marginBottom) boxStyle.marginBottom = props.style.marginBottom;
        if (props.style.marginLeft) boxStyle.marginLeft = props.style.marginLeft;
        if (props.style.marginRight) boxStyle.marginRight = props.style.marginRight;
        if (props.style.margin) boxStyle.margin = props.style.margin;
    }


    const inputTypes = {};
    value = (value) ? value.toString() : "";

    if (!type) type = "text";

    const inputHandler = (name, value) => {
        if (props.onChange) props.onChange(name, value);
        if (props.onChangeText) props.onChangeText(value);
        if (props.onChangeValue) props.onChangeValue(value);
        if (props.onChangeInput) props.onChangeInput({ name, value })
    };

    if (props.required === true) label = `${label} *`;

    if (props.default !== undefined && (value === undefined || value == null || value == "")) value = `${props.default}`;

    if (props.maxLength) value = value.substring(0, props.maxLength);

    var inputStyle = {
        padding: 0,
        paddingHorizontal: 8,
        paddingBottom: 3,
        borderRadius: 0,
        margin: 0,
        borderWidth: 0,
    };

    var labelStyle = {
        fontSize: 10,
        marginHorizontal: 8,
        textTransform: "uppercase",
        color: "#636363",
        fontWeight: (props.required === true) ? "bold" : "normal",
    }
    if (props.labelStyle) labelStyle = { ...labelStyle, ...props.labelStyle };

    inputTypes.text = <View flexBasis={width} grouped={grouped} style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput placeholder={props.placeholder || label} value={value || ""} onChangeText={e => inputHandler(props.name, e)} {...props} style={inputStyle} />
    </View>

    inputTypes.textarea = <View flexBasis={width} grouped={grouped} style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput placeholder={props.placeholder || label} value={value || ""} onChangeText={e => inputHandler(props.name, e)} multiline={true} numberOfLines={props.lines || 4} style={{ height: "auto", textAlignVertical: 'top', ...inputStyle }} {...props} />
    </View>

    inputTypes.password = <View flexBasis={width} grouped={grouped} style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput placeholder={props.placeholder || label} secureTextEntry={true} value={value || ""} onChangeText={e => inputHandler(props.name, e)} {...props} style={inputStyle} />
    </View>

    inputTypes.number = <View flexBasis={width} grouped={grouped} style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput placeholder={props.placeholder || label} keyboardType="number-pad" value={value || ""} onChangeText={e => inputHandler(props.name, e)} {...props} style={inputStyle} />
    </View>

    inputTypes.select = <View flexBasis={width} grouped={grouped} style={boxStyle}>
        <Text style={labelStyle}>{label}</Text>
        <View style={{ height: 30, overflow: "hidden", justifyContent: "center" }}>
            <Picker selectedValue={value || ""} onValueChange={(e) => inputHandler(props.name, e)} {...props} >
                <Picker.Item label="SELECIONE" value="" disabled={(props.required === true)} />
                {props.options && props.options.map((item, index) => <Picker.Item key={index} label={item.label ? `${item.label}`.toUpperCase() : item.value} value={item.value} />)}
            </Picker>
        </View>
    </View>

    inputTypes.checkbox = <View style={{ flexDirection: "row", alignItems: "center", marginEnd: 12, ...props.style }} flexBasis={width} grouped={grouped}>
        <TouchableOpacity disabled={(props.disabled === true)} onPress={() => { inputHandler(props.name, (!value)) }} style={{ flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center' }}>
            <CheckBox disabled={(props.disabled === true)} value={(value) ? true : false} onValueChange={(e) => inputHandler(props.name, e)} />
            <Text style={{ fontWeight: (props.required ? "bold" : "normal") }}>{label}</Text>
        </TouchableOpacity>
        {props.info && <TouchableOpacity onPress={() => { ToastAndroid.showWithGravity(props.info, ToastAndroid.LONG, ToastAndroid.TOP) }} style={helperStyle}><Text style={{ fontSize: 12, color: '#999' }}>?</Text></TouchableOpacity>}
    </View>


    return inputTypes[type] || inputTypes.text;
}

export default EdInput;