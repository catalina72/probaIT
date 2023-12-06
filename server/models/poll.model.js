const express = require('express')
const mongoose = require('mongoose')


const PollSchema=new mongoose.Schema({
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required: true
	},
	question: {
		type: String,
		required: true
	},
	options: {
		type: [String],
		required: true
	},
	type: {
		type: String
	},
	votes: {
		type: [Number],
		default: () => Array.from({ length: this.options.length }, () => 0), 
	  },
	voters: [{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}],
})

const collection2 = mongoose.model("collection2", PollSchema)

module.exports=collection2