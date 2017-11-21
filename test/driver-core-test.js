import chai from 'chai';
import { describe, it, afterEach } from 'mocha';
import innerDriverCore from '../dist/lib/driver-core';

const should = chai.should();
let driverCore = null;

describe('driver-core :', () => {
  afterEach(() => {
    driverCore = null;
  });

  describe(
    'returns expected configured driver library',
    () => {
      it(
        'built driver core library is a webdriver chai runner',
        () => {
          driverCore = innerDriverCore();
          should.equal(
            driverCore.constructor.name,
            'thenableWebDriverProxy',
            'library should be a thenableWebDriverProxy function'
          );
          should.equal(
            driverCore.framework,
            'chromedriver',
            'library should be configured for chromedriver'
          );
        }
      );
    }
  );

  describe(
    'framework is phantomjs returns built library for phantom',
    () => {
      driverCore = innerDriverCore('phantomjs');
      should.equal(
        driverCore.framework,
        'phantomjs',
        'library should be configured for phantomjs'
      );
    }
  );

  describe(
    'framework is object framework prop is used',
    () => {
      driverCore = innerDriverCore(
        {
          capabilities: {
            browserName: 'IE',
            browser_version: '10.0',
            os: 'Windows',
            os_version: '8',
            resolution: '1024x768',
          },
        }
      );
      should.equal(
        driverCore.framework,
        'browserstack',
        'library should be configured for browserstack'
      );
    }
  );
});
