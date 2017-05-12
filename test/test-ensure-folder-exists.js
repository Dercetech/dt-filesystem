const fs        = require('fs');
const path      = require('path');
const rimraf    = require('rimraf');

const chai      = require('chai');
const assert	= chai.assert;
//const should  = chai.should();

let dtfs;

const rootFolder =  path.join(__dirname, '..');
const testDataFolder = path.join(rootFolder, 'test-data');

const enoentSubFolder = path.join(testDataFolder, 'doesnt', 'exist');

before( (done) => {
    require('trapezo').resolve(module, function(dtFS){
        dtfs = dtFS;
        done();
    });
});

beforeEach( done => {

    function createTestDataFolder(done){
        fs.mkdir(testDataFolder, '0777', (err) => done(err));
    }

    // Clean folder if exists, create if not
    fs.stat(testDataFolder, (error, stats) => {
        if(!error) rimraf(testDataFolder, (err) => err ? done(err) : createTestDataFolder(done) );  // Folder exists, empty and re-create
        else if(error.code == "ENOENT") createTestDataFolder(done) ;                                // Folder doesn't exist, create it
        else done(err);                                                                             // Any error occurred, just crash
    });
});

after( () => null );

describe('Ensuring existence of a folder', () => {

    it('reports ENOENT folder is missing', done => {
        dtfs.doesPathExist(enoentSubFolder, (error, exists) => {
            assert(!exists, 'folder expected to not exist');
            done();
        })
    });

    it('properly creates subfolders in cascade', done => {
        dtfs.ensureExists(enoentSubFolder, () => {
            dtfs.doesPathExist(enoentSubFolder, (error, exists) => {
                assert(exists, 'folder expected to exist');
                done();
            })
        });
    });
});