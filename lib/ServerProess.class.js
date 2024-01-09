import Tool from '../app.js';

export default class ServerProessClass {
    // 构造函数
    constructor( link, toast = false, heartbeatTime = 15000 ) {
        // 连接地址
        this.link = link;
        this.toast = toast;
        // 初始化连接
        this.server = false;
        this.state = false;
        this.restart = true;
        this.message = '';
        this.heartbeatInt = false;
        this.heartbeatTime = heartbeatTime;
        this.functions = {};
        // 自动连接
        if ( toast !== false ) {
            this.linkServer();
        }
    }
    linkServer() {
        this.server = new WebSocket( this.link );
        // 连接成功
        this.server.onopen = () => {
            this.state = true;
            // 挂载心跳
            this.heartbeatInt = setInterval( () => {
                this.heartbeat();
            }, this.heartbeatTime );
        };
        // 监听到消息
        this.server.onmessage = ( e ) => {
            this.message = e.data;
            this.handle( e.data );
        };
        // 连接断开
        this.server.onclose = () => {
            this.state = false;
            clearInterval( this.heartbeatInt );
            // 自动重连
            if ( this.restart === true ) {
                setTimeout( () => { this.linkServer(); }, 3000 );
            }
        };
    }
    // 心跳处理方式
    heartbeat() {
        if ( this.state === true ) {
            return this.send( 'heartbeat' );
        }
        return false;
    }
    // 发送消息到服务器
    send( action, data = [] ) {
        if ( this.state === true ) {
            data = {
                action: action,
                data: data
            };
            return this.server.send( JSON.stringify( data ) );
        }
        return false;
    }
    // 主动关闭连接
    close() {
        this.state = this.restart = false;
        clearInterval( this.heartbeatInt );
        this.server.close();
    }
    // 消息处理器
    handle( data ) {
        // 如果消息体为 Json 则转为对象
        if ( Tool.isJson( data ) ) { data = JSON.parse( data ); }
        // 回复状态为错误
        if ( data['s'] === 'fail' || data['s'] === 'error' || data['s'] === 'warn' ) {
            if ( Tool.isFunction( this.toast ) ) { this.toast( data['d'], 'i-x-octagon', true ); }
            return false;
        // 回复状态为成功
        }else if ( data['s'] === 'success' ) {
            // 检查是否存在回调函数
            if ( Tool.isFunction( this.functions[data['f']] ) ) {
                this.functions[data['f']]( data['d'] );
            }
            return true;
        }
        if ( Tool.isFunction( this.toast ) ) { this.toast( 'Unknown mistake.', 'i-question-circle', true ); }
        return false;
    }
    // 添加回调函数
    addFunc( funcName, func ) {
        this.functions[funcName] = func;
    }
    // 删除回调函数
    delFunc( funcName ) {
        if ( Tool.isFunction( this.functions[funcName] ) ) {
            delete this.functions[funcName];
        }
    }
}