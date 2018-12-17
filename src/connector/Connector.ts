import { IChat } from '@/IChat';

export default class Connector {
  public onChat: ((chat: IChat) => any) | undefined;
  public destory() {
    this.onChat = undefined;
  }

  protected pushChat(chat: IChat) {
    if (!this.onChat) {
      return;
    }
    this.onChat(chat);
  }
}
