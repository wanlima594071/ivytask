import React from 'react';
import {Component} from "react";
import './App.css';
// import Search from "./components/search";



class App extends Component <{},any> {
	
	
	Ref : React.RefObject<HTMLInputElement>;
	
	constructor (props ){
		super(props);
		this.Ref = React.createRef();
		
		this.state = {
		products : [],
		product : 
		{name : '',
		description : "",
		public_repos : 0,
		avatar_url : ""}
		}
	}
	
		
	
	componentDidMount(){
		console.log("MOunt");
		this.getProducts();
	}
	
	getProducts = () => {
		console.log("getProducts");
		fetch(`https://wanliapp.run.goorm.io/search`)
			.then(response => response.json())
			// .then(data => console.log(data))
			.then(response => this.setState({products:response.data}))
			.catch(err => console.log(err))
		
	}
	
	updateProduct = () => {
		const inputValue = this.Ref.current.value;
		
		//check if input word in history
		var j;
		const products = this.state.products
		const size = Object.keys(products).length;
		for (j = 0; j < size; j++) { 
			console.log(products[j] === inputValue);
  		if (products[j] === inputValue){console.log("this already exists"); return} else{}
		}
		

		fetch(`https://api.github.com/orgs/${inputValue}`)
			.then(response => response.json())
			.then(response => {
			var count = Object.keys(response).length;
  			console.log(count);
			
			if (count == 3){  }
			else { 
				// console.log("successfully find company!");
				this.setState(
				{product : 
					{name : response.login,
					description : response.description,
					public_repos : response.public_repos,
					avatar_url : response.avatar_url}}
							)
				// console.log(response);	

								}}
			)
			.catch(err => console.log(err))
	}	
		
	addProduct  = () => {
		const { product } = this.state;
		const inputValue = this.Ref.current.value;
		console.log(product, "in addProduct");

		window.open(`https://api.github.com/orgs/${inputValue}`);
		
		fetch(`https://wanliapp.run.goorm.io/search/add?name=${product.name}&description=${product.description}&public_repos=${product.public_repos}&avatar_url=${product.avatar_url}`)
			.then(
			this.getProducts)
			.catch(err => console.log(err))
	}
	
	showDetail(item){
		var i;
		var index = item.id ;
		const p = [...this.state.products]
		const size = Object.keys(p).length;
		for (i = 0; i < size; i++) { 
  		if (p[i] == item){index = i} else{console.log("cannot match item in p")}
		}
		console.log(index);
		p[index] = {...item};
		p[index].opened = true;
		console.log(p[index].opened);
		this.setState({products:p});
	}
				


	render(){
	
	const {products, product} = this.state;
	// const newp = products.map(item => {return (item.opened:false) });	
	return (
		<div className="App">
		
		<h3>Search Company Here</h3>
			
		<input type="text"  ref={this.Ref}  onChange={this.updateProduct}/>
		<button onClick={this.addProduct}>Search</button>	
			
		<div>
			
			
			
			<p>Search History</p> 
			
			
			{products.map(item =>
			{
			// item.opened = false;
			// console.log("opened",opened)
			return (
			<div>
			<button key={item.id} onClick ={() => this.showDetail(item)}>    {item.name}  					</button>
			
					
			
			{item.opened && (
					<div>
						<p>Detail</p>
						<p> Company Name: {item.name}</p>
						<p>Comapny Description: {item.description}</p>
						<p>Public Repos: {item.public_repos}</p>
						<p>Avatar Url: {item.avatar_url}</p>
							
					</div>		
					)}		
					
          	</div>
			)}
			)}
			
			
			
			
		</div>	

		
		</div>
  );
	
	}; 
}
export default App;
