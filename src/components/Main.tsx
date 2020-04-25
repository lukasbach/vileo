import * as React from "react";
import {useState} from "react";
import {Page} from "../Page";
import {RecordingSettings} from "./RecordingSettings";
import {RecordingConfiguration} from "../RecordingConfiguration";
import {RecordingProcess} from "./RecordingProcess";
import {Finished} from "./Finished";
import {Welcome} from "./Welcome";

export const Main: React.FC<{}> = props => {
  const [step, setStep] = useState(Page.Welcome);
  const [cfg, setCfg] = useState<RecordingConfiguration>();
  const [recording, setRecording] = useState<[Blob[], number]>();

  switch (step) {
    case Page.Welcome:
      return (
        <Welcome onChangePage={setStep} />
      )
    case Page.Configure:
      return (
        <RecordingSettings
          startRecording={(cfg) => {
            setCfg(cfg);
            setStep(Page.RecordingProcess);
          }}
          onBack={() => setStep(Page.Welcome)}
        />
      )
    case Page.RecordingProcess:
      return (
        <RecordingProcess
          recordingConfig={cfg!}
          onStop={(data, length) => {
            setRecording([data, length]);
            setStep(Page.Finished);
          }}
        />
      );
    case Page.Finished:
      return (
        <Finished
          blobs={recording![0]}
          length={recording![1]}
          onRestart={() => setStep(Page.Configure)}
        />
      )
    default:
      return (
        <div>
          Content
        </div>
      )
  }

};
