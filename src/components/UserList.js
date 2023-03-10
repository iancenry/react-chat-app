import React from 'react'
import { Avatar,useChatContext } from 'stream-chat-react'
import {InviteIcon} from '../assets'

const ListContainer = ({children}) =>{

    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>Name</p>
                <p>Invite</p>
            </div>
            {children}                     
            
        </div>
    )
}


const UserItem = ({user, setSelectedUsers}) =>{
    const [selected, setSelected] = React.useState(false) 
    const handleSelect = () =>{
        if(selected){
            //keep all selected users except the one clicked
            setSelectedUsers((prevUsers) => prevUsers.filter(prevUser => prevUser !== user.id))
        }else{
            //add new selected user
            setSelectedUsers(prevUsers => [...prevUsers, user.id])
        }
        setSelected(prevSelected => !prevSelected)
    }
    return(
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name = {user.fullname} size={32} />
                <p className="user-item__name">{user.fullname || user.id}</p>
                
            </div>
            {selected ? <InviteIcon />:<div className="user-item__invite-empty" />}
        </div>
    )

}



const UserList = ({setSelectedUsers}) => {
    const {client, channel} = useChatContext()
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [listEmpty, setListEmpty] = React.useState(false)
    const [error, setError]  = React.useState(false)
   
    const membersids = Object.values(channel.state.members).map(({ user }) => user.id);

    React.useEffect(() => {
        const getUsers = async() =>{
            if(loading) return;
            setLoading(true)

            try {
                const response = await client.queryUsers(
                    {id: {$nin: membersids}}, 
                    {id: 1}, //sort
                    {limit: 10}
                )

                if(response.users.length){
                    setUsers(response.users)
                }else{
                    setListEmpty(true)
                    
                }
                
            } catch (error) {
                setError(true)
                
            }
            setLoading(false)
        }

        if(client) getUsers()
        
    }, [])

    if(error){ 
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again!
                </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }
   
    return (
        <ListContainer >
            {loading? <div className='user-list__message'>Loading users...</div>: (
                users?.map((user, i) => (<UserItem index={i} key={user.id} user={user} setSelectedUsers= {setSelectedUsers}/>))
            )}           
          

        </ListContainer>
    )
}

export default UserList

