
task('example2', 'example task', async (_ret) => 28)

task('example', 'example task', async (__, { run }) => run('example2'))

module.exports = {
  networks: {
    custom: {
      host: 'http://localhost',
      port: 8081,
      token: 'somefaketoken'
    },
    localhost: {
      host: 'http://127.0.0.1',
      port: 8080,
      token: 'somefaketoken',
      accounts: ['0xa95f9e3e7ae4e4865c5968828fe7c03fffa8a9f3bb52d36d26243f4c868ee166']
    }
  },
  unknown: { asd: 123 }
}
