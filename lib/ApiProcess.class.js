import axios from 'axios';
import Tool from '../app.js';

export default class ApiProessClass {
    // 构造函数
    constructor( data ) {
        this.logout = data['logout'];
        this.toast = data['toast'];
        this.load = data['load'];
        this.error = data['error'];
    }
    // 发起请求
    async send( data, load = true, options = {} ) {
        let result;
        // 尝试启动加载
        if ( load === true && Tool.isFunction( this.load ) ) { this.load( true ); }
        try {
            const token = localStorage.getItem( 'token' ) ? { Authorization: `Bearer ${localStorage.getItem( 'token' )}` } : {}
            // 请求类型
            if ( data.post ) {
                // POST 请求
                result = await axios.post( data.link, data.post, {
                    timeout: options.timeout || 15000,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...token
                    },
                    ...options,
                });
            }else {
                // GET 请求
                result = await axios.get( data.link, {
                    timeout: options.timeout || 15000,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...token
                    },
                    ...options,
                });
            }
            // 尝试关闭加载
            if ( load === true && Tool.isFunction( this.load ) ) { this.load( false ); }
            // 返回数据
            if ( Tool.isFunction( data.run ) && data.check === true ) {
                // 对数据进行检查
                this.examine( data, result.data );
            }else if ( Tool.isFunction( data.run ) ) {
                // 对数据进行检查
                data.run( result.data );
            }
            // 直接返回数据
            return result.data;
        } catch ( error ) {
            console.log( error );
            const result = error.response;
            if ( result ) {
                if ( result.status === 403 && Tool.isFunction( this.logout ) ) {
                    this.logout();
                    return false;
                }
            }
            // 触发请求错误
            if ( load === true && Tool.isFunction( this.load ) ) { this.load( false ); } // 尝试关闭加载
            if ( Tool.isFunction( this.toast ) ) { this.toast( this.error, 'i-wifi-off', true ); } // 触发错误通知
            console.log( this.error, error.message ); // 打印错误日志
            // 触发错误回调函数
            if ( Tool.isFunction( data.error ) ) {
                data.error( error.message );
            }
            return false;
        }
    }
    // 检查参数
    examine( data, result ) {
        switch ( result.s ) {
            case 'fail': // 失败
                if ( Tool.isFunction( this.toast ) ) { this.toast( result.d, 'i-x-circle', true ); }
                break;
            case 'error': // 错误
                if ( Tool.isFunction( this.toast ) ) { this.toast( result.d, 'i-x-octagon', true ); }
                break;
            case 'warn': // 警告
                if ( Tool.isFunction( this.toast ) ) { this.toast( result.d, 'i-shield-exclamation', true ); }
                break;
            case 'success': // 成功
                data.run( result.d );
                return true;
            default: // 未知
                if ( Tool.isFunction( this.toast ) ) { this.toast( 'Unknown mistake.', 'i-question-circle', true ); }
                break;
        }
        // 触发错误回调函数
        if ( Tool.isFunction( data.error ) ) {
            data.error( result.d );
        }
        return false;
    }
}