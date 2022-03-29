/*
 *  @Soldy\nanoTest\2021.02.04\GPL3
 */
'use strict';
const $setuprc = (require('setuprc')).base;
const $poolrc = (require('poolrc')).base;

/*
 * @param {setuprc} settings 
 * @prototype
 */
const rightBase = function(settings){
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
    this.checkPower = function(in_){
        return _checkPower(in_);
    };
    this.checkId = function(in_){
        return _check(in_);
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
    /*
     * setup  helper
     * @private
     */
    const _setup = new $setuprc({
        'power' : {
            'type'    : 'integer',
            'default' : 100
        },
        'file' : {
            'type'    : 'string',
            'default' : 'right.jsprc'
        }
    });
    /*
     * alloved ids
     * @private
     * @var {array}
     *
     */
    let _can = [];
    const _setPower = function(power){
        return _setup.setup({'power': power});
    };
    const _getPower = function(){
        return _setup.get('power');
    };
    const _checkPower = function(power){
        if(_setup.get('power') > power)
            return true;
        return false;
    };
    const _add = function(id){
        if( _can.indexOf(id) > -1)
            return false;
        _can.push(
            id.toString()
        );
        _update();
        return true;
    };
    const _check = function(id){
        console.log(_can);
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
        _update();
        return true;
    };
    const _list = function(){
        return _can.slice();
    };
    const _checkAny = function(in_){
        if(typeof in_ === 'string')
            return _check(in_);
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
    const _update = async function(){
        await _pool.set('can', _can);
        await _pool.set('power', _setup.get('power'));
        await _pool.save();
    };
    const _load = async function(){
        await _pool.load();
        if (typeof  _pool.get('can') !== 'undefined')
            _can = _pool.get('can');
        if (typeof  _pool.get('power') === 'undefined')
            _pool.set('power', 50);
        _setup.setup({
            'power' : _pool.get('power')
        });
    };
    /*
     *
     * setup init 
     *
     */
    if(typeof settings === 'undefined')
        throw Error('settings are missing');
    _setup.setup(settings);
    const _pool = new $poolrc ({
        'limit' : 4,
        'file'  : _setup.get('file')
    });
    _load();
};

exports.base = rightBase;
