const { expect } = require('chai')

describe('application logger', () => {
    let log

    before(() => {
        log = require('../../server/utilities/Logger')('test-logger')
    })

    it('sets up an instance of log4js either env LOG_LEVEL or default', async () => {
        switch(process.env.LOG_LEVEL != null) {
        case true:
            expect(log.level == process.env.LOG_LEVEL)
        case false:
            expect(log.level == 'info')
        }
    })

    it('unsets the LOG_LEVEL process.env var and tests for default log level instantiation', async () => {
        process.env['LOG_LEVEL'] = ''
        log = require('../../server/utilities/Logger')('test-logger')
        expect(log.level == 'info')
    })

    it('sets warn LOG_LEVEL on process.env var and tests instantiation', async () => {
        process.env['LOG_LEVEL'] = 'warn'
        log = require('../../server/utilities/Logger')('test-logger')
        log.warn('test "warn" LOG_LEVEL')
        expect(log.level == 'warn')
    })
})