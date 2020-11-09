// from https://stackoverflow.com/questions/48156902/how-can-i-draw-red-horizontal-line-in-react/48156940

import React, { Component } from "react";

export const ColoredHrLine = ({ color, height }) => (
    <hr
        style={{
            color: color ,
            backgroundColor: color,
            height: height
        }}
    />
);
