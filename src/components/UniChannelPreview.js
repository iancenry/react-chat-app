import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const UniChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setToggleContainer,channel, type}) => {
    const {channel: acitveChannel , client} = useChatContext();
    //multiple users channels
    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )

    //DM peeps
    const DirectPreview = ()=>{
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
       
        return (
            <div className="channel-preview__item single">
                <Avatar
                    image=  {members[0]?.user?.image}
                    name = {members[0]?.user?.name} 
                    size= {24}
                />
                <p>{members[0]?.user?.name|| members[0]?.user?.id} </p>
            </div>
        ) 
    }

  return (
    <div className={channel?.id ===acitveChannel?.id ? 'channel-preview__wrapper__selected': "channel-preview__wrapper" }
    onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if(setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
        }
    }}
    >
        {type === 'team'? <ChannelPreview /> : <DirectPreview />}        
    </div>
  )
}

export default UniChannelPreview