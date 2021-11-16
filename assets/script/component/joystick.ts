
import { _decorator, Component, Node, Vec3, v3, Vec2, v2, EventTouch, UITransform, Event } from 'cc';
const { ccclass, property } = _decorator;
import { EventManager } from '../eventManager'

@ccclass('Joystick')
export class Joystick extends Component {

    @property(Node)
    circle: Node = null!;

    private _pointA: Vec2 = v2();
    private _pointB: Vec2 = v2();
    private _radius: number = 0;

    start() {
        this._radius = this.node.getComponent(UITransform)!.width * 0.5 - this.circle.getComponent(UITransform)!.width * 0.5;
    }

    onEnable() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    private onTouchStart(event: EventTouch) {
        event.getLocation(this._pointA);
    }

    private onTouchMove(event: EventTouch) {
        event.getLocation(this._pointB)
        const offset: Vec2 = this._pointB.subtract(this._pointA);
        const move = offset.clampf(v2(-1.0, -1.0).multiplyScalar(this._radius), v2(1.0, 1.0).multiplyScalar(this._radius));

        const distance = move.length()
        const radian = v2(1, 0).signAngle(move);
        const offsetX = Math.cos(radian) * this._radius;
        const offsetY = Math.sin(radian) * this._radius;

        this.circle.setPosition(this._radius < distance ? v3(offsetX, offsetY, 0) : v3(move.x, move.y, 0));
        EventManager.instance().emit('joystick-move', move.normalize())
        // this.node.dispatchEvent(new MyEvent('foobar', true, 'detail info'));
        // console.log('joystick-move', move.normalize());
    }

    private onTouchEnd(event: EventTouch) {
        this.circle.setPosition(Vec3.ZERO);
        // this.node.emit('joystick-move');
        EventManager.instance().emit('joystick-move', null)
    }

    onDisable() {
        this.node.targetOff(this);
    }
}
