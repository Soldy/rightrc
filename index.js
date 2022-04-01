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
            'power' : _getPower(),
            'can'   : _list()
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
     * @param {integer}
     * @param {array}
     * @public
     * @return {boolean}
     */
    this.import = function(power, ids){
        return _import(power, ids);
    };
    /*
     * @public
     * @return {array}
     */
    this.list = function(){
        return _list();
    };
    /*
     * @public
     * @return {boolean}
     */
    this.defaultPosition = function(){
        if(_default_position)
            return true;
        return false;
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
        },
        'write' : {
            'type'    : 'boolean',
            'default' : true
        },
        'read' : {
            'type'    : 'boolean',
            'default' : true
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
     * @private
     * @var {boolean}
     */
    let _default_position = true;
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
    const _add = function(id, lazy){
        if( _can.indexOf(id) > -1)
            return false;
        _can.push(
            id.toString()
        );
        if(typeof lazy === 'undefined')
            _update();
        return true;
    };
    /*
     * @param {array}
     * @private
     * @return {boolean}
     */
    const _adds = function(ids){
        if(!Array.isArray(ids))
            return false;
        for (let id of ids)
            if(typeof id === 'string')
                _add(id, true);
        _update();
        return true;
    };
    /*
     * @param {integer}
     * @param {array}
     * @private
     * @return {boolean}
     */
    const _import = function(power, ids){
        _setPower(power);
        return _adds(ids);
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
        if( _setup.get('write') )
            await _pool.save();
    };
    /*
     * @private
     */
    const _load = async function(){
        await _pool.load();
        if (typeof  _pool.get('can') !== 'undefined')
            _can = _pool.get('can');
        if (typeof  _pool.get('power') === 'undefined'){
            _pool.set('power', 50);
            _default_position = false;
        }
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
    if( _setup.get('read') )
        _load();
};

exports.base = rightBase;
