//expects to return schema and various methods possible on schema;

//abstraction to define how and what data gets exposed at various level of data flow through the system
class Entity {
	constructor(data){
		this._data = data;
	}
	// limited data points access and hiding sensitive information from the UI
	get summary(){
		let summary = {};
		const {name, description} = this._data;
		//add new keys or manipulate existing keys
		let otherKeys = {timeStamp : new Date()};
		summary = Object.assign(summary, {name, description}, otherKeys);

		return summary;
	}
	get full(){
		return this._data;
	} 
}