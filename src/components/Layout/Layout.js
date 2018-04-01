import React  from 'react'
import Aux from '../../hoc/_Aux'
const Layout  = (props) =>(
 <Aux>
    <div>
    {props.children}
    </div>
 </Aux>  


)

export default Layout