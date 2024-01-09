// 创建实例
class tool {
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
    isArra( data ) {
        if ( data === '' || data === null ) { return false; }
        if ( Array.isArray( data ) || typeof data === 'object' ) {
            return true;
        }
        return false;
    }
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
    isFunction( variable ) {
        return typeof variable === 'function' ? true : false;
    }
    time( time, format = 'Y-M-D h:m:s' ) {
        if ( !( time instanceof Date ) ) {
            time = isNaN( time ) ? new Date( time ) : new Date( time * 1000 );
        }
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
}

// 导出实例
const func = new tool();
export default func;