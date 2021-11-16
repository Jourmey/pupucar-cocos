
import { _decorator, Component, Node, RigidBody2D, KeyCode, Vec2, math } from 'cc';
const { ccclass, property } = _decorator;

import { AxInput } from './AxInput';
import { GameManager } from './GameManager';
import { PlayCode, Frame } from './Config';

const Input = AxInput.instance;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Fri Oct 22 2021 20:47:30 GMT+0800 (中国标准时间)
 * Author = 15735181677
 * FileBasename = player.ts
 * FileBasenameNoExtension = player
 * URL = db://assets/script/player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Player')
export class Player extends Component {
    @property
    speed: number = 5;

    private r2d: RigidBody2D;
    private code: PlayCode = PlayCode.NONE;

    private _moveDirection: Vec2 | undefined;

    start() {
        this.r2d = this.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        if (GameManager.Instance().GetGaing() == true) {
            // this.sendMove();
            this.sendMove2();
        } else {
            this.testMove();
        }
    }

    test() {
        console.log("Player加载成功");
    }

    SetMoveDirection(moveDirection: Vec2) {
        this._moveDirection = moveDirection;
    }

    sendMove2() {
        if (!this._moveDirection) {
            this.sendFrame(PlayCode.STOP)
        } else {
            let a = this._moveDirection.signAngle(Vec2.UNIT_X);
            if (a > -Math.PI * 3 / 4 && a <= -Math.PI / 4) { // 上
                this.sendFrame(PlayCode.UP)
            }
            else if (a > -Math.PI / 4 && a <= Math.PI / 4) { // 右
                this.sendFrame(PlayCode.RIGHT)
            }
            else if (a > Math.PI / 4 && a <= Math.PI * 3 / 4) { // 下
                this.sendFrame(PlayCode.DOWN)
            } else { // 左
                this.sendFrame(PlayCode.LEFT)
            }
        }
    }

    // // pc 版本
    // sendMove() {
    //     if (Input.is_action_pressed(KeyCode.ARROW_LEFT)) {
    //         this.sendFrame(PlayCode.LEFT)
    //     } else if (Input.is_action_pressed(KeyCode.ARROW_RIGHT)) {
    //         this.sendFrame(PlayCode.RIGHT)
    //     } else {
    //         if (Input.is_action_pressed(KeyCode.ARROW_DOWN)) {
    //             this.sendFrame(PlayCode.DOWN)
    //         } else if (Input.is_action_pressed(KeyCode.ARROW_UP)) {
    //             this.sendFrame(PlayCode.UP)
    //         } else {
    //             this.sendFrame(PlayCode.STOP)
    //         }
    //     }
    // }

    sendFrame(code: PlayCode) {
        if (this.code != code) {
            GameManager.Instance().SendFrame({
                KeyCode: code,
            });
        }
        this.code = code;
    }


    Move(f: Frame) {
        let lv = this.r2d!.linearVelocity;
        switch (f.KeyCode) {
            case PlayCode.STOP:
                lv.y = 0;
                lv.x = 0;
                break;
            case PlayCode.LEFT:
                lv.x = -this.speed;
                lv.y = 0;
                break;
            case PlayCode.RIGHT:
                lv.x = this.speed;
                lv.y = 0;
                break;
            case PlayCode.DOWN:
                lv.x = 0;
                lv.y = -this.speed;
                break;
            case PlayCode.UP:
                lv.x = 0;
                lv.y = this.speed;
                break;
        }
        this.r2d!.linearVelocity = lv;
    }

    // 单机测试
    testMove() {
        let speed = 8;
        let lv = this.r2d!.linearVelocity;

        if (Input.is_action_pressed(KeyCode.ARROW_LEFT)) {
            lv.x = -speed;
            lv.y = 0;
        } else if (Input.is_action_pressed(KeyCode.ARROW_RIGHT)) {
            lv.x = speed;
            lv.y = 0;
        } else {
            lv.x = 0;
            if (Input.is_action_pressed(KeyCode.ARROW_DOWN)) {
                lv.y = -speed;
            } else if (Input.is_action_pressed(KeyCode.ARROW_UP)) {
                lv.y = speed;
            } else {
                lv.y = 0;
            }
        }
        this.r2d!.linearVelocity = lv;
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
