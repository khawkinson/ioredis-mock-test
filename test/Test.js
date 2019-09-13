import RedisMock from 'ioredis-mock';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('ioredis-mock test', () => {
  let redis;
  beforeEach(() => {
    redis = new RedisMock({
      data: {
        'user:1': 'bill',
        'user:2': 'steve',
        'user:3': 'john',
        'user:4': 'billy',
        'user:5': 'erin',
        'user:6': 'paul',
        'user:7': 'jim',
        'user:8': 'dave',
        'user:9': 'peter',
        'user:10': 'james',
        'user:11': 'don',
        'user:13': 'aaron',
        'user:14': 'bill',
        'user:15': 'steve',
        'user:16': 'john',
        'user:17': 'billy',
        'user:18': 'erin',
        'user:19': 'paul',
        'user:20': 'jim',
        'user:21': 'dave',
        'user:22': 'peter',
        'user:23': 'james',
        'user:24': 'don',
        'user:25': 'aaron',
        'user:25:balls': new Set(['balls'])
      }
    });
  });
  describe('', () => {
    it('should properly do a scan', () => {
      const finalTally = [];
      // ADD count to options object, { match: 'user:*', count: 100 }
      // Test will pass.
      const stream = redis.scanStream({ match: 'user:*' });
      stream.on('data', keys => {
        if (keys.length) {
          console.log(keys);
          const pipeline = redis.pipeline();
          keys.forEach((key) => {
            finalTally.push(key);
            pipeline.del(key);
          });
          pipeline.exec();
        }
      });

      stream.on('end', () => {
        expect(finalTally.length).to.equal(25);
      })

    });
  });
});