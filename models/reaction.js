// Reaction Model schema
const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
  },

  reactionBody: {
    type: String,
    required: 'Body is Required',
    maxlength: 280 
  },
 
  username: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
}
);

 

// const Reaction = model('Reaction', ReactionSchema);

module.exports = ReactionSchema;