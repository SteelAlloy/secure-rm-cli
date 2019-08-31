import table, { rendering } from '../../src/table'
import { validIDs } from 'secure-rm'
import cmd = require('../../src')

const exec = require('child_process').exec

type execCallback = (error: Error, stdout: string, stderr: string) => void

function execute(command: string, callback: execCallback) {
  exec(command, (error: Error, stdout: string, stderr: string) => callback(error, stdout, stderr))
}

describe('The table rendering', () => {
  /* it('Contains all IDs', () => {
    for (let i = 0; i < validIDs.length; i++) {
      expect(rendering).toContain(validIDs[i])
    }
  }) */

  /* it('Has the right header', () => {
    expect(rendering).toContain('Id')
    expect(rendering).toContain('Name')
    expect(rendering).toContain('Passes')
    expect(rendering).toContain('Description')
  }) */

  it('Has borders', () => {
    expect(rendering).toContain('│')
    expect(rendering).toContain('─')
    expect(rendering).toContain('┌')
    expect(rendering).toContain('├')
    expect(rendering).toContain('└')
    expect(rendering).toContain('┐')
    expect(rendering).toContain('┤')
    expect(rendering).toContain('┘')
    expect(rendering).toContain('┬')
    expect(rendering).toContain('┼')
    expect(rendering).toContain('┴')
  })
})

/* it('table', done => {
  table = jest.fn()
  cmd.run(['-t'])
    .then()
}) */

describe('The table function', () => {
  it('Show "METHODS"', done => {
    execute('npm start -- -h', (err, stdout) => {
      if (err) throw err
      expect(stdout).toContain('USAGE')
      expect(stdout).toContain('version')
      done()
    })
  })

  it('Show the table', done => {
    execute('npm start -- -t', (err, stdout) => {
      if (err) throw err
      for (let i = 0; i < validIDs.length; i++) {
        expect(stdout).toContain(validIDs[i])
      }
      done()
    })
  })

})