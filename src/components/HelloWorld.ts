import { Component, Prop, Vue } from 'vue-property-decorator';
import TwitchConnector from '@/connector/TwitchConnector';
import YouTubeConnector from '@/connector/YoutubeConnector';
import { IChat } from '@/IChat';
import combineJosa from '@/combineJosa';

const connectors = [
  new TwitchConnector('namse_'),
  new YouTubeConnector('UCLQyQrwUpXasp7ejfQsjS0g'),
];

const selfDisplayCommand = '!자기과시 ';
const defaultText = '당신은 오늘 OOO을/를 하였습니다. 명령어( !자기과시 OOO )';
function generateSelfDisplay(username, whatTsuDid) {
  return `${combineJosa(username, '은/는')} 오늘 ${combineJosa(whatTsuDid, '을/를')} 하였습니다!`;
}

const selfDisplayMap: {[username: string]: string} = {};

let onUpdate = () => {};

connectors.forEach((connector) => {
  connector.onChat = (chat: IChat) => {
    console.log('chat : ', chat);

    const { content, username } = chat;
    if (!content.startsWith(selfDisplayCommand)) {
      return;
    }
    const selfDisplay = content.substr(selfDisplayCommand.length).replace(/\s/g, '');
    selfDisplayMap[username] = selfDisplay;

    onUpdate();
  };
});

@Component
export default class HelloWorld extends Vue {
  public readonly velocity = 75;
  public animationDuration = 0;
  public text: string = '';

  public $refs!: {
    text: HTMLDivElement,
    container: HTMLDivElement,
  };
  public mounted() {
    this.updateText();
    onUpdate = () => { this.updateText(); };
  }

  public updated() {
    this.$nextTick(() => {
      const totalWidth = this.$refs.text.getBoundingClientRect().width
      + this.$refs.container.getBoundingClientRect().width;
      console.log('updated ', totalWidth);
      this.animationDuration = totalWidth / this.velocity;
    });
  }

  private updateText() {
    this.text = Object.entries(selfDisplayMap).reduce((prev, [username, selfDisplay]) => {
      return `${prev} / ${generateSelfDisplay(username, selfDisplay)}`;
    }, defaultText);
  }
}
