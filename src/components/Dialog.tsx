import * as React from "react";
import ReactDOM from "react-dom";

export const Dialog: React.FC<{
  title: string | React.ReactNode;
}> = props => {

  return ReactDOM.createPortal((
    <div className="dialog animated fadeIn">
      <div className="app-container-inner">
        <h1 className="no-select">{ props.title }</h1>
        { props.children }
      </div>
    </div>
  ), document.getElementById('portal')!)
};
