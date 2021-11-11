
import { _decorator, Component, Node, game, director } from 'cc';
const { ccclass, property } = _decorator;
import { ConfigInfo, State } from './Config';
import { PlayCode, Frame } from './Config';




/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Tue Oct 26 2021 17:15:49 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/script/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    private static instance: GameManager;

    public Room: MGOBE.Room = new MGOBE.Room();
    public PlayerName: string = "jourmey.top";
    public GameState = State.Start;

    public onRecvPlayersFrame: (event: MGOBE.types.BroadcastEvent<MGOBE.types.Frame>) => any;

    public static Instance(): GameManager {
        if (!this.instance) {
            this.instance = new GameManager();
        }
        return this.instance;
    }

    onLoad() {
        GameManager.instance = this;
    }

    SetPlayerName(playerId: string) {
        this.PlayerName = playerId
        console.log("用户名修改为:" + playerId);
    }

    GetPlayerId(): string {
        return MGOBE.Player.id;
    }


    start() {
        // game.addPersistRootNode(this.node);
    }


    LoadScene(name: string) {
        director.loadScene(name)
    }

    InitMGOBE(callback: MGOBE.types.ReqCallback<MGOBE.types.InitRsp>) {
        // 接受客户端消息广播
        this.Room.onRecvFromClient = event => {
            console.log("接受客户端消息广播:" + event.data.msg);
        }
        // 房间帧消息广播回调接口
        // 回调帧同步
        this.Room.onRecvFrame = event => {
            if (event != null && event.data != null && event.data.frame != null &&
                event.data.frame.items != null && event.data.frame.items.length != 0) {
                if (this.onRecvPlayersFrame != null) {
                    this.onRecvPlayersFrame({ data: event.data.frame, seq: event.seq })
                }
            }
            // console.log("<<<<<" + event.data.frame);
        }

        const gameInfoPara: MGOBE.types.GameInfoPara = {
            gameId: ConfigInfo.gameId,
            openId: this.PlayerName,
            secretKey: ConfigInfo.secretKey,
        }

        const configPara: MGOBE.types.ConfigPara = {
            url: ConfigInfo.url,
            isAutoRequestFrame: true,
            cacertNativeUrl: "",
        }

        MGOBE.Listener.init(gameInfoPara, configPara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {
                MGOBE.Listener.add(this.Room!);
                callback(event)
                console.log("初始化成功" + event);
            }
        });
    }

    StartGame() {
        const changeRoomPara: MGOBE.types.ChangeRoomPara = {
            customProperties: ConfigInfo.GAMING,
        }
        this.Room?.changeRoom(changeRoomPara);

        this.Room?.startFrameSync({}, event => {
            this.GameState = State.Gaming;
            console.log("帧同步开始:");
        })
    }


    SendFrame(frame: Frame) {
        if (this.GetGaing() == false) {
            return
        }
        const sendFramePara: MGOBE.types.SendFramePara = {
            data: frame,
        }
        this.Room.sendFrame(sendFramePara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {
                // console.log(">>>>>" + frame);
            }
        });
    }


    GetGaing(): boolean {
        return this.GameState == State.Gaming;
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
