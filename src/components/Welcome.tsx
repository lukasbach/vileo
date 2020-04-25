import * as React from "react";
import {AppContainer} from "./AppContainer";
import {Page} from "../Page";
import {Button} from "./Button";
import {Dialog} from "./Dialog";

export const Welcome: React.FC<{
  onChangePage: (page: Page) => any;
}> = props => {
  // @ts-ignore
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // @ts-ignore
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // @ts-ignore
  const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  // @ts-ignore
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  // @ts-ignore
  const isEdge = !isIE && !!window.StyleMedia;
  // @ts-ignore
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  const isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
  const isBlink = (isChrome || isOpera) && !!window.CSS;


  return (
    <AppContainer title="Vileo">
      <p>
        Vileo is a simple video recording tool for recording your screen, your webcam or audio devices.
      </p>
      <p>
        It works from within your browser and can be started right away!
      </p>

      {
        isFirefox && (
          <div className="card">
            <h2 className="no-select">
              <img height="32" width="32" src="https://unpkg.com/simple-icons@v2/icons/mozillafirefox.svg" style={{ filter: 'invert(1)' }} />
              &nbsp;
              You're running Firefox!
            </h2>
            <p>Recording desktop audio might not be possible here. Try Google Chrome if you need desktop audio.</p>
          </div>
        )
      }

      {
        isEdge && (
          <div className="card">
            <h2 className="no-select">
              <img height="32" width="32" src="https://unpkg.com/simple-icons@v2/icons/microsoftedge.svg" style={{ filter: 'invert(1)' }} />
              &nbsp;
              You're running Microsoft Edge!
            </h2>
            <p>The Recorder might not work on your browser. Try Google Chrome instead.</p>
          </div>
        )
      }

      {
        isIE && (
          <div className="card">
            <h2 className="no-select">
              <img height="32" width="32" src="https://unpkg.com/simple-icons@v2/icons/internetexplorer.svg" style={{ filter: 'invert(1)' }} />
              &nbsp;
              You're running Internet Explorer!
            </h2>
            <p>The Recorder might not work on your browser. Try Google Chrome instead.</p>
          </div>
        )
      }

      <div className="bottom-actions">
        <Button icon="arrow_forward" onClick={() => props.onChangePage(Page.Configure)}>
          Let's go!
        </Button>
      </div>
    </AppContainer>
  )
};
