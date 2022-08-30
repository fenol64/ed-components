import React from 'react';
import { Image } from 'react-native';

const EdImage = ({ src, url, width, height, base64, style, ...props }) => {

    var file = null;

    if (!base64) file = src;
    else file = { uri: src };

    if (!width) width = '100%';
    if (!height) height = '100%';

    // check if width and height has %
    if (width.indexOf('%') == -1) width = parseFloat(width);
    if (height.indexOf('%') == -1) height = parseFloat(height);

    // if (!width.contains("%")) width = parseFloat(width);
    // if (!height.contains("%")) height = parseFloat(height);

    return <Image source={file} style={{ width, height, ...style }} {...props} resizeMode="stretch" />;
};

export default EdImage;