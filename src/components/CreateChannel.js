import React from 'react'
import {useChatContext} from 'stream-chat-react'
import {UserList} from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({channelName='', setChannelName}) =>{
  
  const handleChange = (event) =>{
    event.preventDefault()
    const {value}  = event.target
    setChannelName  (value)
  }

  return (
    <div className="channel-name-input__wrapper">
      <p>Group Name</p>
      <input type="text" value={channelName} onChange={handleChange} placeholder="no spaces - use(_) "  />
      <p>Add Group Members</p>
    </div>
  )
}


const CreateChannel = ({createType, setIsCreating}) => {
  //keep track of selected users in UserList component, add self to the selected users
  const {client, selectActiveChannel} = useChatContext()
  const [selectedUsers, setSelectedUsers] = React.useState([client.userID || '']) 

  const [channelName, setChannelName] = React.useState('') 

  const createChannel = async (e) => {
    e.preventDefault()
    //create new channel
    try {
      const newChannel = await client.channel(createType, channelName, {name:channelName,members:selectedUsers})
      await newChannel.watch() //listen for new messages
       // cleanup
      setChannelName('')
      setIsCreating(false)
      setSelectedUsers([client.userID])
      selectActiveChannel(newChannel)
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className='create-channel__container'>
      <div className="create-channel__header">
        <p>{createType ==='team'? 'Create a New Group' : 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType ==='team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers}/>      
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType === 'team'? 'Create Group': 'Start New Chat'}</p>
      </div>
    </div>
  )
}

export default CreateChannel