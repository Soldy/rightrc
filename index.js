
const rightBase = function(){
    this.getPower = function(){
        return _getPower();
    };
    this.setPower = function(in_){
        return _setPower(in_);
    };
    this.list = function(){
        return _list();
    };
    this.check = function(in_){
        return  _checkCan(in_);
    };
    this.add = function(in_){
        if(
            (typeof in_ !== 'string')
        )
            return false;
        return _add(in_);
    };
    this.all = function(){
        return {
            power : _getPower(),
            can   : _list()
        };
    };
    this.del = function(in_){
        if(
            (typeof in_ !== 'string')
        )
            return false;
        return _del(in_);
    };
    this.list = function(){
        return _list();
    };
    let _power  = 100;
    let _can    = [];
    const _setPower = function(power){
        if(
            (Number.isInteger(power)) ||
             ( 1 > power ) ||
             ( power > 1024 )
        )
            return false;
        _power = parseInt(power);
        return true;
    };
    const _getPower = function(){
        return parseInt(_power);
    };
    const _checkPower = function(power){
        if(_power > power)
            return true;
        return false;
    };
    const _add = function(id){
        if( _can.indexOf(id) > -1)
            return false;
        _can.push(id);
        return true;
    };
    const _check = function(id){
        if( _can.indexOf(id) > -1)
            return true;
        return false;
    };
    const _del = function(id){
        const pos = _can.indexOf(id);
        if( 0 > pos )
            return false;
        delete _can[pos];
        _can.splice(pos, 1);
        return true;
    };
    const _list = function(){
        return _can.slice();
    };
    const _checkAny = function(in_){
        if(typeof in_ === 'string')
            return _check();
        if(Number.isInteger(in_))
            return _checkPower(in_);
        return false;
    };
    const _checkAnys = function(in_){
        for (let one of in_)
            if(_checkAny(one))
                return true;
        return false;
    };
    const _checkCan = function(in_){
        if (Array.isArray(in_))
            return _checkAnys(in_);
        return _checkAny(in_);
    };
};


exports.base = rightBase;
