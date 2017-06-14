const initState = {
	allData : []
};

const reducer = (state = initState , action) => {
	switch(action.type){
		case "ADD_LIST":
			return {
				allData : [
					...state.allData,
					{
						text : action.text,
						state : false
					}
				]
			};
		case "CHANGE_LIST":
			return {
				allData: state.allData.map(( data , dataIndex ) => {
			        if (dataIndex == action.index) {
			          return {...data, state: !data.state};
			        }
			        return data;
			    })
			}
        default:
	        return state;
	}
}

export default reducer;