import * as React from "react";
import {AppContainer} from "./AppContainer";
import {Button} from "./Button";
import {MediaService} from "../MediaService";
import {useEffect, useRef, useState} from "react";
import {RecordingConfiguration} from "../RecordingConfiguration";

/*

// get tabStream from chrome.tabCapture.capture
// get micStream from navigator.mediaDevices.getUserMedia
let tabAudioTrack = tabStream.getAudioTracks()[0];
let audioCtx = new AudioContext();
let dst = audioCtx.createMediaStreamDestination();
let tabAudioStream = new MediaStream([tabAudioTrack]);
audioCtx.createMediaStreamSource(tabAudioStream).connect(dst);
audioCtx.createMediaStreamSource(micStream).connect(dst);

let mixedStream = new MediaStream();
mixedStream.addTrack(dst.stream.getTracks()[0]);
 */
export const RecordingProcess: React.FC<{
  recordingConfig: RecordingConfiguration;
  onStop?: (data: Blob[], length: number) => any;
}> = props => {
  const start = useRef(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);
  const blobs = useRef<Blob[]>([]);
  const recorder = useRef<MediaRecorder>();
  const hasStopped = useRef(false);

  const onStop = async () => {
    console.log("Stop")
    if (recorder.current && !hasStopped.current) {
      hasStopped.current = true;
      await recorder.current.stop();
      props.onStop?.(
        blobs.current,
        (new Date()).getTime() - start.current.getTime()
      );
      props.recordingConfig.video?.getTracks().forEach(track => track.stop());
      props.recordingConfig.audio?.forEach(audio => audio.getTracks().forEach(track => track.stop()));
    }
  };

  useEffect(() => {
    if (videoRef.current && !hasStopped.current) {
      if (props.recordingConfig.video) {
        videoRef.current.srcObject = props.recordingConfig.video;
        videoRef.current.volume = 0;
        videoRef.current.play();
      }

      const stream = new MediaStream([
        props.recordingConfig.video!.getVideoTracks()[0],
        MediaService.mergeTracks(props.recordingConfig.video!, props.recordingConfig.audio!)?.getAudioTracks()[0]!
      ]);

      recorder.current = new MediaRecorder(stream);
      recorder.current.start(3000);

      stream.getTracks().forEach(t => t.addEventListener("ended", () => onStop()));

      recorder.current.ondataavailable = e => blobs.current.push(e.data);
      start.current = new Date();
    }
  }, [props.recordingConfig.video, videoRef.current]);

  return (
    <AppContainer title="Recording..." className="recording">
      {
        props.recordingConfig.video && (
          <div className="video-preview">
            <video ref={videoRef} />
          </div>
        )
      }

      <div className="card">
        <h2 className="no-select"><i className="material-icons">camera_roll</i>Your recording is running</h2>
        <p>Your specified devices are being recorded.</p>
        <div className="actions">
          <Button icon="check" onClick={onStop}>
            Stop Recording
          </Button>
        </div>
      </div>
    </AppContainer>
  )
};
