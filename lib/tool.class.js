export default class ToolClass {
    // 判断变量是否为空
    empty( v ) {
        switch( typeof v ) {
            case 'undefined':
                return true;
            case 'string':
                if ( v.replace( /(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '' ).length === 0 ) return true;
                break;
            case 'boolean':
                if ( !v ) return true;
                break;
            case 'number':
                if ( 0 === v || isNaN( v ) ) return true;
                break;
            case 'object':
                if ( null === v || v.length === 0 ) return true;
                for ( var i in v ) { return false; }
                return true;
            default: break;
        }
        return false;
    }
    // 判断变量是否为数组或者对象
    isArray( data ) {
        if ( data === '' || data === null ) { return false; }
        if ( Array.isArray( data ) || typeof data === 'object' ) {
            return true;
        }
        return false;
    }
    // 判断变量是否为 Json
    isJson( data ) {
        if ( data === '' || data === null ) { return false; }
        try {
            const check = JSON.parse( data );
            if ( this.isArray( check ) ) {
                return true;
            } else {
                return false;
            }
        } catch ( error ) {
            return false;
        }
    }
    // 判断变量是否为函数
    isFunction( variable ) {
        if ( variable === '' || variable === null ) { return false; }
        return typeof variable === 'function' ? true : false;
    }
    // 时间格式转换
    time( time, format = 'Y-M-D h:m:s', timezone = 0 ) {
        if ( !( time instanceof Date ) ) {
            time = isNaN( time ) ? new Date( time ) : new Date( time * 1000 );
        }
        time.setHours( time.getHours() + 0 );
        const padZero = ( value ) => {
            return value < 10 ? '0' + value : value;
        };
        const timeData = {
            'Y': time.getFullYear(),
            'M': padZero( time.getMonth() + 1 ),
            'D': padZero( time.getDate() ),
            'h': padZero( time.getHours() ),
            'm': padZero( time.getMinutes() ),
            's': padZero( time.getSeconds() )
        };
        for ( let key in timeData ) {
            format = format.replace( key, timeData[key] );
        }
        return format;
    }
    // 获取当前时间
    getTime( format = 'Y-M-D h:m:s' ) {
        const time = new Date();
        if ( format === false ) { return Math.floor( time.getTime() / 1000 ); }
        const padZero = ( value ) => {
            return value < 10 ? '0' + value : value;
        };
        const date = {
            'Y': time.getFullYear(),
            'M': padZero( time.getMonth() + 1 ),
            'D': padZero( time.getDate() ),
            'h': padZero( time.getHours() ),
            'm': padZero( time.getMinutes() ),
            's': padZero( time.getSeconds() )
        };
        for ( let key in date ) {
            format = format.replace( key, date[key] );
        }
        return format;
    }
    // 生成随机字符串
    rand( length, type = 'all' ) {
        let data;
        switch ( type ) {
            case 'all':
                data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                break;
            case 'num':
                data = '0123456789';
                break;
            case 'letter':
                data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                break;
            default: return false;
        }
        const dataLength = data.length - 1; let result = '';
        for ( let i = 0; i < length; i++ ) {
            result += data.charAt( Math.floor( Math.random() * ( dataLength + 1 ) ) );
        }
        return result;
    }
    // 复制对象
    copy( data, num = 1 ) {
        if ( this.isArray( num ) ) { num = Math.floor(Math.random() * ( num[1] - num[0] + 1) + num[0] ); }
        let newData = [];
        for ( let i = 0; i < num; i++ ) {
            newData.push( data );
        }
        return newData;
    }
}