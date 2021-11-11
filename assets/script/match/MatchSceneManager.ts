
import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;
import { GameManager } from '../GameManager';
import { ConfigInfo, State } from '../Config';
import { House } from '../component/house';


/**
 * Predefined variables
 * Name = MatchSceneManager
 * DateTime = Thu Nov 11 2021 15:49:04 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = MatchSceneManager.ts
 * FileBasenameNoExtension = MatchSceneManager
 * URL = db://assets/script/match/MatchSceneManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('MatchSceneManager')
export class MatchSceneManager extends Component {

    // 匹配房间
    @property({ type: Button })
    Button_MatchRoom: Button | null = null;

    // 开始
    @property({ type: Button })
    Button_StartGame: Button | null = null;

    // 房间
    @property({ type: House })
    House: House | null = null;

    start() {
        this.Button_MatchRoom?.node.on(Node.EventType.TOUCH_START, this.Button_MatchRoom_Click);
        this.Button_StartGame?.node.on(Node.EventType.TOUCH_START, this.Button_StartGame_Click);
        GameManager.Instance().Room.onUpdate = event => {
            console.log("房间状态变更:" + event.roomInfo.customProperties);
            if (event.roomInfo.customProperties == ConfigInfo.GAMING) {
                GameManager.Instance().GameState = State.Gaming;

                GameManager.Instance().LoadScene("game");
                console.log("其他玩家开启游戏");
            }

            console.log("房间信息更新");
            this.roomInfoChange(event.roomInfo)
        }
        GameManager.Instance().Room.onJoinRoom = event => {
            console.log("新玩家加入:" + event.data.joinPlayerId);
        }
    }


    Button_MatchRoom_Click() {
        //回调 onUpdate 
        GameManager.Instance().Room?.changeRoom({});

        const playerInfo: MGOBE.types.PlayerInfoPara = {
            name: GameManager.Instance().PlayerName,
            customPlayerStatus: 1,
            customProfile: "",
        }

        const roomPara: MGOBE.types.MatchRoomPara = {
            playerInfo,
            maxPlayers: 2,
            roomType: ConfigInfo.START,
        };

        GameManager.Instance().Room?.matchRoom(roomPara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {

                console.log("匹配成功 ID:" + event.data?.roomInfo.id);
                // console.log("当前房间玩家列表：" + event.data?.roomInfo.playerList);
                // console.log("MGOBE.Player.id" + MGOBE.Player.id);
            }
        })
    }
    Button_StartGame_Click() {
        GameManager.Instance().StartGame();
    }


    private roomInfoChange(r: MGOBE.types.RoomInfo) {
        if (r != null) {

            let t: string[] = []

            console.log("-----当前用户列表-----");
            r.playerList.forEach(e => {
                t.push(e.name);
                console.log(e.id, e.name);
            })
            console.log("----------");

            this.House.UpdateText(t)
        }
    }
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
