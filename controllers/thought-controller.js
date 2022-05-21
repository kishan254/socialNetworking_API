const { User, Thought, Reaction } = require('../models');

const thoughtController = {

    // GET /api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // GET /api/thoughts/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Creating a new Thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thought: dbThoughtData._id } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    // update a thought
    
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


    // DELETE /api/thoughts/:id
    deleteThought({ params }, res) {
        // delete the thought
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'});
                return;
            }
            // delete the reference to deleted thought in user's thought array
            User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: params.id } }
            )
            .then(() => {
                res.json({message: 'Successfully deleted the thought'});
            })
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    // create a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {
                $push: {reactions: body}
            },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // remove reaction

deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id' });
            return;
        }
         res.json(dbThoughtData);
    })
      .catch(err => res.status(400).json(err));;
  }

};

module.exports = thoughtController; 

// const thoughtController = {
//   // add thought to user
//   addThought({ params, body }, res) {
//     console.log(body);
//     Thought.create(body)
//       .then(({ _id }) => {
//         return User.findOneAndUpdate(
//           { _id: params.userId },
//           { $push: { comments: _id } },
//           { new: true }
//         );
//       })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No User found with this id!' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.json(err));
//   },

// removeThought({ params }, res) {
//     Thought.findOneAndDelete({ _id: params.thoughtId })
//       .then(deletedThought => {
//         if (!deletedThought) {
//           return res.status(404).json({ message: 'No Thought with this id!' });
//         }
//         return User.findOneAndUpdate(
//           { _id: params.userId },
//           { $pull: { thought: params.thoughtId } },
//           { new: true }
//         );
//       })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No User found with this id!' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.json(err));
//   }
// };

