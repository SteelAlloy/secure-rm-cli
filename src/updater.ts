import chalk from 'chalk'
import Table from 'tty-table'
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24
})

// Notify using the built-in convenience method
notifier.notify()

if (notifier.update) {

  // BUG can't get notifier.notify() to work so I'm drawing it with tty table
  const rows = [[`Update available (${notifier.update.type}) ${chalk.gray(notifier.update.current)} ➜ ${chalk.green(notifier.update.latest)}
  Run ${chalk.cyan('npm i secure-rm-cli -g')} to update`]]

  const t1 = Table([], rows, {
    borderStyle: 1,
    borderColor: 'yellow',
    paddingBottom: 0,
    headerAlign: 'center',
    headerColor: 'yellow',
    align: 'center',
    color: 'white'
    // truncate: "..."
  })

  const str1 = t1.render()
  console.log(str1)
}
