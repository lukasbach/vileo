import * as React from "react";

export const Button: React.FC<{
  icon?: string;
  onClick?: () => any;
}> = props => {

  return (
    <button className="btn no-select" onClick={props.onClick}>
      { props.icon && <i className="material-icons">{ props.icon }</i> }
      { props.children }
    </button>
  )
};
