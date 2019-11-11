const sha256 = require('sha256');
const argv = require('minimist')(process.argv.slice(2));

const auth = (user, token, rand) => {
  return argv.t || sha256(
    String(user.token) +
    String(rand) +
    String(user.id)
  ) === token;
};

const adminUser = {
  id: 1,
  username: 'admin',
  password: '123456',
}

module.exports = {
  auth,
  adminUser,
};
