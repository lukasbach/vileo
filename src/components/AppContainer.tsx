import * as React from "react";

export const AppContainer: React.FC<{
  title: string;
  className?: string;
}> = props => {
  return (
    <div className={"app-container-inner animated fadeIn faster " + props.className}>
      <header className="no-select">
        Vileo
      </header>
      <h1 className="no-select">{ props.title }</h1>
      { props.children }
    </div>
  )
};
