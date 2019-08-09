import React, { FunctionComponent, useState } from "react";

interface IProps {}
const Layout: FunctionComponent<IProps> = props => (
  <div>
    LAYOUT
    {props.children}
  </div>
);

export default Layout;
