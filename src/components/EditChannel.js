import React, { useState } from 'react';
import { useChatContext, Avatar } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing}) => {
    const { channel } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([])

    const [currentMembers] =useState(Object.values(channel.state.members))
    console.log(currentMembers)


     //loop through list of members in the group to display 
     const currentMembersList = currentMembers.map((member) => { 
        return (
            <>
                <div className="member-item__name-wrapper">
                    <Avatar image={member.user.image} name = {member.user.fullname} size={32} />
                    <p className="member-item__name">{member.user.fullname? member.user.fullname: member.user.id}</p>            
                </div>
            </>
          
          
          
        )
    })

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }
   
    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} currentMembers={currentMembers}/>

            <div className='member-list'>                
                <p className='member-list__header '>Current Members</p>   

                <div>
                    <p>{currentMembersList}</p>
                </div> 
            </div>
            
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p>
                
            </div>
        </div>
    ) 
}

export default EditChannel

