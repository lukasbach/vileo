import * as React from "react";
import {AppContainer} from "./AppContainer";
import {useEffect, useRef, useState} from "react";
import {Button} from "./Button";

export const Finished: React.FC<{
  blobs: Blob[];
  length: number;
  onRestart?: () => any;
}> = props => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      const finalBlob = new Blob(props.blobs, {
        type: 'video/webm'
      });
      videoRef.current.src = window.URL.createObjectURL(finalBlob);
      videoRef.current.play();
      videoRef.current.loop = true;
      videoRef.current.controls = true;
      setSize(finalBlob.size);
    }

  }, []);

  let fileSize = size / 1024;
  let sizeUnit = 'KB';

  if (fileSize > 1024) {
    fileSize = fileSize / 1024;
    sizeUnit = 'MB';
  }
  if (fileSize > 1024) {
    fileSize = fileSize / 1024;
    sizeUnit = 'GB';
  }

  fileSize = Math.round(fileSize * 100) / 100;

  let seconds = Math.floor((props.length / 1000) % 60);
  let minutes = Math.floor((props.length / 1000) / 60);


  return (
    <AppContainer title="Done!">
      {
        (
          <div className="video-preview">
            <video ref={videoRef} />
          </div>
        )
      }

      <p>
        Your video file is <b>{ minutes } minutes and { seconds } seconds</b> long and takes
        up <b>{ fileSize }{ sizeUnit }</b> in space.
      </p>

      <p>
        The file is available as <b>.webm</b> video file, which can be opened by web browsers
        and most video viewers such as VLC.
      </p>

      <div className="bottom-actions">
        <Button
          icon="get_app"
          onClick={() => {
            const url = URL.createObjectURL(new Blob(props.blobs, { type: 'video/webm' }));
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
        >
          Download
        </Button>
        <Button icon="fiber_manual_record" onClick={props.onRestart}>
          Record another one
        </Button>
      </div>
    </AppContainer>
  )
};
