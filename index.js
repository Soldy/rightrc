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
    /*
     * @public
     * @return {boolean}
     */
    this.getPower = function(){
        return _getPower();
    };
    /*
     * @param {integer}
     * @public
     * @return {boolean}
     */
    this.setPower = function(in_){
        return _setPower(in_);
    };
    /* 
     * @param {integer||string||array}
     * @public
     * @return {array}
     */
    this.check = function(in_){
        return  _checkCan(in_);
    };
    /* 
     * @param {integer}
     * @public
     * @return {boolean}
     */
    this.checkPower = function(in_){
        return _checkPower(in_);
    };
    /* 
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.checkId = function(in_){
        return _check(in_);
    };
    /* 
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.add = function(in_){
        if(
            (typeof in_ !== 'string')
        )
            return false;
        return _add(in_);
    };
    /* 
     * @public
     * @return {object}
     */
    this.all = function(){
        return {
            power : _getPower(),
            can   : _list()
        };
    };
    /*
     * @param {string}
     * @public
     * @return {boolean}
     */
    this.del = function(in_){
        if(
            (typeof in_ !== 'string')
        )
            return false;
        return _del(in_);
    };
    /*
     * @public
     * @return {array}
     */
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
    /*
     * @param {integer}
     * @private
     * @return {boolean}
     */
    const _setPower = function(power){
        return _setup.setup({'power': power});
    };
    /*
     * @private
     * @return {integer}
     */
    const _getPower = function(){
        return _setup.get('power');
    };
    /*
     * @param {integer}
     * @private
     * @return {boolean}
     */
    const _checkPower = function(power){
        if(_setup.get('power') > power)
            return true;
        return false;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _add = function(id){
        if( _can.indexOf(id) > -1)
            return false;
        _can.push(
            id.toString()
        );
        _update();
        return true;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _check = function(id){
        if( _can.indexOf(id) > -1)
            return true;
        return false;
    };
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    const _del = function(id){
        const pos = _can.indexOf(id);
        if( 0 > pos )
            return false;
        delete _can[pos];
        _can.splice(pos, 1);
        _update();
        return true;
    };
    /*
     * @private
     * @return {array}
     */
    const _list = function(){
        return _can.slice();
    };
    /*
     * @param {string||integer}
     * @private
     * @return {boolean}
     */
    const _checkAny = function(in_){
        if(typeof in_ === 'string')
            return _check(in_);
        if(Number.isInteger(in_))
            return _checkPower(in_);
        return false;
    };
    /*
     * @param {array}
     * @private
     * @return {boolean}
     */
    const _checkAnys = function(in_){
        for (let one of in_)
            if(_checkAny(one))
                return true;
        return false;
    };
    /*
     * @param {string||integer||array}
     * @private
     * @return {boolean}
     */
    const _checkCan = function(in_){
        if (Array.isArray(in_))
            return _checkAnys(in_);
        return _checkAny(in_);
    };
    /*
     * @private
     */
    const _update = async function(){
        await _pool.set('can', _can);
        await _pool.set('power', _setup.get('power'));
        await _pool.save();
    };
    /*
     * @private
     */
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
