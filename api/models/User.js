/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    schema: true,

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        title: {
            type: 'string'
        },

        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string'
        },

        online: {
            type: 'boolean',
            defaultsTo: false
        },

        admin: {
            type: 'boolean',
            defaultsTo: false
        },

        age: {
            type: 'string'
        },

        phone: {
            type: 'string'
        },

        exercise: {
            type: 'string'
        },
        weight: {
            type: 'string'
        },
        repetitions: {
            type: 'string'
        },
        sets: {
            type: 'string'
        },
        intensity: {
            type: 'string'
        },
        date: {
            type: 'string',
        },
        coachcomment: {
            type: 'string'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.confirmation;
            delete obj.encryptedPassword;
            delete obj._csrf;
            return obj;
        }

    },


    beforeValidation: function (values, next) {
        if (typeof values.admin !== 'undefined') {
            if (values.admin === 'unchecked') {
                values.admin = false;
            } else  if (values.admin[1] === 'on') {
                values.admin = true;
            }
        }
        next();
    },

    beforeCreate: function (values, next) {

        // This checks to make sure the password and password confirmation match before creating record
        if (!values.password || values.password != values.confirmation) {
            return next({err: ["Password doesn't match password confirmation."]});
        }

        require('bcrypt').hash(values.password, 5, function passwordEncrypted(err, encryptedPassword) {
            if (err) return next(err);
            values.encryptedPassword = encryptedPassword;
            next();
        });
    }

};