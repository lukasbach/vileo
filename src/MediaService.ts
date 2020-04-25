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
}