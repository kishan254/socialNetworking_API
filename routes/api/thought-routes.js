const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


// // /api/comments/<userId>
// router.route('/:userId').post(addThought);
router
.route('/')
.post(createThought)
.get(getAllThoughts);

// // /api/comments/<userId>/<ThoughtId>
// router.route('/:pizzaId/:thoughtId').delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions/')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId/').delete(deleteReaction)

module.exports = router;

