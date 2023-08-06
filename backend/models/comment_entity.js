const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        media_id: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 1000,
            verify: {
                validator: function (v) {
                    return v.length >= 1 && v.length <= 1000;
                }
            }
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        modified: {
            type: Boolean,
            default: false
        },
    }
);

module.exports = mongoose.model('Comment', CommentSchema);