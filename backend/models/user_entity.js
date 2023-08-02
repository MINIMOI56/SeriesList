const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 40,
            verify: {
                validator: function (v) {
                    return v.length >= 3 && v.length <= 40;
                },
            }
        },
        profile_picture: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        email: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 100,
            verify: {
                validator: function (v) {
                    return v.length >= 10 && v.length <= 100;
                }
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 500,
            verify: {
                validator: function (v) {
                    return v.length >= 8 && v.length <= 500;
                }
            }
        },
        media_ids: {
            type: [String],
            default: []
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model('User', UserSchema);