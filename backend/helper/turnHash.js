const bcrypt = require('bcryptjs');

function turnHash(pwd){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pwd, salt);
    return hash;
}

module.exports = turnHash;