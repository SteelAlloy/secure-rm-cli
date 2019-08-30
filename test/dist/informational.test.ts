import cmd = require('../../src')

const exec = require('child_process').exec

type execCallback = (error: Error, stdout: string, stderr: string) => void

function execute(command: string, callback: execCallback) {
  exec(command, (error: Error, stdout: string, stderr: string) => callback(error, stdout, stderr))
}

describe('Informational arguments:', () => {
  it('-h show help', done => {
    execute('npm start -- -h', (err, stdout) => {
      if (err) throw err
      expect(stdout).toContain('USAGE')
      expect(stdout).toContain('version')
      done()
    })
  })

  it('-t show table', done => {
    execute('npm start -- -t', (err, stdout) => {
      if (err) throw err
      expect(stdout).toContain('STANDARDS')
      expect(stdout).toContain('Gutmann')
      done()
    })
  })

  it('-v show table', done => {
    execute('npm start -- -v', (err, stdout) => {
      if (err) throw err
      expect(stdout).toContain('node-v')
      expect(stdout).toContain('secure-rm-cli/')
      done()
    })
  })
})
