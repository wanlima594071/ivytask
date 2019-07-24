
// import React from 'react';
var React = require('react');
var ReactDOM = require('react-dom');
var mysql =require("mysql");
var express=require('express');
var app=express();
var cors = require('cors')


var connection = mysql.createConnection({
	host: "35.224.79.240",
	user: "demo",
	password: "IvyDemo!",
	database: "demo",
	// table: company
});


connection.connect(function(err) {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


app.use(cors());

app.get("/",function(req,res){
	res.redirect("/search");
});

app.get('/search', (req, res) => {
	connection.query('select * from companies ;', (err, result) => {
		if (err){
		return res.send(err);
	}else{
		return res.json(
			{data : result}
		);
	}
	});
	});


			
app.get('/search/add', (req, res) => {
	const {name,description,public_repos,avatar_url} = req.query
	
	const add = `INSERT INTO companies (name, description, public_repos, avatar_url) VALUES('${name}', '${description}', ${public_repos}, '${avatar_url}')` 
	
	connection.query( add, (err, result) => {
		if (err){
		return res.send(err);
	}else{
		// consloe.log("added");
		res.send('added')
		}
	});
});
	
// app.get('/search/delete', (req, res) => {
// 	connection.query('DELETE FROM companies ;', (err, result) => {
// 		if (err){
// 		return res.send(err);
// 	}else{
// 		return res.json(
// 			{data : result}
// 		);
// 	}
// 	});
// 	});

app.listen(process.env.PORT || 2000, ()=>{
	console.log("server listen on port ");
});
	
	