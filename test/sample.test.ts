const exec = require('child_process').exec

type execCallback = (error: Error, stdout: string, stderr: string) => void

function execute(command: string, callback: execCallback) {
  exec(command, (error: Error, stdout: string, stderr: string) => callback(error, stdout, stderr))
}

test('-h show help', done => {
  execute('npm start -- -h', (err, stdout) => {
    if (err) throw err
    expect(stdout).toContain("USAGE")
    done()
  })
})
