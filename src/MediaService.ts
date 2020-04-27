export class MediaService {


  public static async getScreen(withAudio: boolean): Promise<MediaStream> {
    console.log(1, withAudio)
    const screen = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: withAudio })
    console.log(2)
    return screen
  }

  public static async getWebcam(withAudio: boolean): Promise<MediaStream> {
    return await (navigator.mediaDevices as any).getUserMedia({ video: true, audio: withAudio });
  }

  public static async getOnlyAudio() {
    return await navigator.mediaDevices.getUserMedia({ video: false });
  }

  public static async getDevices() {
    return await navigator.mediaDevices.enumerateDevices();
  }

  public static mergeTracks(video: MediaStream, audio: MediaStream[]): MediaStream | null {
    let audioCopy = audio;
    let videoAudioTrack = video.getAudioTracks()[0];

    if (!videoAudioTrack && audioCopy[0]) {
      videoAudioTrack = audioCopy[0].getAudioTracks()[0];
      audioCopy = audioCopy.slice(1);
    }

    if (!videoAudioTrack) {
      return null;
    }

    const audioCtx = new AudioContext();
    const dst = audioCtx.createMediaStreamDestination();
    const audioStream = new MediaStream([videoAudioTrack]);
    audioCtx.createMediaStreamSource(audioStream).connect(dst);
    for (const audioStream of audioCopy) {
      audioCtx.createMediaStreamSource(audioStream).connect(dst);
    }

    const mixedStream = new MediaStream();
    mixedStream.addTrack(dst.stream.getTracks()[0]);
    return mixedStream;
  }
}