// Thought Model schema
const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Text is Required',
    minlength: 1,
    maxlength: 280 
  },
 
  userCreated: {
    type: Date,
    default: Date.now,
    // get: createdAtVal => dateFormat(createdAtVal)
  },

  username: {
    type: String,
    required: 'Username Created this thought'
  },

  reactions: [reactionSchema]
},
{
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false

});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;