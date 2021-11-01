
import { _decorator, Component, Node, game, } from 'cc';
const { ccclass, property } = _decorator;
import Config from './Config';
import { PlayCode, Frame } from './Config';

enum GameState {
    Start = 0,
    Gaming = 1,
    End = 2
}


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

    private room: MGOBE.Room = new MGOBE.Room();
    private playerName: string = Date.now().toString(36);
    private gameState = GameState.Start;

    // public onRecvPlayerFrame: (event: MGOBE.types.BroadcastEvent<RFrame[]>) => any;
    public onRecvPlayersFrame: (event: MGOBE.types.BroadcastEvent<MGOBE.types.Frame>) => any;
    public onRoomInfoChange: (event: MGOBE.types.BroadcastEvent<MGOBE.types.RoomInfo>) => any;

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
        this.playerName = playerId
        console.log("用户名修改为:" + playerId);
    }

    GetPlayerId(): string {
        return MGOBE.Player.id;
    }


    start() {
        game.addPersistRootNode(this.node);
    }


    InitMGOBE() {
        this.room.onUpdate = event => {
            console.log("房间状态变更:" + event.roomInfo.customProperties);
            if (event.roomInfo.customProperties == Config.GAMING) {
                this.gameState = GameState.Gaming;
                console.log("其他玩家开启游戏");
            }
        }
        this.room.onJoinRoom = event => {
            if (this.onRoomInfoChange != null) {
                this.onRoomInfoChange({
                    data: event.data?.roomInfo,
                    seq: event.seq,
                });
            }

            console.log("新玩家加入:" + event.data.joinPlayerId);
        }
        // 接受客户端消息广播
        this.room.onRecvFromClient = event => {
            console.log("接受客户端消息广播:" + event.data.msg);
        }
        // 房间帧消息广播回调接口
        // 回调帧同步
        this.room.onRecvFrame = event => {
            if (event != null && event.data != null && event.data.frame != null &&
                event.data.frame.items != null && event.data.frame.items.length != 0) {
                if (this.onRecvPlayersFrame != null) {
                    this.onRecvPlayersFrame({ data: event.data.frame, seq: event.seq })
                }
            }
            // console.log("<<<<<" + event.data.frame);
        }

        const gameInfoPara: MGOBE.types.GameInfoPara = {
            gameId: Config.gameId,
            openId: this.playerName,
            secretKey: Config.secretKey,
        }

        const configPara: MGOBE.types.ConfigPara = {
            url: Config.url,
            isAutoRequestFrame: true,
            cacertNativeUrl: "",
        }

        MGOBE.Listener.init(gameInfoPara, configPara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {
                MGOBE.Listener.add(this.room!);
                console.log("初始化成功" + event);
            }
        });
    }

    MatchRoom() {
        //回调 onUpdate 
        this.room?.changeRoom({});

        const playerInfo: MGOBE.types.PlayerInfoPara = {
            name: this.playerName,
            customPlayerStatus: 1,
            customProfile: "",
        }

        const roomPara: MGOBE.types.MatchRoomPara = {
            playerInfo,
            maxPlayers: 2,
            roomType: Config.START,
        };

        this.room?.matchRoom(roomPara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {
                if (this.onRoomInfoChange != null) {
                    this.onRoomInfoChange({
                        data: event.data?.roomInfo,
                        seq: event.seq,
                    });
                }
                console.log("匹配成功 ID:" + event.data?.roomInfo.id);
                // console.log("当前房间玩家列表：" + event.data?.roomInfo.playerList);
                // console.log("MGOBE.Player.id" + MGOBE.Player.id);
            }
        })
    }


    StartGame() {
        const changeRoomPara: MGOBE.types.ChangeRoomPara = {
            customProperties: Config.GAMING,
        }
        this.room?.changeRoom(changeRoomPara);

        this.room?.startFrameSync({}, event => {
            this.gameState = GameState.Gaming;
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
        this.room.sendFrame(sendFramePara, event => {
            if (event.code == MGOBE.ErrCode.EC_OK) {
                // console.log(">>>>>" + frame);
            }
        });


    }


    GetGaing(): boolean {
        return this.gameState == GameState.Gaming;
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
