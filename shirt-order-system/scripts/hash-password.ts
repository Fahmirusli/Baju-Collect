import bcrypt from 'bcryptjs'

const password = process.argv[2]

if (!password) {
  console.error('\nUsage: npm run admin:hash -- "<your-password>"\n')
  process.exit(1)
}

const saltRounds = 10
bcrypt.hash(password, saltRounds).then((hash) => {
  console.log('\n======================================================')
  console.log('Admin Password Hash Generated:')
  console.log('======================================================')
  console.log(hash)
  console.log('======================================================')
  console.log('Add this to your .env or Vercel Environment Variables:')
  console.log(`NUXT_ADMIN_PASSWORD_HASH='${hash}'\n`)
})

