import React from "react";
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import {ChannelListContainer, ChannelContainer, Auth } from './components'
import 'stream-chat-react/dist/css/index.css'



const cookies =new Cookies()

const apiKey = 'rzzkdppjqg2r'
const authToken = cookies.get("token") //token to allow usage of stream 

const client  = StreamChat.getInstance(apiKey)


if(authToken){
  //connect user and open a websocket connection -- get their messages
  client.connectUser({
    id: cookies.get('userID'), 
    name: cookies.get('username'),
    fullname: cookies.get('fullname'),
    image: cookies.get('avatarImage'),  
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber')
  }, authToken)
}
 const customStyles = {
   '--primary-color': '#a21983',

 };



function App() {
  const [createType, setCreateType] = React.useState('')
  const [isCreating, setIsCreating] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)

  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper" >
      
      <Chat client={client} customStyles={customStyles} theme = "team light">
        <ChannelListContainer 
            setCreateType={setCreateType} 
            isCreating={isCreating}  
            setIsCreating={setIsCreating} 
            setIsEditing={setIsEditing}
            
         />
         <ChannelContainer
            isEditing={isEditing} 
            isCreating={isCreating}  
            setIsCreating={setIsCreating} 
            setIsEditing={setIsEditing}
            createType = {createType}
            
         />
       
      </Chat>
   
    </div>
  );
}

export default App;
