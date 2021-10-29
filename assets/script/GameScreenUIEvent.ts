
import { _decorator, Component, Node, Button, EditBox } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameScreenUIEvent
 * DateTime = Tue Oct 26 2021 17:57:26 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = GameScreenUIEvent.ts
 * FileBasenameNoExtension = GameScreenUIEvent
 * URL = db://assets/script/GameScreenUIEvent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameScreenUIEvent')
export class GameScreenUIEvent extends Component {

    @property({ type: Button })
    Button_Init: Button | null = null;

    @property({ type: Button })
    Button_MatchRoom: Button | null = null;

    @property({ type: Button })
    Button_StartGame: Button | null = null;

    @property({ type: EditBox })
    EditBox_PlayId: EditBox | null = null;

    start() {
        this.Button_Init?.node.on(Node.EventType.TOUCH_START, this.Button_Init_Click);
        this.Button_MatchRoom?.node.on(Node.EventType.TOUCH_START, this.Button_MatchRoom_Click);
        this.Button_StartGame?.node.on(Node.EventType.TOUCH_START, this.Button_StartGame_Click);
        this.EditBox_PlayId?.node.on("text-changed", this.callback, this);
    }

    callback(editbox: EditBox) {
        GameManager.Instance().SetPlayerId(editbox.string);
    }

    Button_Init_Click() {
        GameManager.Instance().InitMGOBE();

    }
    Button_MatchRoom_Click() {
        GameManager.Instance().MatchRoom();
    }
    Button_StartGame_Click() {
        GameManager.Instance().StartGame();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
