/**
 * 事件数据接口
 */
interface EventData {
    callback: Function,
    target: any
}
/**
 * 单例模式
 */
export class EventManager {

    private static mInstance: EventManager = null;
    /**
     * 事件存储 Map
     */
    private eventsMap: Map<string, EventData> = new Map();

    public static instance(): EventManager {
        if (this.mInstance == null) {
            this.mInstance = new EventManager();
        }
        return this.mInstance;
    }
    /**
     * 事件监听
     * @param eventName 事件名字
     * @param callback 返回方法
     * @param target 
     */
    public on(eventName: string, callback: Function, target: any) {
        if (this.eventsMap.has(eventName)) {
            console.warn(`$(eventName) 事件已存在 ， 做了覆盖处理`);
        }
        this.eventsMap.set(eventName, { callback, target });
    }
    /**
     * 事件发送
     * @param eventName 
     * @param data 
     */
    public emit(eventName: string, data: any) {
        if (!this.eventsMap.has(eventName)) {
            console.warn(`$(eventName) 事件不存在`);
            return;
        }
        const { callback, target } = this.eventsMap.get(eventName);
        callback.call(target, data);
    }
    /**
     * 取消事件监听
     * @param eventName 
     */
    public off(eventName: string) {
        if (!this.eventsMap.has(eventName)) {
            console.warn(`$(eventName) 事件不存在`);
            return;
        }
        this.eventsMap.delete(eventName);
    }
}