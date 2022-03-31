'use strict';
const fs = require('fs');
const path = require('path');
const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print'  : 'long'
});

const _options = {
    'file' : path.join(
        process.cwd(),
        'test',
        'right.jsprc'
    ),
    'power' : 50
};
const $rightrc = new (require('./index.js')).base(_options);
nanoTest.add(
    'getPower',
    {
        'function':$rightrc.getPower,
        'options':[]
    },
    '===',
    50
);

nanoTest.add(
    'checkPower more',
    {
        'function':$rightrc.checkPower,
        'options':[60]
    },
    '===',
    false 
);

nanoTest.add(
    'checkPower less',
    {
        'function':$rightrc.checkPower,
        'options':[45]
    },
    '===',
    true
);

nanoTest.add(
    'check more',
    {
        'function':$rightrc.check,
        'options':[60]
    },
    '===',
    false
);

nanoTest.add(
    'check less',
    {
        'function':$rightrc.check,
        'options':[45]
    },
    '===',
    true
);

nanoTest.add(
    'setPower',
    {
        'function':$rightrc.setPower,
        'options':[75]
    },
    '===',
    true
);

nanoTest.add(
    'getPower',
    {
        'function':$rightrc.getPower,
        'options':[]
    },
    '===',
    75
);

nanoTest.add(
    'checkPower more',
    {
        'function':$rightrc.checkPower,
        'options':[80]
    },
    '===',
    false
);

nanoTest.add(
    'checkPower less',
    {
        'function':$rightrc.checkPower,
        'options':[45]
    },
    '===',
    true
);

nanoTest.add(
    'check more',
    {
        'function':$rightrc.check,
        'options':[80]
    },
    '===',
    false
);

nanoTest.add(
    'check less',
    {
        'function':$rightrc.check,
        'options':[45]
    },
    '===',
    true
);


nanoTest.add(
    'checkId id not exist',
    {
        'function':$rightrc.checkId,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'check id not exist',
    {
        'function':$rightrc.check,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'del id exist',
    {
        'function':$rightrc.list,
        'options':[]
    },
    'j==',
    []
);

nanoTest.add(
    'add id not exist',
    {
        'function':$rightrc.add,
        'options':['ghfdhgh']
    },
    '===',
    true
);
nanoTest.add(
    'add id exist',
    {
        'function':$rightrc.add,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'checkId id exist',
    {
        'function':$rightrc.checkId,
        'options':['ghfdhgh']
    },
    '===',
    true
);
nanoTest.add(
    'check id exist',
    {
        'function':$rightrc.check,
        'options':['ghfdhgh']
    },
    '===',
    true
);
nanoTest.add(
    'check array id not exist',
    {
        'function':$rightrc.check,
        'options':[['fgfgh','dsghdh']]
    },
    '===',
    false
);
nanoTest.add(
    'check array id exist',
    {
        'function':$rightrc.check,
        'options':[['fgfgh','ghfdhgh','dsghdh']]
    },
    '===',
    true
);
nanoTest.add(
    'check array id not exist more power',
    {
        'function':$rightrc.check,
        'options':[['fgfgh', 100, 'dsghdh']]
    },
    '===',
    false
);
nanoTest.add(
    'check array id not exist les power',
    {
        'function':$rightrc.check,
        'options':[['fgfgh', 10, 'dsghdh']]
    },
    '===',
    true
);
nanoTest.add(
    'del id exist',
    {
        'function':$rightrc.list,
        'options':[]
    },
    'j==',
    ['ghfdhgh']
);
nanoTest.add(
    'del id exist',
    {
        'function':$rightrc.del,
        'options':['ghfdhgh']
    },
    '===',
    true
);
nanoTest.add(
    'del id not exist',
    {
        'function':$rightrc.del,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'checkId id not exist',
    {
        'function':$rightrc.checkId,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'check id not exist',
    {
        'function':$rightrc.check,
        'options':['ghfdhgh']
    },
    '===',
    false
);
nanoTest.add(
    'del id exist',
    {
        'function':$rightrc.list,
        'options':[]
    },
    'j==',
    []
);
nanoTest.add(
    'delete store file',
    {
        'function':async function(){
           await fs.unlinkSync('test/right.jsprc');
           return true;
        },
        'options':[]
    },
    '!==',
    false
);


nanoTest.run();
