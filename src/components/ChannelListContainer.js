import React from "react"
import { ChannelList, useChatContext } from "stream-chat-react"
import Cookies from "universal-cookie"
import logo from '../assets/Riaralogo.png'
import logoutIcon from '../assets/logout.png'
import {ChannelSearch, UniChannelList, UniChannelPreview} from './'
import {LightningBolt} from '../assets'

const cookies = new Cookies() 

const SideBar = ({logout}) =>{
  return(
    <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={logo} alt="school logo" width={40}/>
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={logoutIcon} alt="Logout" width={45}/>
      </div>
    </div>

  </div>
  )
}

const UniversityHeader = () => {
  return(
    <div className="channel-list__header">
      <p className="channel-list__header__text">Riara University</p>
    </div>
  )
   

}

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}


const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {
  const {client} = useChatContext()
  const logout = () =>{
      cookies.remove("token")    
      cookies.remove('userID')
      cookies.remove('username')
      cookies.remove('fullname')
      cookies.remove('avatarImage')  
      cookies.remove('hashedPassword')
      cookies.remove('phoneNumber')
      window.location.reload()
   
  }
  //get all channels and messages where the student is in
  const filters = {members : {$in: [client.userID] }}
  return (
    <>
      <SideBar logout= {logout} />
      <div className="channel-list__list__wrapper">
        <UniversityHeader />
        <ChannelSearch setToggleContainer = {setToggleContainer}/>
        {/**Group channels */}
        <ChannelList  
          filters = {filters}
          channelRenderFilterFn = {customChannelTeamFilter} 
          List = {(listProps) => ( // custom channel- list editing the custom from stream
            <UniChannelList 
            {...listProps}
              type= "team"
              isCreating= {isCreating}
              setIsCreating ={setIsCreating} 
              setCreateType= {setCreateType} 
              setIsEditing = {setIsEditing}
              setToggleContainer = {setToggleContainer}            
             />
            
          )}
          Preview={(previewProps) => (
            <UniChannelPreview
              {...previewProps}
              type= "team"
              isCreating= {isCreating}
              setIsCreating ={setIsCreating} 
              setCreateType= {setCreateType} 
              setIsEditing = {setIsEditing}
              setToggleContainer = {setToggleContainer}
              
            />
          )}
          />
          {/**DM channel list */}
          <ChannelList 
            filters={filters}
            channelRenderFilterFn={customChannelMessagingFilter}
            List = {(listProps) => ( 
              <UniChannelList 
              {...listProps}
              type= "messaging" 
              isCreating= {isCreating}
              setIsCreating ={setIsCreating} 
              setCreateType= {setCreateType} 
              setIsEditing = {setIsEditing}
              setToggleContainer = {setToggleContainer}

              />
            )}
            Preview={(previewProps) => (
              <UniChannelPreview
                {...previewProps}
                type= "messaging"
                isCreating= {isCreating}
                setIsCreating ={setIsCreating} 
                setCreateType= {setCreateType} 
                setIsEditing = {setIsEditing}
                setToggleContainer = {setToggleContainer}

                
              />
            )}
          />
      </div>
    </>
  )
}

const ChannelListContainer =({setIsCreating, setCreateType, setIsEditing}) =>{
  const [toggleContainer, setToggleContainer] = React.useState(false)
  
  return (
    <>
      {/* desktop */}
       <div className="channel-list__container" >
        <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} />
      </div> 
      {/* mobile */}
      <div className="channel-list__container-responsive" style={{left: toggleContainer? '0%': "-90%", backgroundColor:'#a21983'}}>
      <div className="channel-list__container-toggle" onClick = {() => setToggleContainer(prevToggleContainer => !prevToggleContainer)}><LightningBolt /></div> 
          <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} setToggleContainer={setToggleContainer}/>        
      </div>
    </>
  )

}

export default ChannelListContainer