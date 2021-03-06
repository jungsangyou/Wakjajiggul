var userSchema = new Schema({
	loginId : {
	    type: String,
	    required: true,
	    set: function(value) {return value.trim().toLowerCase()},
	    validate: [
	      function(loginId) {
	        return (loginId.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)},
	      'Invalid email'
	    ]
	},
	name : String,
	nickname : String,
	password: String,
	admin: {
	    type: Boolean,
	    default: false
	}
});

module.exports = mongoose.model('User', userSchema, 'users');