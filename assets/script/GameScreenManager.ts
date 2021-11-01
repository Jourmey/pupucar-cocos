
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
    private player: PlayerNode = null;

    // 队友
    @property({ type: Prefab })
    Teammate: Prefab | null = null;
    private teammates: { [key: string]: TeammateNode } = {};

    start() {
        this.Button_Init?.node.on(Node.EventType.TOUCH_START, this.Button_Init_Click);
        this.Button_MatchRoom?.node.on(Node.EventType.TOUCH_START, this.Button_MatchRoom_Click);
        this.Button_StartGame?.node.on(Node.EventType.TOUCH_START, this.Button_StartGame_Click);
        this.EditBox_PlayId?.node.on("text-changed", this.callback, this);


        GameManager.Instance().onRecvPlayersFrame = event => {
            event.data.items.forEach(e => {
                let f = e.data as Frame
                if (e.playerId == GameManager.Instance().GetPlayerId()) {
                    this.player.Script.Move(f);
                    console.log("m <= " + e.playerId, f);
                } else {

                    let t = this.teammates[e.playerId]
                    if (t != null && t.Init == true) {
                        t.Script.Move(f)
                    }

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


                // 清理 
                if (this.player != null && this.player.Init == true) {
                    this.node.removeChild(this.player.Node);
                    this.player.Init = false
                }

                for (const key in this.teammates) {
                    const element = this.teammates[key];
                    if (element != null && element.Init == true) {
                        this.node.removeChild(element.Node);
                        element.Init = false
                    }
                }

                // 新增
                event.data.playerList.forEach(e => {
                    this.addPlayer(e.id != GameManager.Instance().GetPlayerId(), e.id)
                })
            }
        }
    }


    addPlayer(teammate: boolean, id: string) {
        if (teammate) {
            let node = instantiate(this.Teammate!) as Node;
            let script = node.getComponent(Teammate);
            script.test();
            this.teammates[id] = {
                Node: node,
                Script: script,
                Init: true,
            };
            this.node.addChild(node);
        } else {
            let node = instantiate(this.Player!) as Node;
            let script = node.getComponent(Player);
            script.test();
            this.player = {
                Id: id,
                Node: node,
                Script: script,
                Init: true,
            };
            this.node.addChild(node);
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

export interface PlayerNode {
    Init: boolean;
    Id: string;
    Node: Node;
    Script: Player;
}


export interface TeammateNode {
    Init: boolean;
    Node: Node;
    Script: Teammate;
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
