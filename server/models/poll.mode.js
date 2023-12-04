const express = require('express')
const mongoose = require('mongoose')


const newSchema=new mongoose.Schema({
	owner_id: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true
	}
})

const collection = mongoose.model("collection", newSchema)

module.exports=collection