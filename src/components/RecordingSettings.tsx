import * as React from "react";
import {AppContainer} from "./AppContainer";
import {Button} from "./Button";
import {MediaService} from "../MediaService";
import {useEffect, useRef, useState} from "react";
import {RecordingConfiguration} from "../RecordingConfiguration";
import {Select} from "./Select";
import {Dialog} from "./Dialog";

export const RecordingSettings: React.FC<{
  startRecording?: (config: RecordingConfiguration) => any;
  onBack?: () => any;
}> = props => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | undefined>(undefined);
  const [audioMediaDevices, setAudioMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [isVideoADisplay, setIsVideoADisplay] = useState(false);
  const [isChromeInfoDialogShown, setIsChromeInfoDialogShown] = useState(false);

  // @ts-ignore
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  const onUnsetVideoStream = () => {
    videoMediaStream?.getTracks().forEach(track => track.stop());
    setVideoMediaStream(undefined);
  };

  const onSetVideoStream = (stream: MediaStream) => {
    setVideoMediaStream(stream);
    stream.getVideoTracks()[0].addEventListener("ended", () => setVideoMediaStream(undefined));
  };

  useEffect(() => {
    if (videoMediaStream && videoRef.current) {
      videoRef.current.srcObject = videoMediaStream;
      videoRef.current.volume = 0;
      videoRef.current.play();
    }
  }, [videoMediaStream]);

  return (
    <AppContainer title="Configure Recording">
      {
        isChromeInfoDialogShown && (
          <Dialog
            title={(
              <>
                <img height="32" width="32" src="https://unpkg.com/simple-icons@v2/icons/googlechrome.svg" style={{ filter: 'invert(1)' }} />
                &nbsp;
                Sharing audio under Chrome
              </>
            )}
          >
            <p>
              By default, desktop recordings do not include audio. Chrome supports recording desktop audio by
              checking the option <i>Share&nbsp;Audio</i> in the next dialog, however{' '}
              <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1074529" target="_blank" rel="noopener noreferrer">a Chrome bug</a>{' '}
              seems to make sharing audio fail when recording entire screens.
            </p>
            <p>
              You can however record a chrome tab with shared audio. Alternatively you can record windows or screens
              without sharing audio.
            </p>
            <div className="bottom-actions">
              <Button icon="arrow_back" onClick={() => {
                setIsChromeInfoDialogShown(false);
              }}>
                Go back
              </Button>
              <Button icon="arrow_forward" onClick={() => {
                setIsChromeInfoDialogShown(false);
                MediaService.getScreen(true).then(onSetVideoStream);
                setIsVideoADisplay(true);
              }}>
                Okay, Start Recording
              </Button>
            </div>
          </Dialog>
        )
      }

      {
        videoMediaStream && (
          <div className="video-preview animated zoomIn">
            <p>Recording not<br />yet started</p>
            <video ref={videoRef} />
          </div>
        )
      }

      {
        videoMediaStream ? (
          <div className="card animated zoomIn faster">
            { isVideoADisplay && <h2 className="no-select"><i className="material-icons">tv</i>Video Device</h2> }
            { !isVideoADisplay && <h2 className="no-select"><i className="material-icons">videocam</i>Video Device</h2> }
            <p>{ isVideoADisplay ? 'Display device setup for recording' : 'Webcam setup for recording' }</p>
            <div className="actions">
              <Button icon="delete" onClick={() => onUnsetVideoStream()}>Remove</Button>
            </div>
          </div>
        ) : (
          <div className="card">
            <h2 className="no-select"><i className="material-icons">movie</i>No Video Device selected</h2>
            <p>You need to specify a video device.</p>
            <div className="actions">
              <Button icon="tv" onClick={() => {
                if (isChrome) {
                  setIsChromeInfoDialogShown(true);
                } else {
                  MediaService.getScreen(true).then(onSetVideoStream);
                  setIsVideoADisplay(true);
                }
              }}>
                Display
              </Button>

              <Button icon="videocam" onClick={() => {
                MediaService.getWebcam(true).then(onSetVideoStream);
                setIsVideoADisplay(false);
              }}>
                Webcam
              </Button>
            </div>
          </div>
        )
      }

      {
        audioMediaDevices.map(device => (
          <div className="card animated zoomIn fast">
            <h2 className="no-select"><i className="material-icons">mic</i>Audio Device</h2>
            <p>{ device.label }</p>
            <div className="actions">
              <Button icon="delete" onClick={() => setAudioMediaDevices(audioMediaDevices.filter(d => d.deviceId !== device.deviceId))}>Remove</Button>
            </div>
          </div>
        ))
      }

      <Select
        onChange={selection => selection && setAudioMediaDevices([...audioMediaDevices, mediaDevices.find(device => device.deviceId === selection)!])}
        title={'Add audio source'}
        dontSelect={true}
        getOptions={async () => {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          const devices = await MediaService.getDevices();
          setMediaDevices(devices);
          return devices
            .filter(device => device.kind === 'audioinput')
            .map(device => ({ id: device.deviceId, value: device.label, icon: 'mic' }));
        }}
      />

      <div className="bottom-actions">
        <Button icon="arrow_back" onClick={props.onBack}>
          Back
        </Button>

        {
          videoMediaStream && (
            <Button icon="fiber_manual_record" onClick={async () => {
              props.startRecording?.({
                video: videoMediaStream,
                audio: await Promise.all(audioMediaDevices.map(device => {
                  return navigator.mediaDevices.getUserMedia({ audio: { deviceId: device.deviceId } })
                }))
              });
            }}>
              Start Recording
            </Button>
          )
        }
      </div>
    </AppContainer>
  )
};
