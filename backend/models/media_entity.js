const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fetch = require("node-fetch");
const Comment = require('./comment_entity.js');

const MediaSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        verify: {
            validator: function (v) {
                return v.length >= 2 && v.length <= 100;
            }
        },
        unique: true
    },
    description: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 1000,
        verify: {
            validator: function (v) {
                return v.length >= 2 && v.length <= 1000;
            }
        }
    },
    seasons: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 100,
        verify: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 100;
            }
        }
    },
    episodes: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 10000,
        verify: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 10000;
            }
        }
    },
    avrg_episode_time: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 300,
        verify: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 300;
            }
        }
    },
    status: {
        type: String,
        required: true,
        enum: ['finished', 'ongoing', 'not yet aired'],
        default: 'ongoing'
    },
    type: {
        type: String,
        required: true,
        enum: ['Action', 'Adventure', 'Cars', 'Comedy', 'Demons', 'Mystery', 'Drama', 'Fantasy', 'Game', 'Historical', 'Horror', 'Magic', 'Martial Arts', 'Mecha', 'Music', 'Parody', 'Samurai', 'Romance', 'School', 'Sci Fi', 'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Space', 'Sports', 'Super Power', 'Vampire', 'Yaoi', 'Yuri', 'Slice Of Life', 'Supernatural', 'Military', 'Police', 'Psychological', 'Thriller', 'Seinen', 'Josei'],
        default: 'Action'
    },
    rating: {
        type: String,
        required: true,
        enum: ['G', 'PG', 'PG-13', 'R', 'R+'],
        default: 'PG-13'
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
    },
    score: {
        type: Number,
        required: true,
        minLength: 0,
        maxLength: 5,
        verify: {
            validator: function (v) {
                return v.length >= 0 && v.length <= 5;
            }
        }
    },
    image_url: {
        type: String,
        required: true,
    },
    comments: {
        type: [Comment.schema],
        default: []
    },
});


module.exports = mongoose.model('Media', MediaSchema);