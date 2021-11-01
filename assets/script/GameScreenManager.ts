
import { _decorator, instantiate, Component, Node, Button, EditBox, Prefab } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;
import { Player } from './player';
import { Teammate } from './teammate';
import { PlayCode, Frame } from './Config';

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

    // 用户
    @property({ type: Prefab })
    Player: Prefab | null = null;
    private scriptPlayer: Player;
    // 队友
    @property({ type: Prefab })
    Teammate: Prefab | null = null;
    private scriptTeammate: Teammate;


    start() {
        this.Button_Init?.node.on(Node.EventType.TOUCH_START, this.Button_Init_Click);
        this.Button_MatchRoom?.node.on(Node.EventType.TOUCH_START, this.Button_MatchRoom_Click);
        this.Button_StartGame?.node.on(Node.EventType.TOUCH_START, this.Button_StartGame_Click);
        this.EditBox_PlayId?.node.on("text-changed", this.callback, this);

        var player = instantiate(this.Player!) as Node;
        this.scriptPlayer = player.getComponent(Player);
        this.scriptPlayer.test();
        this.node.addChild(player);

        var teammate = instantiate(this.Teammate!) as Node;
        this.scriptTeammate = teammate.getComponent(Teammate);
        this.scriptTeammate.test();
        this.node.addChild(teammate);

        GameManager.Instance().onRecvPlayersFrame = event => {
            event.data.items.forEach(e => {
                let f = e.data as Frame
                if (e.playerId == GameManager.Instance().GetPlayerId()) {
                    this.scriptPlayer.Move(f);
                    console.log("m <= " + e.playerId, f);
                } else {
                    this.scriptTeammate.Move(f);
                    console.log("o <= " + e.playerId, f);
                }
            });
        }

        GameManager.Instance().onRoomInfoChange = event => {
            if (event != null && event.data != null) {
                console.log("-----当前用户列表-----");
                event.data.playerList.forEach(e => {
                    console.log(e.id, e.name);
                })
                console.log("----------");
            }
        }
    }

    callback(editbox: EditBox) {
        GameManager.Instance().SetPlayerName(editbox.string);
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
