// User Model schema
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Username is Required'
  },

 
  email: {
    type: String,
    unique: true,
    required: 'email is Required',
    match: [/.+@.+\..+/]
  },

  thought: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
          {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
      ]
},

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  
});

userSchema.virtual('friendsCount').get(function() {
  return this.friends.length;
});

 

const User = model('User', userSchema);

module.exports = User;
