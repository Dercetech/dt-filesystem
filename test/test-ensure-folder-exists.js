let chai = require('chai');
let should = chai.should();

let dtfs;

before( (done) => {
    require('trapezo').resolve(module, function(dtFS){
        dtfs = dtFS;
        done();
    });
});

after( () => null );

describe('Basic ensureExists tests', () => {

    beforeEach( (done) => {
        done();
    });

    describe('/', () => {

        // Dummy method for boilerplate
        it('dummy method', done => done() );

    });

    describe('left to implement ', () => {
        it('dummy method', function(done){done()});
        it('dummy method - pending implementation');
    });
});