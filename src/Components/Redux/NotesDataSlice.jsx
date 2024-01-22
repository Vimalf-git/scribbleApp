// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export const getCardDetails=createAsyncThunk("",async()=>{
  // console.log("hi");
// const res=await axios.get('http://localhost:8000/getData/selvamvimaldz@gmail.com');
// return res.data
// })


// export const postData=createAsyncThunk("",async(data)=>{
// const res=await ApiService.post("/saveData",data)
// console.log(res);
// })

// export const NotesData = createSlice({
//   name: 'notesData',
//   initialState:{
//     cardDetails:[],
//     loading:false
//   },
//   reducers: {
//     add: (state, action) => {
//       // console.log(action.payload);
//       if(action.payload.id==0){
//         // const prevId=state[state.length-1].id+1;
//         // action.payload.id=prevId;
//         // state.push(action.payload);
//       }else{
//         // const prevId=state[state.length-1].id+1;
//         // action.payload.id=prevId;
//         // state.push(action.payload);
//       }
     
//     },
//     edit: (state, action) => {
//       console.log('enter into edit');
//       console.log(state[action.payload.editIndex].id);
//       action.payload.data.id=state[action.payload.editIndex].id;
//       // console.log(action.payload);
//       state.splice(action.payload.editIndex, 1,action.payload.data)
//     },
//     remove: (state, action) => {
//       console.log(action.payload);
//       state.splice(action.payload,1);
//     }
//   },

//   // extraReducers(builder){
//   //   builder.addCase(postData.pending,(state,action)=>{

//   //   })
//   //   builder.addCase(postData.fulfilled,(state,action)=>{
      
//   //   })
//   //   builder.addCase(postData.rejected,(state,action)=>{
      
//   //   })

   
//   // },
//   // extraReducers(builder){
//   //   builder.addCase(getCardDetails.pending,(state,action)=>{
//   //     state.loading=true
//   //   })
//   //   builder.addCase(getCardDetails.fulfilled,(state,action)=>{
//   //     // state.cardDetails=action.payload;
//   //     state.cardDetails=action.payload;
//   //     // console.log(action.payload);
//   //     state.loading=false

//   //   })
//   //   builder.addCase(getCardDetails.rejected,(state,action)=>{
//   //     state.loading=false

//   //   })
//   // }
// })
// export const { add, edit, remove } = NotesData.actions;
// export default NotesData.reducer;