import React from 'react';
import { Text, View } from "react-native";

const EdFormGrid = ({ title, info, aside, justifyContent, alignEnd, children, borderTop, borderBottom, bordered, style, gridStyle = {}, ...props }) => {
    var containerStyle = { marginBottom: 16, flexDirection: 'row', flexWrap: 'wrap', ...style };

    var titleStyle = { marginBottom: 8, width: "100%", fontSize: 18, fontWeight: "bold", textTransform: "uppercase" };
    var infoStyle = { marginBottom: 8, width: "100%", fontSize: 14, color: "#787878" };
    var gridStyle = { flexDirection: 'row', width: "100%", flexWrap: 'wrap', justifyContent: alignEnd ? "flex-end" : "flex-start", alignItems: "center", ...gridStyle };

    if (borderTop) {
        containerStyle.borderTopWidth = .8;
        containerStyle.borderTopColor = "#bbbbbb";
        containerStyle.paddingTop = 16;
    }
    if (borderBottom) {
        containerStyle.borderBottomWidth = .8;
        containerStyle.borderBottomColor = "#bbbbbb";
        containerStyle.paddingBottom = 16;
    }
    if (bordered) {
        containerStyle.borderWidth = .8;
        containerStyle.borderColor = "#bbbbbb";
        containerStyle.padding = 8;
    }

    containerStyle.borderRadius = 2;

    if (aside) {
        containerStyle = { ...containerStyle, flexDirection: "row", };
        titleStyle = { ...titleStyle, marginTop: 0, width: "30%", };
        if (title) gridStyle = { ...gridStyle, width: "70%", };
    }

    return <View style={containerStyle}>
        {title && <Text style={titleStyle}>{title}</Text>}
        {info && <Text style={infoStyle}>{info}</Text>}
        <View style={gridStyle ?? {}}>{(children) && children}</View>
    </View>
}

export default EdFormGrid;