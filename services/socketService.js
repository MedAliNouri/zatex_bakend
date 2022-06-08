
const chatModel = require('../models/chatModel')
module.exports=(io)=>{
    io.on('connection',async (socket) => {

        console.log(`New connection ${socket.id}`)
    
        // Listening for chat event
        socket.on('createChat',async function(data){
            try{
                console.log(data.exemple)
                let conversation= new chatModel(data.exemple)
                console.log(conversation)
      await chatModel.create(conversation)
 
            }catch(err){
                console.log(err)
            }
          
        });
        socket.on('createChat',async function(data){
            try{
                console.log(data.exemple)
                let conversation= new chatModel(data.exemple)
                console.log(conversation)
      await chatModel.create(conversation)
 
            }catch(err){
                console.log(err)
            }
          
        });
        socket.on('updateChat',async function(data){
            try{
                console.log(data)
                
        await chatModel.findByIdAndUpdate({"_id":data._id},{ $set:data})
    
       
            }catch(err){
                console.log(err)
            }
          
        });
        socket.on('getConversation',async function(data){
       console.log(data)
  let result =  await chatModel.find(data)
  console.log(result)
   io.sockets.emit('getConversation', result);
        });
      
      });
}