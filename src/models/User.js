const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, requiered: true},
    email: {type: String, requiered: true, unique: true},
    password: {type: String, required: true}
},{
    timestamps: true
});
/*
UserSchema.method.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
} */ 
UserSchema.method({
    encryptPassword: function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
    },
    matchPassword: function(password) {
      return bcrypt.compareSync(password, this.password);
    }
  })

module.exports = model('User', UserSchema)